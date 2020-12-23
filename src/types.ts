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

export interface DockerEventListenersOptions {
  type: DockerObjectType;
  since: string | number;
  until: string | number;
}

export interface DockerEventData {
  status: 'string';
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
