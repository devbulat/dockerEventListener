export type DockerObjectType =
  | 'container'
  | 'image'
  | 'plugin'
  | 'volume'
  | 'network'
  | 'daemon'
  | 'service'
  | 'node'
  | 'secret'
  | 'config';

export type ContainerEvents =
  | 'attach'
  | 'commit'
  | 'copy'
  | 'create'
  | 'destroy'
  | 'detach'
  | 'die'
  | 'exec_create'
  | 'exec_detach'
  | 'exec_die'
  | 'exec_start'
  | 'export'
  | 'health_status'
  | 'kill'
  | 'oom'
  | 'pause'
  | 'rename'
  | 'resize'
  | 'restart'
  | 'start'
  | 'stop'
  | 'top'
  | 'unpause'
  | 'update';

export type ImageEvents =
  | 'delete'
  | 'import'
  | 'load'
  | 'pull'
  | 'push'
  | 'save'
  | 'tag'
  | 'untag';

export type PluginEvents = 'enable' | 'disable' | 'install' | 'remove';

export type VolumeEvents = 'create' | 'destroy' | 'mount' | 'unmount';

export type NetworkEvents =
  | 'create'
  | 'connect'
  | 'destroy'
  | 'disconnect'
  | 'remove';

export type DeamonEvents = 'reload';

export type ServiceEvents = 'create' | 'remove' | 'update';

export type NodeEvents = 'create' | 'remove' | 'update';

export type SecretEvents = 'create' | 'remove' | 'update';

export type ConfigEvents = 'create' | 'remove' | 'update';

export type DockerEvents =
  | ContainerEvents
  | ImageEvents
  | PluginEvents
  | VolumeEvents
  | NetworkEvents
  | DeamonEvents
  | ServiceEvents
  | NodeEvents
  | SecretEvents
  | ConfigEvents;

export interface DockerEventListenersOptions {
  type: DockerObjectType;
  since: string | number;
  until: string | number;
}

export interface DockerEventData {
  status: string;
  id: string;
  from: string;
  Type: string;
  Action: string;
  Actor: {
    ID: string;
    Attributes: {
      image: string;
      name: string;
      signal: string;
    };
  };
  scope: string;
  time: number;
  timeNano: number;
}

export type DockerEventCallback = (eventData?: DockerEventData) => void;
