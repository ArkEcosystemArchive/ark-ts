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
