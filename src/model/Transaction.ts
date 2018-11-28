import { JsonProperty } from 'json-typescript-mapper';
import { PrivateKey } from '../index';

export enum TransactionType {
  SendArk = 0,
  SecondSignature = 1,
  CreateDelegate = 2,
  Vote = 3,
  MultiSignature = 4,
}

/** Transaction model. */
export class Transaction {
  @JsonProperty('id')
  public id?: string;

  @JsonProperty('timestamp')
  public timestamp?: number;

  @JsonProperty('recipientId')
  public recipientId?: string;

  @JsonProperty('amount')
  public amount?: number;

  @JsonProperty({clazz: Object, name: 'asset'})
  public asset?: object;

  @JsonProperty('fee')
  public fee?: number;

  @JsonProperty('type')
  public type?: TransactionType;

  @JsonProperty('vendorField')
  public vendorField?: string;

  @JsonProperty('signature')
  public signature?: string;

  @JsonProperty('signSignature')
  public signSignature?: string;

  @JsonProperty('senderPublicKey')
  public senderPublicKey?: string;

  @JsonProperty('secondSenderPublicKey')
  public secondSenderPublicKey?: string;

  @JsonProperty('requesterPublicKey')
  public requesterPublicKey?: string;

  @JsonProperty('blockid')
  public blockId?: string;

  @JsonProperty('height')
  public height?: number;

  @JsonProperty('senderId')
  public senderId?: string;

  @JsonProperty('confirmations')
  public confirmations?: number;

  constructor() {
    this.amount = void 0;
    this.asset = void 0;
    this.blockId = void 0;
    this.confirmations = void 0;
    this.fee = void 0;
    this.height = void 0;
    this.id = void 0;
    this.recipientId = void 0;
    this.requesterPublicKey = void 0;
    this.secondSenderPublicKey = void 0;
    this.senderId = void 0;
    this.senderPublicKey = void 0;
    this.signature = void 0;
    this.signSignature = void 0;
    this.timestamp = void 0;
    this.type = void 0;
    this.vendorField = void 0;
  }
}

export class TransactionQueryParams {
  public id?: string;
  public blockId?: string;
  public senderId?: string;
  public recipientId?: string;
  public limit?: number;
  public offset?: number;
  public orderBy?: string;
  public type?: TransactionType;
}

export class TransactionSend {

  @JsonProperty('amount')
  public amount: number;

  @JsonProperty('recipientId')
  public recipientId: string;

  @JsonProperty('passphrase')
  public passphrase: string | PrivateKey;

  @JsonProperty('publicKey')
  public publicKey?: string;

  @JsonProperty('secondPassphrase')
  public secondPassphrase?: string | PrivateKey;

  @JsonProperty('vendorField')
  public vendorField?: string;

  @JsonProperty('timestamp')
  public timestamp?: number;

  constructor() {
    this.amount = void 0;
    this.passphrase = void 0;
    this.publicKey = void 0;
    this.recipientId = void 0;
    this.secondPassphrase = void 0;
    this.vendorField = void 0;
  }
}

export class TransactionPostDataResponse {
  @JsonProperty('accept')
  public accept: string[];

  @JsonProperty('excess')
  public excess: string[];

  @JsonProperty('invalid')
  public invalid: string[];

  @JsonProperty('broadcast')
  public broadcast: string[];

  constructor() {
    this.accept = void 0;
    this.excess = void 0;
    this.invalid = void 0;
    this.broadcast = void 0;
  }
}

export class TransactionPostResponse {
  @JsonProperty('success')
  public success: boolean;

  @JsonProperty('transactionIds')
  public transactionIds: string[];

  @JsonProperty({clazz: TransactionPostDataResponse, name: 'data'})
  public data: TransactionPostDataResponse;

  constructor() {
    this.success = void 0;
    this.transactionIds = void 0;
    this.data = void 0;
  }
}

export class TransactionResponse {
  @JsonProperty('success')
  public success: boolean;

  @JsonProperty({clazz: Transaction, name: 'transactions'})
  public transactions: Transaction[];

  @JsonProperty({clazz: Transaction, name: 'transaction'})
  public transaction: Transaction;

  @JsonProperty('count')
  public count: string;

  @JsonProperty('error')
  public error: string;

  constructor() {
    this.success = void 0;
    this.transactions = void 0;
    this.transaction = void 0;
    this.count = void 0;
    this.error = void 0;
  }
}

export class TransactionPayload {
  @JsonProperty({clazz: Transaction, name: 'transactions'})
  public transactions: Transaction[];
}

export enum VoteType {
  Add,
  Remove,
}

export class TransactionVote {
  @JsonProperty('type')
  public type: VoteType;

  @JsonProperty('delegatePublicKey')
  public delegatePublicKey: string;

  @JsonProperty('passphrase')
  public passphrase: string | PrivateKey;

  @JsonProperty('secondPassphrase')
  public secondPassphrase?: string | PrivateKey;

  @JsonProperty('vendorField')
  public vendorField?: string;

  constructor() {
    this.type = void 0;
    this.delegatePublicKey = void 0;
    this.passphrase = void 0;
    this.secondPassphrase = void 0;
    this.vendorField = void 0;
  }
}

export class TransactionDelegate {
  @JsonProperty('username')
  public username: string;

  @JsonProperty('publicKey')
  public publicKey: string;

  @JsonProperty('passphrase')
  public passphrase: string | PrivateKey;

  @JsonProperty('secondPassphrase')
  public secondPassphrase?: string | PrivateKey;

  @JsonProperty('vendorField')
  public vendorField?: string;

  constructor() {
    this.username = void 0;
    this.publicKey = void 0;
    this.passphrase = void 0;
    this.secondPassphrase = void 0;
    this.vendorField = void 0;
  }
}
