import { JsonProperty } from 'json-typescript-mapper';

export enum TransactionType {
  SendKapu = 0,
  SecondSignature = 1,
  CreateDelegate = 2,
  Vote = 3,
  MultiSignature = 4,
}

/** Transaction model. */
export class Transaction {
  @JsonProperty('id')
  id?: string;

  @JsonProperty('timestamp')
  timestamp?: number;

  @JsonProperty('recipientId')
  recipientId?: string;

  @JsonProperty('amount')
  amount?: number;

  @JsonProperty({clazz: Object, name: 'asset'})
  asset?: object;

  @JsonProperty('fee')
  fee?: number;

  @JsonProperty('type')
  type?: TransactionType;

  @JsonProperty('vendorField')
  vendorField?: string;

  @JsonProperty('signature')
  signature?: string;

  @JsonProperty('signSignature')
  signSignature?: string;

  @JsonProperty('senderPublicKey')
  senderPublicKey?: string;

  @JsonProperty('secondSenderPublicKey')
  secondSenderPublicKey?: string;

  @JsonProperty('requesterPublicKey')
  requesterPublicKey?: string;

  @JsonProperty('blockid')
  blockId?: string;

  @JsonProperty('height')
  height?: number;

  @JsonProperty('senderId')
  senderId?: string;

  @JsonProperty('confirmations')
  confirmations?: number;

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
  id?: string;
  blockId?: string;
  senderId?: string;
  recipientId?: string;
  limit?: number;
  offset?: number;
  orderBy?: string;
  type?: TransactionType;
}

export class TransactionSend {

  @JsonProperty('amount')
  amount: number;

  @JsonProperty('recipientId')
  recipientId: string;

  @JsonProperty('passphrase')
  passphrase: string;

  @JsonProperty('publicKey')
  publicKey?: string;

  @JsonProperty('secondPassphrase')
  secondPassphrase?: string;

  @JsonProperty('vendorField')
  vendorField?: string;

  @JsonProperty('timestamp')
  timestamp?: number;

  constructor() {
    this.amount = void 0;
    this.passphrase = void 0;
    this.publicKey = void 0;
    this.recipientId = void 0;
    this.secondPassphrase = void 0;
    this.vendorField = void 0;
  }
}

export class TransactionPostResponse {
  @JsonProperty('success')
  success: boolean;

  @JsonProperty({name: 'transactionIds'})
  transactionIds: string[];

  constructor() {
    this.success = void 0;
    this.transactionIds = void 0;
  }
}

export class TransactionResponse {
  @JsonProperty('success')
  success: boolean;

  @JsonProperty({clazz: Transaction, name: 'transactions'})
  transactions: Transaction[];

  @JsonProperty({clazz: Transaction, name: 'transaction'})
  transaction: Transaction;

  @JsonProperty('count')
  count: string;

  @JsonProperty('error')
  error: string;

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
  transactions: Transaction[];
}

export enum VoteType {
  Add,
  Remove,
}

export class TransactionVote {
  @JsonProperty('type')
  type: VoteType;

  @JsonProperty('delegatePublicKey')
  delegatePublicKey: string;

  @JsonProperty('passphrase')
  passphrase: string;

  @JsonProperty('secondPassphrase')
  secondPassphrase?: string;

  constructor() {
    this.type = void 0;
    this.delegatePublicKey = void 0;
    this.passphrase = void 0;
    this.secondPassphrase = void 0;
  }
}

export class TransactionDelegate {
  @JsonProperty('username')
  username: string;

  @JsonProperty('passphrase')
  passphrase: string;

  @JsonProperty('secondPassphrase')
  secondPassphrase?: string;

  constructor() {
    this.username = void 0;
    this.passphrase = void 0;
    this.secondPassphrase = void 0;
  }
}
