/**
 * @module model
 */
/** Delegate model. */

import { JsonMember, JsonObject } from 'typedjson-npm';

@JsonObject
export class Delegate {
  @JsonMember({ type: String })
  username: string;

  @JsonMember({ type: String })
  address: string;

  @JsonMember({ type: String })
  publicKey: string;

  @JsonMember({ type: String })
  vote: string;

  @JsonMember({ type: Number })
  producedBlocks: number;

  @JsonMember({ type: Number })
  missedBlocks: number;

  @JsonMember({ type: Number })
  rate: number;

  @JsonMember({ type: Number })
  approval: number;

  @JsonMember({ type: Number })
  productivity: number;
}

@JsonObject
export class DelegateResponse {
  @JsonMember({ type: Boolean })
  sucess: boolean;

  @JsonMember({ elements: Delegate })
  delegates?: Delegate[];

  @JsonMember({ type: Delegate })
  delegate?: Delegate;

  @JsonMember({ type: Number })
  totalCount: number;
}

@JsonObject
export class DelegateQueryParams {
  @JsonMember({ type: String })
  username?: string;

  @JsonMember({ type: String })
  publicKey?: string;

  @JsonMember({ type: Number })
  offset?: number;

  @JsonMember({ type: String })
  orderBy?: string;

  @JsonMember({ type: Number })
  limit?: number;

  @JsonMember({ type: Delegate })
  delegate?: Delegate;

  @JsonMember({ type: String })
  generatorPublicKey?: string;
}

interface AccountVoter {
  username: string;
  address: string;
  publicKey: string;
  balance: string;
}

@JsonObject
export class DelegateVoters {
  @JsonMember({ type: Boolean })
  sucess: boolean;

  @JsonMember({ elements: Object, refersAbstractType: true })
  accounts: AccountVoter[];
}

@JsonObject
export class ForgedDetails {
  @JsonMember({ type: Boolean })
  sucess: boolean;

  @JsonMember({ type: String })
  fees: string;

  @JsonMember({ type: String })
  rewards: string;

  @JsonMember({ type: String })
  forged: string;
}
