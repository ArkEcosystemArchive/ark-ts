import { JsonObject, JsonMember } from 'typedjson-npm';

@JsonObject
export class LoaderStatus {
  @JsonMember({ type: Boolean })
  sucess: boolean;

  @JsonMember({ type: Boolean })
  loaded: false;

  @JsonMember({ type: Number })
  now: number;

  @JsonMember({ type: Number })
  blocksCount: number;
}

@JsonObject
export class LoaderStatusSync {
  @JsonMember({ type: Boolean })
  sucess: boolean;

  @JsonMember({ type: Boolean })
  syncing: false;

  @JsonMember({ type: Number })
  blocks: number;

  @JsonMember({ type: Number })
  height: number;

  @JsonMember({ type: String })
  id: string;
}
