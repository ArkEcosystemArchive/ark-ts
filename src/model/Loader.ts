/**
 * @module model
 */
/** Loader model. */

import { JsonMember, JsonObject } from 'typedjson-npm';

@JsonObject
export class LoaderStatus {
  @JsonMember({ type: Boolean })
  public sucess: boolean;

  @JsonMember({ type: Boolean })
  public loaded: false;

  @JsonMember({ type: Number })
  public now: number;

  @JsonMember({ type: Number })
  public blocksCount: number;
}

@JsonObject
export class LoaderStatusSync {
  @JsonMember({ type: Boolean })
  public sucess: boolean;

  @JsonMember({ type: Boolean })
  public syncing: false;

  @JsonMember({ type: Number })
  public blocks: number;

  @JsonMember({ type: Number })
  public height: number;

  @JsonMember({ type: String })
  public id: string;
}

@JsonObject
export class LoaderNetworkResponse {
  @JsonMember({ type: String })
  public nethash: string;

  @JsonMember({ type: String })
  public token: string;

  @JsonMember({ type: String })
  public symbol: string;

  @JsonMember({ type: String })
  public explorer: string;

  @JsonMember({ type: String })
  public version: string;
}

@JsonObject
export class LoaderAutoConfigure {
  @JsonMember({ type: Boolean })
  public success: boolean;

  @JsonMember({ elements: LoaderNetworkResponse })
  public network: LoaderNetworkResponse[];
}
