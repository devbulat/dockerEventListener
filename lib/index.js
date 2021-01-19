"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const child_process_1 = require("child_process");
class DockerEventListener {
    constructor(options = { type: 'container' }) {
        this._parseEvents = (value) => {
            const events = value.split('\n').filter((data) => data.length);
            return events.map((item) => JSON.parse(item));
        };
        this._emitEvents = (events) => {
            events.forEach((event) => {
                if (this._eventNames.includes(event.status)) {
                    this._emitter.emit(event.status, event);
                }
            });
        };
        this._applyOptions = (command) => {
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
        this._emitter = new events_1.EventEmitter();
        this._options = options;
    }
    get _eventNames() {
        return this._emitter.eventNames();
    }
    start() {
        this._dockerEventListener = child_process_1.spawn('docker', this._applyOptions('events'));
        this._dockerEventListener.stdout.setEncoding('utf8');
        this._dockerEventListener.stdout.on('data', (data) => {
            const events = this._parseEvents(data);
            this._emitEvents(events);
        });
    }
    stop() {
        if (this._dockerEventListener) {
            this._dockerEventListener.kill();
            this._emitter.removeAllListeners();
        }
    }
    on(eventName, callback) {
        this._emitter.on(eventName, callback);
    }
}
exports.default = DockerEventListener;
