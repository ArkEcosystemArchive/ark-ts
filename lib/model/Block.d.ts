export declare class Block {
    id: number;
    version: number;
    timestamp: number;
    height: number;
    previousBlock: number;
    numberOfTransactions: number;
    totalAmount: number;
    totalFee: number;
    reward: number;
    payloadLength: number;
    payloadHash: string;
    generatorPublicKey: string;
    generatorId: string;
    blockSignature: string;
    confirmations: number;
    totalForged: string;
    constructor();
}
export declare class BlockQueryParams {
    id: string;
}
export declare class BlockResponse {
    success: boolean;
    blocks?: Block[];
    block?: Block;
    constructor();
}
export declare class BlockFee {
    success: boolean;
    fee: number;
    constructor();
}
export declare class Fees {
    send: number;
    vote: number;
    secondsignature: number;
    delegate: number;
    multisignature: number;
    constructor();
}
export declare class BlockFees {
    success: boolean;
    fees: Fees;
    constructor();
}
export declare class BlockHeight {
    success: boolean;
    height: number;
    id: number;
    constructor();
}
