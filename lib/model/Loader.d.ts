export declare class LoaderStatus {
    success: boolean;
    loaded: false;
    now: number;
    blocksCount: number;
    constructor();
}
export declare class LoaderStatusSync {
    success: boolean;
    syncing: false;
    blocks: number;
    height: number;
    id: string;
    constructor();
}
export declare class LoaderNetworkResponse {
    nethash: string;
    token: string;
    symbol: string;
    explorer: string;
    version: string;
    constructor();
}
export declare class LoaderAutoConfigure {
    success: boolean;
    network: LoaderNetworkResponse;
    constructor();
}
