/// <reference types="node" />
import * as model from '../model';
export declare class PublicKey {
    hash: Buffer;
    isCompressed: boolean;
    network: model.Network;
    constructor(hash: Buffer, isCompressed?: boolean, network?: model.Network);
    static fromAddress(address: string): PublicKey;
    static fromHex(hex: string): PublicKey;
    static validateAddress(address: string, network: model.Network): boolean;
    getAddress(): string;
    /**
     * Set a network to publicKey
     * Useful to get address from specific version
     */
    setNetwork(network: model.Network): void;
    toHex(): string;
    verifySignature(signature: Buffer, data: Buffer): any;
}
export declare class PrivateKey {
    hash: Buffer;
    private publicKey;
    constructor(hash?: Buffer, publicKey?: PublicKey | Buffer);
    static fromWIF(wifString: string, network?: model.Network): PrivateKey;
    static fromSeed(passphrase: string | Buffer, network?: model.Network): PrivateKey;
    getPublicKey(): PublicKey;
    sign(data: Buffer): any;
    toHex(): string;
    toWIF(): any;
}
