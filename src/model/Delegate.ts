import { JsonProperty } from 'json-typescript-mapper';

/** Delegate model. */
export class Delegate {
  @JsonProperty('username')
  public username: string;

  @JsonProperty('address')
  public address: string;

  @JsonProperty('publicKey')
  public publicKey: string;

  @JsonProperty('vote')
  public vote: string;

  @JsonProperty('producedblocks')
  public producedBlocks: number;

  @JsonProperty('missedblocks')
  public missedBlocks: number;

  @JsonProperty('rate')
  public rate: number;

  @JsonProperty('approval')
  public approval: number;

  @JsonProperty('productivity')
  public productivity: number;

  constructor() {
    this.address = void 0;
    this.approval = void 0;
    this.missedBlocks = void 0;
    this.producedBlocks = void 0;
    this.productivity = void 0;
    this.publicKey = void 0;
    this.rate = void 0;
    this.username = void 0;
    this.vote = void 0;
  }
}

export class DelegateResponse {
  @JsonProperty('success')
  public success: boolean;

  @JsonProperty({clazz: Delegate, name: 'delegates'})
  public delegates?: Delegate[];

  @JsonProperty({clazz: Delegate, name: 'delegate'})
  public delegate?: Delegate;

  @JsonProperty('totalCount')
  public totalCount: number;

  constructor() {
    this.success = void 0;
    this.delegates = void 0;
    this.delegate = void 0;
    this.totalCount = void 0;
  }
}

export class DelegateQueryParams {
  @JsonProperty('username')
  public username?: string;

  @JsonProperty('publicKey')
  public publicKey?: string;

  @JsonProperty('offset')
  public offset?: number;

  @JsonProperty('orderBy')
  public orderBy?: string;

  @JsonProperty('limit')
  public limit?: number;

  @JsonProperty({clazz: Delegate, name: 'delegate'})
  public delegate?: Delegate;

  @JsonProperty('generatorPublicKey')
  public generatorPublicKey?: string;

  @JsonProperty('q')
  public q?: string;

  constructor() {
    this.username = void 0;
    this.publicKey = void 0;
    this.offset = void 0;
    this.orderBy = void 0;
    this.limit = void 0;
    this.delegate = void 0;
    this.generatorPublicKey = void 0;
    this.q = void 0;
  }
}

export class AccountVoter {
  public username: string;
  public address: string;
  public publicKey: string;
  public balance: string;

  constructor() {
    this.username = void 0;
    this.address = void 0;
    this.publicKey = void 0;
    this.balance = void 0;
  }
}

export class DelegateVoters {
  @JsonProperty('success')
  public success: boolean;

  @JsonProperty({clazz: AccountVoter, name: 'accounts'})
  public accounts: AccountVoter[];

  constructor() {
    this.success = void 0;
    this.accounts = void 0;
  }
}

export class ForgedDetails {
  @JsonProperty('success')
  public success: boolean;

  @JsonProperty('fees')
  public fees: string;

  @JsonProperty('rewards')
  public rewards: string;

  @JsonProperty('forged')
  public forged: string;

  constructor() {
    this.success = void 0;
    this.fees = void 0;
    this.rewards = void 0;
    this.forged = void 0;
  }
}
