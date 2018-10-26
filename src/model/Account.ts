import { JsonProperty } from 'json-typescript-mapper';
import { Delegate } from './Delegate';

/** Account model. */
export class Account {
  @JsonProperty('address')
  public address: string;

  @JsonProperty('unconfirmedBalance')
  public unconfirmedBalance: string;

  @JsonProperty('balance')
  public balance: string;

  @JsonProperty('publicKey')
  public publicKey: string;

  @JsonProperty('unconfirmedSignature')
  public unconfirmedSignature: number;

  @JsonProperty('secondSignature')
  public secondSignature: number;

  @JsonProperty('secondPublicKey')
  public secondPublicKey: string;

  @JsonProperty({clazz: Object, name: 'multiSignatures'})
  public multiSignatures: object[];

  @JsonProperty({clazz: Object, name: 'u_multisignatures'})
  public uMultiSignatures: object[];

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
  public success: boolean;

  @JsonProperty({clazz: Account, name: 'account'})
  public account?: Account;

  @JsonProperty('publicKey')
  public publicKey?: string;

  constructor() {
    this.success = void 0;
    this.account = void 0;
    this.publicKey = void 0;
  }
}

export class AccountBalanceResponse {
  @JsonProperty('success')
  public success: boolean;

  @JsonProperty('balance')
  public balance: string;

  @JsonProperty('unconfirmedBalance')
  public unconfirmedBalance: string;

  constructor() {
    this.success = void 0;
    this.balance = void 0;
    this.unconfirmedBalance = void 0;
  }
}

export class AccountVotesResponse {
  @JsonProperty('success')
  public success: boolean;

  @JsonProperty({clazz: Delegate, name: 'delegates'})
  public delegates: Delegate[];

  constructor() {
    this.success = void 0;
    this.delegates = void 0;
  }
}

export class AccountQueryParams {
  public address: string;
}
