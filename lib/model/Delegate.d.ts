export declare class Delegate {
    username: string;
    address: string;
    publicKey: string;
    vote: string;
    producedBlocks: number;
    missedBlocks: number;
    rate: number;
    approval: number;
    productivity: number;
    constructor();
}
export declare class DelegateResponse {
    success: boolean;
    delegates?: Delegate[];
    delegate?: Delegate;
    totalCount: number;
    constructor();
}
export declare class DelegateQueryParams {
    username?: string;
    publicKey?: string;
    offset?: number;
    orderBy?: string;
    limit?: number;
    delegate?: Delegate;
    generatorPublicKey?: string;
    constructor();
}
export declare class AccountVoter {
    username: string;
    address: string;
    publicKey: string;
    balance: string;
    constructor();
}
export declare class DelegateVoters {
    success: boolean;
    accounts: AccountVoter[];
    constructor();
}
export declare class ForgedDetails {
    success: boolean;
    fees: string;
    rewards: string;
    forged: string;
    constructor();
}
