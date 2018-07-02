import { JsonProperty } from 'json-typescript-mapper';

/** Loader model. */
export class LoaderStatus {
  @JsonProperty('success')
  public success: boolean;

  @JsonProperty('loaded')
  public loaded: false;

  @JsonProperty('now')
  public now: number;

  @JsonProperty('blocksCount')
  public blocksCount: number;

  constructor() {
    this.success = void 0;
    this.loaded = void 0;
    this.now = void 0;
    this.blocksCount = void 0;
  }
}

export class LoaderStatusSync {
 @JsonProperty('success')
  public success: boolean;

  @JsonProperty('syncing')
  public syncing: false;

  @JsonProperty('blocks')
  public blocks: number;

  @JsonProperty('height')
  public height: number;

  @JsonProperty('id')
  public id: string;

  constructor() {
    this.success = void 0;
    this.syncing = void 0;
    this.blocks = void 0;
    this.height = void 0;
    this.id = void 0;
  }
}

export class LoaderNetworkResponse {
  @JsonProperty('nethash')
  public nethash: string;

  @JsonProperty('token')
  public token: string;

  @JsonProperty('symbol')
  public symbol: string;

  @JsonProperty('explorer')
  public explorer: string;

  @JsonProperty('version')
  public version: number;

  constructor() {
    this.nethash = void 0;
    this.token = void 0;
    this.symbol = void 0;
    this.explorer = void 0;
    this.version = void 0;
  }
}

export class LoaderAutoConfigure {
  @JsonProperty('success')
  public success: boolean;

  @JsonProperty({clazz: LoaderNetworkResponse, name: 'network'})
  public network: LoaderNetworkResponse;

  constructor() {
    this.success = void 0;
    this.network = void 0;
  }
}
