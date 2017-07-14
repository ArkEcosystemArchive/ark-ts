/**
 * @module model
 */
/** Account model. */

import { JsonMember, JsonObject } from 'typedjson-npm';
import { Delegate } from './Delegate';

@JsonObject
export class Account {
  @JsonMember({ type: String })
  address: string;

  @JsonMember({ type: String })
  unconfirmedBalance: string;

  @JsonMember({ type: String })
  balance: string;

  @JsonMember({ type: String })
  publicKey: string;

  @JsonMember({ type: Number })
  unconfirmedSignature: number;

  @JsonMember({ type: Number })
  secondSignature: number;

  @JsonMember({ type: Object })
  secondPublicKey: object;

  @JsonMember({ elements: Object, refersAbstractType: true })
  multiSignatures: object[];

  @JsonMember({ elements: Object, refersAbstractType: true })
  uMultiSignatures: object[];
}

@JsonObject
export class AccountResponse {
  @JsonMember({ type: Boolean })
  success: boolean;

  @JsonMember({ type: Account })
  account?: Account;

  @JsonMember({ type: String })
  publicKey?: string;
}

@JsonObject
export class AccountVotesResponse {
  @JsonMember({ type: Boolean })
  success: boolean;

  @JsonMember({ elements: Object, refersAbstractType: true })
  delegates: Delegate[];
}

@JsonObject
export class AccountQueryParams {
  @JsonMember({ type: String })
  address: string;
}
