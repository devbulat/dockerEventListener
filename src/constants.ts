export const CONTAINER_EVENTS = [
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

export const IMAGE_EVENTS = [
  'delete',
  'import',
  'load',
  'pull',
  'push',
  'save',
  'tag',
  'untag',
];

export const PLUGIN_EVENTS = ['enable', 'disable', 'install', 'remove'];

export const VOLUME_EVENTS = ['create', 'destroy', 'mount', 'unmount'];

export const NETWORK_EVENTS = [
  'create',
  'connect',
  'destroy',
  'disconnect',
  'remove',
];

export const DAEMON_EVENTS = ['reload'];

export const SERVICE_EVENTS = ['create', 'remove', 'update'];

export const NODE_EVENTS = ['create', 'remove', 'update'];

export const SECRET_EVENTS = ['create', 'remove', 'update'];

export const CONFIG_EVENTS = ['create', 'remove', 'update'];
