import { EventEmitter } from 'events';
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';

import {
  DockerEventCallback,
  DockerEventListenersOptions,
  DockerEventData,
} from './types';
import {
  CONTAINER_EVENTS,
  IMAGE_EVENTS,
  PLUGIN_EVENTS,
  VOLUME_EVENTS,
  NETWORK_EVENTS,
  DAEMON_EVENTS,
  SERVICE_EVENTS,
  NODE_EVENTS,
  SECRET_EVENTS,
  CONFIG_EVENTS,
} from './constants';

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

  public on(eventName: string, callback: DockerEventCallback) {
    const printEventError = (): void => {
      console.error(
        `Event "${eventName}" is not supported for ${this._options.type}. ` +
          'You can see the available events here https://docs.docker.com/engine/reference/commandline/events/#object-types'
      );
    };

    switch (this._options.type) {
      case 'container':
        if (CONTAINER_EVENTS.includes(eventName)) {
          this._emitter.on(eventName, callback);
        } else printEventError();
        break;

      case 'image':
        if (IMAGE_EVENTS.includes(eventName)) {
          this._emitter.on(eventName, callback);
        } else printEventError();
        break;

      case 'plugin':
        if (PLUGIN_EVENTS.includes(eventName)) {
          this._emitter.on(eventName, callback);
        } else printEventError();
        break;

      case 'volume':
        if (VOLUME_EVENTS.includes(eventName)) {
          this._emitter.on(eventName, callback);
        } else printEventError();
        break;

      case 'network':
        if (NETWORK_EVENTS.includes(eventName)) {
          this._emitter.on(eventName, callback);
        } else printEventError();
        break;

      case 'daemon':
        if (DAEMON_EVENTS.includes(eventName)) {
          this._emitter.on(eventName, callback);
        } else printEventError();
        break;

      case 'service':
        if (SERVICE_EVENTS.includes(eventName)) {
          this._emitter.on(eventName, callback);
        } else printEventError();
        break;

      case 'node':
        if (NODE_EVENTS.includes(eventName)) {
          this._emitter.on(eventName, callback);
        } else printEventError();
        break;

      case 'secret':
        if (SECRET_EVENTS.includes(eventName)) {
          this._emitter.on(eventName, callback);
        } else printEventError();
        break;

      case 'config':
        if (CONFIG_EVENTS.includes(eventName)) {
          this._emitter.on(eventName, callback);
        } else printEventError();
        break;

      default:
        console.error(`"${this._options.type}" is not supported `);
        break;
    }
  }
}

export default DockerEventListener;
