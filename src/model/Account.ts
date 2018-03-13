import { JsonProperty } from 'json-typescript-mapper';
import { Delegate } from './Delegate';

/** Account model. */
export class Account {
  @JsonProperty('address')
  address: string;

  @JsonProperty('unconfirmedBalance')
  unconfirmedBalance: string;

  @JsonProperty('balance')
  balance: string;

  @JsonProperty('publicKey')
  publicKey: string;

  @JsonProperty('unconfirmedSignature')
  unconfirmedSignature: number;

  @JsonProperty('secondSignature')
  secondSignature: number;

  @JsonProperty('secondPublicKey')
  secondPublicKey: string;

  @JsonProperty({clazz: Object, name: 'multiSignatures'})
  multiSignatures: object[];

  @JsonProperty({clazz: Object, name: 'u_multisignatures'})
  uMultiSignatures: object[];

  constructor() {
    this.address = void 0;
    this.unconfirmedBalance = void 0;
    this.balance = void 0;
    this.publicKey = void 0;
    this.unconfirmedSignature = void 0;
    this.secondSignature = void 0;
    this.secondPublicKey = void 0;
    this.multiSignatures = void 0;
    this.uMultiSignatures = void 0;
  }
}

export class AccountResponse {
  @JsonProperty('success')
  success: boolean;

  @JsonProperty({clazz: Account, name: 'account'})
  account?: Account;

  @JsonProperty('publicKey')
  publicKey?: string;

  constructor() {
    this.success = void 0;
    this.account = void 0;
    this.publicKey = void 0;
  }
}

export class AccountBalanceResponse {
  @JsonProperty('success')
  success: boolean;

  @JsonProperty('balance')
  balance: string;

  @JsonProperty('unconfirmedBalance')
  unconfirmedBalance: string;

  constructor() {
    this.success = void 0;
    this.balance = void 0;
    this.unconfirmedBalance = void 0;
  }
}

export class AccountVotesResponse {
  @JsonProperty('success')
  success: boolean;

  @JsonProperty({clazz: Delegate, name: 'delegates'})
  delegates: Delegate[];

  constructor() {
    this.success = void 0;
    this.delegates = void 0;
  }
}

export class AccountQueryParams {
  address: string;
}
