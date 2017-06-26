import { JsonObject, JsonMember } from 'typedjson-npm';

@JsonObject
export class Peer {
  @JsonMember({ type: String })
  ip: string;

  @JsonMember({ type: Number })
  port: number;

  @JsonMember({ type: String })
  version?: string;

  @JsonMember({ type: String })
  os?: string;

  @JsonMember({ type: Number })
  height?: number;

  @JsonMember({ type: String })
  status?: string;

  @JsonMember({ type: Number })
  delay?: number;
}

@JsonObject
export class PeerQueryParams {
  @JsonMember({ type: String })
  status?:string;

  @JsonMember({ type: String })
  os?:string;

  @JsonMember({ type: String })
  shared?: string;

  @JsonMember({ type: String })
  version?: string;

  @JsonMember({ type: Number })
  limit?: number;

  @JsonMember({ type: String })
  orderBy?: string;

  @JsonMember({ type: Number })
  offset?: number;

  @JsonMember({ type: String })
  ip?: string;

  @JsonMember({ type: Number })
  port?: number;
}

@JsonObject
export class PeerResponse {
  @JsonMember({ type: Boolean })
  success: boolean;

  @JsonMember({ elements: Peer })
  peers: Array<Peer>;

  @JsonMember({ type: Peer })
  peer: Peer;
}
