import { EventEmitter } from 'events'
import { spawn, ChildProcessWithoutNullStreams } from 'child_process'

import {
  DockerContainerEvents,
  DockerEventCallback,
  DockerEventListenersOptions,
  DockerEventData,
} from './types'

class DockerEventListener {
  private _dockerEventListener?: ChildProcessWithoutNullStreams
  private _emitter: EventEmitter
  private _options: Partial<DockerEventListenersOptions>

  constructor(options: Partial<DockerEventListenersOptions> = {}) {
    this._emitter = new EventEmitter()
    this._options = options
  }

  private get _eventNames() {
    return this._emitter.eventNames()
  }

  private _parseEvents = (value: string) => {
    const events = value.split('\n').filter((data) => data.length)

    return events.map((item) => JSON.parse(item))
  }

  private _emitEvents = (events: DockerEventData[]) => {
    events.forEach((event) => {
      if (this._eventNames.includes(event.status)) {
        this._emitter.emit(event.status, event)
      }
    })
  }

  public start() {
    this._dockerEventListener = spawn('docker', [
      'events',
      '--filter',
      'type=container',
      '--format',
      '{{json .}}',
    ])
    this._dockerEventListener.stdout.setEncoding('utf8')
    this._dockerEventListener.stdout.on('data', (data: string) => {
      const events = this._parseEvents(data)
      this._emitEvents(events)
    })
  }

  public stop() {
    if (this._dockerEventListener) {
      this._dockerEventListener.kill()
      this._emitter.removeAllListeners()
    }
  }

  public on(eventName: DockerContainerEvents, callback: DockerEventCallback) {
    this._emitter.on(eventName, callback)
  }
}

export default DockerEventListener
