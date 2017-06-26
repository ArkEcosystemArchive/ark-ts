import * as model from './models';
import { JsonObject, JsonMember } from 'typedjson-npm';

@JsonObject
export class Block {
  @JsonMember({ type: Number })
  id: number;

  @JsonMember({ type: Number })
  version: number;

  @JsonMember({ type: Number })
  timestamp: number;

  @JsonMember({ type: Number })
  height: number;

  @JsonMember({ type: Number })
  previousBlock: number;

  @JsonMember({ type: Number })
  numberOfTransactions: number;

  @JsonMember({ type: Number })
  totalAmount: number;

  @JsonMember({ type: Number })
  totalFee: number;

  @JsonMember({ type: Number })
  reward: number;

  @JsonMember({ type: Number })
  payloadLength: number;

  @JsonMember({ type: String })
  payloadHash: string;

  @JsonMember({ type: String })
  generatorPublicKey: string;

  @JsonMember({ type: String })
  generatorId: string;

  @JsonMember({ type: String })
  blockSignature: string;

  @JsonMember({ type: Number })
  confirmations: number;

  @JsonMember({ type: String })
  totalForged: string;
}

@JsonObject
export class BlockQueryParams {
  @JsonMember({ type: Number })
  id: number
}

@JsonObject
export class BlockResponse {
  @JsonMember({ type: Boolean })
  success: boolean;

  @JsonMember({ elements: Block })
  blocks: Array<Block>;

  @JsonMember({ type: Block })
  block: Block;
}

@JsonObject
export class BlockFee {
  @JsonMember({ type: Boolean })
  success: boolean;

  @JsonMember({ type: Number })
  fee: number;
}

@JsonObject
export class Fees {
  @JsonMember({ type: Number })
  send: number;

  @JsonMember({ type: Number })
  vote: number;

  @JsonMember({ type: Number })
  secondsignature: number;

  @JsonMember({ type: Number })
  delegate: number;

  @JsonMember({ type: Number })
  multisignature: number;
}

@JsonObject
export class BlockFees {
  @JsonMember({ type: Boolean })
  success: boolean;
  @JsonMember({ type: Fees })
  fees: Fees
}

@JsonObject
export class BlockHeight {
  @JsonMember({ type: Boolean })
  success: boolean;

  @JsonMember({ type: Number })
  height: number;

  @JsonMember({ type: Number })
  id: number;
}
