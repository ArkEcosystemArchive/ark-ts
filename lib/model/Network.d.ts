import { Peer } from './Peer';
export declare enum NetworkType {
    Mainnet = 0,
    Devnet = 1,
}
export declare class Network {
    type: NetworkType;
    name: string;
    nethash: string;
    token: string;
    symbol: string;
    version: number;
    explorer: string;
    wif?: number;
    activePeer: Peer;
    constructor();
    /**
     * Get list of all defaults networks.
     */
    static getAll(): Network[];
    /**
     * Get network from default config file based on type.
     */
    static getDefault(type?: NetworkType): Network;
    /**
     * Set peer to current network.
     */
    setPeer(peer: Peer): void;
    /**
     * Get formated peer url.
     */
    getPeerUrl(): string;
}
