import { JsonObject, JsonMember } from 'typedjson-npm';

export enum TransactionType {
  SendArk = 0,
  SecondSignature = 1,
  CreateDelegate = 2,
  Vote = 3,
  MultiSignature = 4
}

@JsonObject
export class Transaction {
  @JsonMember({ type: String })
  id: string;

  @JsonMember({ type: Number })
  timestamp: number;

  @JsonMember({ type: String })
  recipientId: string;

  @JsonMember({ type: Number })
  amount: number;

  @JsonMember({ type: Object })
  asset: Object;

  @JsonMember({ type: Number })
  fee: number;

  @JsonMember({ type: Object, refersAbstractType: true })
  type: TransactionType;

  @JsonMember({ type: String })
  vendorField: string;

  @JsonMember({ type: String })
  signature: string;

  @JsonMember({ type: String })
  signSignature: string;

  @JsonMember({ type: String })
  senderPublicKey: string;

  @JsonMember({ type: String })
  secondSenderPublicKey: string;

  @JsonMember({ type: String })
  requesterPublicKey: string;

  @JsonMember({ type: String })
  blockId: string;

  @JsonMember({ type: Number })
  height: number;

  @JsonMember({ type: String })
  senderId: string;

  @JsonMember({ type: Number })
  confirmations: number
}

@JsonObject
export class TransactionQueryParams {
  @JsonMember({ type: String })
  id: string;

  @JsonMember({ type: String })
  blockId: string;

  @JsonMember({ type: String })
  senderId: string;

  @JsonMember({ type: String })
  recipientId: string;

  @JsonMember({ type: Number })
  limit: number;

  @JsonMember({ type: Number })
  offset: number;

  @JsonMember({ type: String })
  orderBy: string;

  @JsonMember({ type: Object, refersAbstractType: true })
  type: TransactionType
}

@JsonObject
export class TransactionSend {

  @JsonMember({ type: Number })
  amount: number;

  @JsonMember({ type: String })
  recipientId: string;

  @JsonMember({ type: String })
  passphrase: string;

  @JsonMember({ type: String })
  publicKey?: string;

  @JsonMember({ type: String })
  secondPassphrase?: string;

  @JsonMember({ type: String })
  vendorField?: string;

}

@JsonObject
export class TransactionResponse {
  @JsonMember({ type: Boolean })
  success: boolean;

  @JsonMember({ elements: Transaction })
  transactions: Array<Transaction>;

  @JsonMember({ type: Transaction })
  transaction: Transaction;

  @JsonMember({ type: String })
  count: string;

  @JsonMember({ type: String })
  error: string
}

@JsonObject
export class TransactionPayload {
  @JsonMember({ elements: Transaction })
  transactions: Array<Transaction>;
}
