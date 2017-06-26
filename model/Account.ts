import * as model from './models';
import { JsonObject, JsonMember } from 'typedjson-npm';

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
  secondPublicKey: Object;

  @JsonMember({ elements: Object, refersAbstractType: true })
  multiSignatures: Array<Object>;

  @JsonMember({ elements: Object, refersAbstractType: true })
  uMultiSignatures: Array<Object>;
}

@JsonObject
export class AccountResponse {
  @JsonMember({ type: Boolean })
  success: boolean;

  @JsonMember({ type: Account })
  account: Account;
}

@JsonObject
export class AccountVotesResponse {
  @JsonMember({ type: Boolean })
  success: boolean;

  @JsonMember({ elements: Object, refersAbstractType: true })
  delegates: Array<model.Delegate>;
}

@JsonObject
export class AccountQueryParams {
  @JsonMember({ type: String })
  address: string;
}
