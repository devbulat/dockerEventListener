export declare type DockerObjectType = 'container' | 'image' | 'plugin' | 'volume' | 'network' | 'daemon' | 'service' | 'node' | 'secret' | 'config';
export declare type ContainerEvents = 'attach' | 'commit' | 'copy' | 'create' | 'destroy' | 'detach' | 'die' | 'exec_create' | 'exec_detach' | 'exec_die' | 'exec_start' | 'export' | 'health_status' | 'kill' | 'oom' | 'pause' | 'rename' | 'resize' | 'restart' | 'start' | 'stop' | 'top' | 'unpause' | 'update';
export declare type ImageEvents = 'delete' | 'import' | 'load' | 'pull' | 'push' | 'save' | 'tag' | 'untag';
export declare type PluginEvents = 'enable' | 'disable' | 'install' | 'remove';
export declare type VolumeEvents = 'create' | 'destroy' | 'mount' | 'unmount';
export declare type NetworkEvents = 'create' | 'connect' | 'destroy' | 'disconnect' | 'remove';
export declare type DeamonEvents = 'reload';
export declare type ServiceEvents = 'create' | 'remove' | 'update';
export declare type NodeEvents = 'create' | 'remove' | 'update';
export declare type SecretEvents = 'create' | 'remove' | 'update';
export declare type ConfigEvents = 'create' | 'remove' | 'update';
export declare type DockerEvents = ContainerEvents | ImageEvents | PluginEvents | VolumeEvents | NetworkEvents | DeamonEvents | ServiceEvents | NodeEvents | SecretEvents | ConfigEvents;
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
export declare type DockerEventCallback = (eventData?: DockerEventData) => void;
