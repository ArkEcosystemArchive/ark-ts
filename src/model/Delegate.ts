import { JsonProperty } from 'json-typescript-mapper';

/** Delegate model. */
export class Delegate {
  @JsonProperty('username')
  username: string;

  @JsonProperty('address')
  address: string;

  @JsonProperty('publicKey')
  publicKey: string;

  @JsonProperty('vote')
  vote: string;

  @JsonProperty('producedblocks')
  producedBlocks: number;

  @JsonProperty('missedblocks')
  missedBlocks: number;

  @JsonProperty('rate')
  rate: number;

  @JsonProperty('approval')
  approval: number;

  @JsonProperty('productivity')
  productivity: number;

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
  success: boolean;

  @JsonProperty({clazz: Delegate, name: 'delegates'})
  delegates?: Delegate[];

  @JsonProperty({clazz: Delegate, name: 'delegate'})
  delegate?: Delegate;

  @JsonProperty('totalCount')
  totalCount: number;

  constructor() {
    this.success = void 0;
    this.delegates = void 0;
    this.delegate = void 0;
    this.totalCount = void 0;
  }
}

export class DelegateQueryParams {
  @JsonProperty('username')
  username?: string;

  @JsonProperty('publicKey')
  publicKey?: string;

  @JsonProperty('offset')
  offset?: number;

  @JsonProperty('orderBy')
  orderBy?: string;

  @JsonProperty('limit')
  limit?: number;

  @JsonProperty({clazz: Delegate, name: 'delegate'})
  delegate?: Delegate;

  @JsonProperty('generatorPublicKey')
  generatorPublicKey?: string;

  @JsonProperty('q')
  q?: string;

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
  username: string;
  address: string;
  publicKey: string;
  balance: string;

  constructor() {
    this.username = void 0;
    this.address = void 0;
    this.publicKey = void 0;
    this.balance = void 0;
  }
}

export class DelegateVoters {
  @JsonProperty('success')
  success: boolean;

  @JsonProperty({clazz: AccountVoter, name: 'accounts'})
  accounts: AccountVoter[];

  constructor() {
    this.success = void 0;
    this.accounts = void 0;
  }
}

export class ForgedDetails {
  @JsonProperty('success')
  success: boolean;

  @JsonProperty('fees')
  fees: string;

  @JsonProperty('rewards')
  rewards: string;

  @JsonProperty('forged')
  forged: string;

  constructor() {
    this.success = void 0;
    this.fees = void 0;
    this.rewards = void 0;
    this.forged = void 0;
  }
}
