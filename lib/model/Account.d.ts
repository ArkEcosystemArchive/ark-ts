import { Delegate } from './Delegate';
export declare class Account {
    address: string;
    unconfirmedBalance: string;
    balance: string;
    publicKey: string;
    unconfirmedSignature: number;
    secondSignature: number;
    secondPublicKey: object;
    multiSignatures: object[];
    uMultiSignatures: object[];
    constructor();
}
export declare class AccountResponse {
    success: boolean;
    account?: Account;
    publicKey?: string;
    constructor();
}
export declare class AccountVotesResponse {
    success: boolean;
    delegates: Delegate[];
    constructor();
}
export declare class AccountQueryParams {
    address: string;
}
