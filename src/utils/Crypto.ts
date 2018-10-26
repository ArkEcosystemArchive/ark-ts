import * as bigi from 'bigi';
import * as bs58check from 'bs58check';
import * as createHash from 'create-hash';
import * as createHmac from 'create-hmac';
import * as ecurve from 'ecurve';
import * as randomBytes from 'randombytes';

const curveParams = ecurve.getCurveByName('secp256k1');

/** Crypto related functions. */
function assert(condition: boolean, message: string = 'Assertion failed') {
  if (!condition) {
    throw new Error(message);
  }
}

export default class Crypto {

  public static ripemd160(buffer: Buffer): Buffer {
    return createHash('rmd160').update(buffer).digest();
  }

  public static sha1(buffer: Buffer): Buffer {
    return createHash('sha1').update(buffer).digest();
  }

  public static sha256(buffer: Buffer): Buffer {
    return createHash('sha256').update(buffer).digest();
  }

  public static hash160(buffer: Buffer): Buffer {
    return this.ripemd160(this.sha256(buffer));
  }

  public static hash256(buffer: Buffer): Buffer {
    return this.sha256(this.sha256(buffer));
  }

  public static hmacSha512(key: string | Buffer, buffer: Buffer) {
    return createHmac('sha512', key).update(buffer).digest();
  }

  public static randomSeed(size: number): Buffer {
    return randomBytes(size);
  }

  public static bs58encode(buffer: Buffer): string {
    return bs58check.encode(buffer);
  }

  public static bs58decode(hash: string): Buffer {
    return bs58check.decode(hash);
  }

  public static int32toBuffer(size: number): Buffer {
    const buf = new Buffer(4);
    buf.writeInt32BE(size, 0);
    return buf;
  }

  public static decodeCurvePoint(buffer: Buffer) {
    return ecurve.Point.decodeFrom(curveParams, buffer);
  }

  public static validateCurve(buffer: Buffer): boolean {
    return curveParams.validate(buffer);
  }

  public static validateKey(key: Buffer): boolean {
    const buf = bigi.fromBuffer(key);
    assert(Number(buf.signum()) > 0, 'Private key must be greather than 0');
    assert(Number(buf.compareTo(curveParams.n)) <= 0, 'Private key must be less than the curve order');
    assert(key.length === 32, 'Private key must be equals to 32 byte');

    return true;
  }

  public static addPrivateKeys(key: Buffer, priKey: Buffer): Buffer {
    const keyBigi = bigi.fromBuffer(key);
    const privKeyBigi = bigi.fromBuffer(priKey);

    return keyBigi.add(privKeyBigi).mod(curveParams.n).toBuffer(32);
  }

  public static addPublicKeys(key: Buffer, pubKey: Buffer): Buffer {
    const keyBigi = bigi.fromBuffer(key);
    const pubKeyBigi = bigi.fromBuffer(pubKey);

    const keyPoint = curveParams.G.multiply(keyBigi);
    const pubKeyPoint = curveParams.G.multiply(pubKeyBigi);

    const expanded = keyPoint.add(pubKeyPoint);

    return expanded.getEncoded(true);
  }

}
