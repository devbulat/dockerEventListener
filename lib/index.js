"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var child_process_1 = require("child_process");
var constants_1 = require("./constants");
var DockerEventListener = /** @class */ (function () {
    function DockerEventListener(options) {
        var _this = this;
        if (options === void 0) { options = { type: 'container' }; }
        this._parseEvents = function (value) {
            var events = value.split('\n').filter(function (data) { return data.length; });
            return events.map(function (item) { return JSON.parse(item); });
        };
        this._emitEvents = function (events) {
            events.forEach(function (event) {
                if (_this._eventNames.includes(event.status)) {
                    _this._emitter.emit(event.status, event);
                }
            });
        };
        this._applyOptions = function (command) {
            return __spreadArrays([
                command,
                //Works only with JSON formats.
                '--format',
                '{{json .}}'
            ], (_this._options.type ? ['--filter', "type=" + _this._options.type] : []), (_this._options.since ? ['--since', String(_this._options.since)] : []), (_this._options.until ? ['--until', String(_this._options.until)] : []));
        };
        this._emitter = new events_1.EventEmitter();
        this._options = options;
    }
    Object.defineProperty(DockerEventListener.prototype, "_eventNames", {
        get: function () {
            return this._emitter.eventNames();
        },
        enumerable: false,
        configurable: true
    });
    DockerEventListener.prototype.start = function () {
        var _this = this;
        this._dockerEventListener = child_process_1.spawn('docker', this._applyOptions('events'));
        this._dockerEventListener.stdout.setEncoding('utf8');
        this._dockerEventListener.stdout.on('data', function (data) {
            var events = _this._parseEvents(data);
            _this._emitEvents(events);
        });
    };
    DockerEventListener.prototype.stop = function () {
        if (this._dockerEventListener) {
            this._dockerEventListener.kill();
            this._emitter.removeAllListeners();
        }
    };
    DockerEventListener.prototype.on = function (eventName, callback) {
        var _this = this;
        var printEventError = function () {
            console.error("Event \"" + eventName + "\" is not supported for " + _this._options.type + ". " +
                'You can see the available events here https://docs.docker.com/engine/reference/commandline/events/#object-types');
        };
        switch (this._options.type) {
            case 'container':
                if (constants_1.CONTAINER_EVENTS.includes(eventName)) {
                    this._emitter.on(eventName, callback);
                }
                else
                    printEventError();
                break;
            case 'image':
                if (constants_1.IMAGE_EVENTS.includes(eventName)) {
                    this._emitter.on(eventName, callback);
                }
                else
                    printEventError();
                break;
            case 'plugin':
                if (constants_1.PLUGIN_EVENTS.includes(eventName)) {
                    this._emitter.on(eventName, callback);
                }
                else
                    printEventError();
                break;
            case 'volume':
                if (constants_1.VOLUME_EVENTS.includes(eventName)) {
                    this._emitter.on(eventName, callback);
                }
                else
                    printEventError();
                break;
            case 'network':
                if (constants_1.NETWORK_EVENTS.includes(eventName)) {
                    this._emitter.on(eventName, callback);
                }
                else
                    printEventError();
                break;
            case 'daemon':
                if (constants_1.DAEMON_EVENTS.includes(eventName)) {
                    this._emitter.on(eventName, callback);
                }
                else
                    printEventError();
                break;
            case 'service':
                if (constants_1.SERVICE_EVENTS.includes(eventName)) {
                    this._emitter.on(eventName, callback);
                }
                else
                    printEventError();
                break;
            case 'node':
                if (constants_1.NODE_EVENTS.includes(eventName)) {
                    this._emitter.on(eventName, callback);
                }
                else
                    printEventError();
                break;
            case 'secret':
                if (constants_1.SECRET_EVENTS.includes(eventName)) {
                    this._emitter.on(eventName, callback);
                }
                else
                    printEventError();
                break;
            case 'config':
                if (constants_1.CONFIG_EVENTS.includes(eventName)) {
                    this._emitter.on(eventName, callback);
                }
                else
                    printEventError();
                break;
            default:
                console.error("\"" + this._options.type + "\" is not supported ");
                break;
        }
    };
    return DockerEventListener;
}());
exports.default = DockerEventListener;
