import { EventEmitter } from 'events';
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';

import {
  DockerEventCallback,
  DockerEventListenersOptions,
  DockerEventData,
  DockerEvents,
} from './types';

class DockerEventListener {
  private _dockerEventListener?: ChildProcessWithoutNullStreams;
  private _emitter: EventEmitter;
  private _options: Partial<DockerEventListenersOptions>;

  constructor(
    options: Partial<DockerEventListenersOptions> = { type: 'container' }
  ) {
    this._emitter = new EventEmitter();
    this._options = options;
  }

  private get _eventNames() {
    return this._emitter.eventNames();
  }

  private _parseEvents = (value: string) => {
    const events = value.split('\n').filter((data) => data.length);

    return events.map((item) => JSON.parse(item));
  };

  private _emitEvents = (events: DockerEventData[]) => {
    events.forEach((event) => {
      if (this._eventNames.includes(event.status)) {
        this._emitter.emit(event.status, event);
      }
    });
  };

  private _applyOptions = (command: string) => {
    return [
      command,
      //Works only with JSON formats.
      '--format',
      '{{json .}}',
      ...(this._options.type ? ['--filter', `type=${this._options.type}`] : []),
      ...(this._options.since ? ['--since', String(this._options.since)] : []),
      ...(this._options.until ? ['--until', String(this._options.until)] : []),
    ];
  };

  public start() {
    this._dockerEventListener = spawn('docker', this._applyOptions('events'));
    this._dockerEventListener.stdout.setEncoding('utf8');
    this._dockerEventListener.stdout.on('data', (data: string) => {
      const events = this._parseEvents(data);
      this._emitEvents(events);
    });
  }

  public stop() {
    if (this._dockerEventListener) {
      this._dockerEventListener.kill();
      this._emitter.removeAllListeners();
    }
  }

  public on(eventName: DockerEvents, callback: DockerEventCallback) {
    this._emitter.on(eventName, callback);
  }
}

export default DockerEventListener;
