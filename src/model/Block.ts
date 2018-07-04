import { JsonProperty } from 'json-typescript-mapper';

/** Block model. */
export class Block {
  @JsonProperty('id')
  public id: number;

  @JsonProperty('version')
  public version: number;

  @JsonProperty('timestamp')
  public timestamp: number;

  @JsonProperty('height')
  public height: number;

  @JsonProperty('previousBlock')
  public previousBlock: number;

  @JsonProperty('numberOfTransactions')
  public numberOfTransactions: number;

  @JsonProperty('totalAmount')
  public totalAmount: number;

  @JsonProperty('totalFee')
  public totalFee: number;

  @JsonProperty('reward')
  public reward: number;

  @JsonProperty('payloadLength')
  public payloadLength: number;

  @JsonProperty('payloadHash')
  public payloadHash: string;

  @JsonProperty('generatorPublicKey')
  public generatorPublicKey: string;

  @JsonProperty('generatorId')
  public generatorId: string;

  @JsonProperty('blockSignature')
  public blockSignature: string;

  @JsonProperty('confirmations')
  public confirmations: number;

  @JsonProperty('totalForged')
  public totalForged: string;

  constructor() {
    this.version = void 0;
    this.blockSignature = void 0;
    this.confirmations = void 0;
    this.generatorId = void 0;
    this.generatorPublicKey = void 0;
    this.generatorId = void 0;
    this.height = void 0;
    this.id = void 0;
    this.numberOfTransactions = void 0;
    this.payloadHash = void 0;
    this.payloadLength = void 0;
    this.previousBlock = void 0;
    this.reward = void 0;
    this.timestamp = void 0;
    this.totalAmount = void 0;
    this.totalFee = void 0;
    this.totalForged = void 0;
  }
}

export class BlockQueryParams {
  public id?: string;
  public limit?: number;
  public offset?: number;
  public orderBy?: string;
}

export class BlockResponse {
  @JsonProperty('success')
  public success: boolean;

  @JsonProperty({clazz: Block, name: 'blocks'})
  public blocks?: Block[];

  @JsonProperty({clazz: Block, name: 'block'})
  public block?: Block;

  constructor() {
    this.success = void 0;
    this.blocks = void 0;
    this.block = void 0;
  }
}

export class BlockFee {
  @JsonProperty('success')
  public success: boolean;

  @JsonProperty('fee')
  public fee: number;

  constructor() {
    this.success = void 0;
    this.fee = void 0;
  }
}

export class Fees {
  @JsonProperty('send')
  public send: number;

  @JsonProperty('vote')
  public vote: number;

  @JsonProperty('secondsignature')
  public secondsignature: number;

  @JsonProperty('delegate')
  public delegate: number;

  @JsonProperty('multisignature')
  public multisignature: number;

  constructor() {
    this.send = void 0;
    this.vote = void 0;
    this.secondsignature = void 0;
    this.delegate = void 0;
    this.multisignature = void 0;
  }
}

export class BlockFees {
  @JsonProperty('success')
  public success: boolean;

  @JsonProperty({clazz: Fees, name: 'fees'})
  public fees: Fees;

  constructor() {
    this.success = void 0;
    this.fees = void 0;
  }
}

export class BlockHeight {
  @JsonProperty('success')
  public success: boolean;

  @JsonProperty('height')
  public height: number;

  @JsonProperty('id')
  public id: number;

  constructor() {
    this.success = void 0;
    this.height = void 0;
    this.id = void 0;
  }
}

export class BlockStatus {
  @JsonProperty('success')
  public success: boolean;

  @JsonProperty('epoch')
  public epoch: Date;

  @JsonProperty('height')
  public height: number;

  @JsonProperty('fee')
  public fee: number;

  @JsonProperty('milestone')
  public milestone: number;

  @JsonProperty('nethash')
  public nethash: string;

  @JsonProperty('reward')
  public reward: number;

  @JsonProperty('supply')
  public supply: number;

  constructor() {
    this.success = void 0;
    this.epoch = void 0;
    this.height = void 0;
    this.fee = void 0;
    this.milestone = void 0;
    this.nethash = void 0;
    this.reward = void 0;
    this.supply = void 0;
  }
}
