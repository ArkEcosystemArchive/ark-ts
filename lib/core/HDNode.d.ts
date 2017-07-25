/// <reference types="node" />
import * as model from '../model';
import { PrivateKey } from './Key';
export declare class HDNode {
    chainCode: Buffer;
    childNumber: Buffer;
    depth: number;
    fingerPrint: Buffer;
    isPrivate: boolean;
    key: PrivateKey;
    version: Buffer;
    network: string;
    constructor();
    static createMasterKey(seed: string | Buffer, networkType: model.NetworkType): HDNode;
    static unserialize(hash: string, networkType: model.NetworkType): HDNode;
    static generateSeed(): Buffer;
    childKey(index: number): HDNode;
    serialize(): string;
    toPublic(): HDNode;
    private getPublicHash();
    private getFingerPrint();
}
