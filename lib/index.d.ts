import { DockerEventCallback, DockerEventListenersOptions, DockerEvents } from './types';
declare class DockerEventListener {
    private _dockerEventListener?;
    private _emitter;
    private _options;
    constructor(options?: Partial<DockerEventListenersOptions>);
    private get _eventNames();
    private _parseEvents;
    private _emitEvents;
    private _applyOptions;
    start(): void;
    stop(): void;
    on(eventName: DockerEvents, callback: DockerEventCallback): void;
}
export default DockerEventListener;
