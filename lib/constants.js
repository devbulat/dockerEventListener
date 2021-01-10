"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG_EVENTS = exports.SECRET_EVENTS = exports.NODE_EVENTS = exports.SERVICE_EVENTS = exports.DAEMON_EVENTS = exports.NETWORK_EVENTS = exports.VOLUME_EVENTS = exports.PLUGIN_EVENTS = exports.IMAGE_EVENTS = exports.CONTAINER_EVENTS = void 0;
exports.CONTAINER_EVENTS = [
    'attach',
    'commit',
    'copy',
    'create',
    'destroy',
    'detach',
    'die',
    'exec_create',
    'exec_detach',
    'exec_die',
    'exec_start',
    'export',
    'health_status',
    'kill',
    'oom',
    'pause',
    'rename',
    'resize',
    'restart',
    'start',
    'stop',
    'top',
    'unpause',
    'update',
];
exports.IMAGE_EVENTS = [
    'delete',
    'import',
    'load',
    'pull',
    'push',
    'save',
    'tag',
    'untag',
];
exports.PLUGIN_EVENTS = ['enable', 'disable', 'install', 'remove'];
exports.VOLUME_EVENTS = ['create', 'destroy', 'mount', 'unmount'];
exports.NETWORK_EVENTS = [
    'create',
    'connect',
    'destroy',
    'disconnect',
    'remove',
];
exports.DAEMON_EVENTS = ['reload'];
exports.SERVICE_EVENTS = ['create', 'remove', 'update'];
exports.NODE_EVENTS = ['create', 'remove', 'update'];
exports.SECRET_EVENTS = ['create', 'remove', 'update'];
exports.CONFIG_EVENTS = ['create', 'remove', 'update'];
