import { ICustomConverter, JsonProperty } from 'json-typescript-mapper';

/** Peer model. */
export class Peer {
  @JsonProperty('ip')
  ip: string;

  @JsonProperty('port')
  port: number;

  @JsonProperty('version')
  version?: string;

  @JsonProperty('os')
  os?: string;

  @JsonProperty('height')
  height?: number;

  @JsonProperty('status')
  status?: string;

  @JsonProperty('delay')
  delay?: number;

  constructor() {
    this.delay = void 0;
    this.height = void 0;
    this.ip = void 0;
    this.os = void 0;
    this.port = void 0;
    this.status = void 0;
    this.version = void 0;
  }
}

export class PeerQueryParams {
  status?: string;
  os?: string;
  shared?: string;
  version?: string;
  limit?: number;
  orderBy?: string;
  offset?: number;
  ip?: string;
  port?: number;
}

export class PeerResponse {
  @JsonProperty('success')
  success: boolean;

  @JsonProperty({clazz: Peer, name: 'peers'})
  peers: Peer[];

  @JsonProperty({clazz: Peer, name: 'peer'})
  peer: Peer;

  constructor() {
    this.success = void 0;
    this.peers = void 0;
    this.peer = void 0;
  }
}

export class PeerVersionResponse {
  @JsonProperty('success')
  success: boolean;

  @JsonProperty('version')
  version: string;

  @JsonProperty('build')
  build: string;

  constructor() {
    this.success = void 0;
    this.version = void 0;
    this.build = void 0;
  }
}

const genericConverter: ICustomConverter = {
  fromJson(data: any): any {
    return data;
  },
  toJson(data: any): any {
    return JSON.stringify(data);
  }
};

export class PeerVersion2ConfigDataResponse {
  @JsonProperty('version')
  version: string;

  @JsonProperty({customConverter: genericConverter, name: 'network'})
  network?: object;

  @JsonProperty({customConverter: genericConverter, name: 'plugins'})
  plugins?: object;

  constructor() {
    this.version = void 0;
    this.network = void 0;
    this.plugins = void 0;
  }
}

export class PeerVersion2ConfigResponse {
  @JsonProperty({clazz: PeerVersion2ConfigDataResponse, name: 'data'})
  data: PeerVersion2ConfigDataResponse;

  constructor() {
    this.data = void 0;
  }
}
