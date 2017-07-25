export declare enum TransactionType {
    SendArk = 0,
    SecondSignature = 1,
    CreateDelegate = 2,
    Vote = 3,
    MultiSignature = 4,
}
export declare class Transaction {
    id?: string;
    timestamp?: number;
    recipientId?: string;
    amount?: number;
    asset?: object;
    fee?: number;
    type?: TransactionType;
    vendorField?: string;
    signature?: string;
    signSignature?: string;
    senderPublicKey?: string;
    secondSenderPublicKey?: string;
    requesterPublicKey?: string;
    blockId?: string;
    height?: number;
    senderId?: string;
    confirmations?: number;
    constructor();
}
export declare class TransactionQueryParams {
    id?: string;
    blockId?: string;
    senderId?: string;
    recipientId?: string;
    limit?: number;
    offset?: number;
    orderBy?: string;
    type?: TransactionType;
}
export declare class TransactionSend {
    amount: number;
    recipientId: string;
    passphrase: string;
    publicKey?: string;
    secondPassphrase?: string;
    vendorField?: string;
    constructor();
}
export declare class TransactionResponse {
    success: boolean;
    transactions: Transaction[];
    transaction: Transaction;
    count: string;
    error: string;
    constructor();
}
export declare class TransactionPayload {
    transactions: Transaction[];
}
export declare enum VoteType {
    Add = 0,
    Remove = 1,
}
export declare class TransactionVote {
    type: VoteType;
    delegatePublicKey: string;
    passphrase: string;
    secondPassphrase?: string;
    constructor();
}
export declare class TransactionDelegate {
    username: string;
    passphrase: string;
    secondPassphrase?: string;
    constructor();
}
