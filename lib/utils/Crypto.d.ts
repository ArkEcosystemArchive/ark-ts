/// <reference types="node" />
export default class Crypto {
    static ripemd160(buffer: Buffer): Buffer;
    static sha1(buffer: Buffer): Buffer;
    static sha256(buffer: Buffer): Buffer;
    static hash160(buffer: Buffer): Buffer;
    static hash256(buffer: Buffer): Buffer;
    static hmacSha512(key: string | Buffer, buffer: Buffer): any;
    static randomSeed(size: number): Buffer;
    static bs58encode(buffer: Buffer): string;
    static bs58decode(hash: string): Buffer;
    static int32toBuffer(size: number): Buffer;
    static decodeCurvePoint(buffer: Buffer): any;
    static validateCurve(buffer: Buffer): boolean;
    static validateKey(key: Buffer): boolean;
    static addPrivateKeys(key: Buffer, priKey: Buffer): Buffer;
    static addPublicKeys(key: Buffer, pubKey: Buffer): Buffer;
}
