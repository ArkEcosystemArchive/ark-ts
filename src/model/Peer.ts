import { ICustomConverter, JsonProperty } from 'json-typescript-mapper';

/** Peer model. */
export class Peer {
  @JsonProperty('ip')
  public ip: string;

  @JsonProperty('port')
  public port: number;

  @JsonProperty('version')
  public version?: string;

  @JsonProperty('os')
  public os?: string;

  @JsonProperty('height')
  public height?: number;

  @JsonProperty('status')
  public status?: string;

  @JsonProperty('delay')
  public delay?: number;

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
  public status?: string;
  public os?: string;
  public shared?: string;
  public version?: string;
  public limit?: number;
  public orderBy?: string;
  public offset?: number;
  public ip?: string;
  public port?: number;
}

export class PeerResponse {
  @JsonProperty('success')
  public success: boolean;

  @JsonProperty({clazz: Peer, name: 'peers'})
  public peers: Peer[];

  @JsonProperty({clazz: Peer, name: 'peer'})
  public peer: Peer;

  constructor() {
    this.success = void 0;
    this.peers = void 0;
    this.peer = void 0;
  }
}

export class PeerVersionResponse {
  @JsonProperty('success')
  public success: boolean;

  @JsonProperty('version')
  public version: string;

  @JsonProperty('build')
  public build: string;

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
  },
};

export class PeerVersion2ConfigDataResponse {
  @JsonProperty('version')
  public version: string;

  @JsonProperty({customConverter: genericConverter, name: 'network'})
  public network?: object;

  @JsonProperty({customConverter: genericConverter, name: 'plugins'})
  public plugins?: object;

  constructor() {
    this.version = void 0;
    this.network = void 0;
    this.plugins = void 0;
  }
}

export class PeerVersion2ConfigResponse {
  @JsonProperty({clazz: PeerVersion2ConfigDataResponse, name: 'data'})
  public data: PeerVersion2ConfigDataResponse;

  constructor() {
    this.data = void 0;
  }
}
