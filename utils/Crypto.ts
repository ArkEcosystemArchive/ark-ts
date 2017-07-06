import * as bigi from 'bigi';
import * as createHash from 'create-hash';
import * as createHmac from 'create-hmac';
import * as ecurve from 'ecurve';
import * as randomBytes from 'randombytes';
import * as bs58check from 'bs58check';

const curveParams = ecurve.getCurveByName('secp256k1');

function assert(condition: boolean, message: string = "Assertion failed") {
  if (!condition)
    throw new Error(message);
}

export class Crypto {

  static ripemd160(buffer: Buffer):Buffer {
    return createHash('rmd160').update(buffer).digest();
  }

  static sha1(buffer: Buffer):Buffer {
    return createHash('sha1').update(buffer).digest();
  }

  static sha256(buffer: Buffer):Buffer {
    return createHash('sha256').update(buffer).digest();
  }

  static hash160(buffer: Buffer):Buffer {
    return this.ripemd160(this.sha256(buffer));
  }

  static hash256(buffer: Buffer):Buffer {
    return this.sha256(this.sha256(buffer));
  }

  static hmacSha512(key:string | Buffer, buffer:Buffer) {
    return createHmac('sha512', key).update(buffer).digest();
  }

  static randomSeed(size: number):Buffer {
    return randomBytes(size);
  }

  static bs58encode(buffer: Buffer):string {
    return bs58check.encode(buffer);
  }

  static bs58decode(hash: string):Buffer {
    return bs58check.decode(hash);
  }

  static int32toBuffer(size: number):Buffer {
    var buf = new Buffer(4);
    buf.writeInt32BE(size, 0);
    return buf;
  }

  static decodeCurvePoint(buffer: Buffer) {
    return ecurve.Point.decodeFrom(curveParams, buffer);
  }

  static validateCurve(buffer: Buffer) {
    return curveParams.validate(buffer);
  }

  static validateKey(key: Buffer) {
    var buf = bigi.fromBuffer(key);
    assert(Number(buf.signum()) > 0, 'Private key must be greather than 0');
    assert(Number(buf.compareTo(curveParams.n)) <= 0, 'Private key must be less than the curve order');
    // assert(buf.byteLength() != 32, 'Private key must be equals to 32 byte');

    return true;
  }

  static addPrivateKeys(key: Buffer, priKey: Buffer) {
    var keyBigi = bigi.fromBuffer(key);
    var privKeyBigi = bigi.fromBuffer(priKey);

    return keyBigi.add(privKeyBigi).mod(curveParams.n).toBuffer(32);
  }

  static addPublicKeys(key: Buffer, pubKey: Buffer):Buffer {
    var keyBigi = bigi.fromBuffer(key);
    var pubKeyBigi = bigi.fromBuffer(pubKey);

    var keyPoint = curveParams.G.multiply(keyBigi);
    var pubKeyPoint = curveParams.G.multiply(pubKeyBigi);

    var expanded = keyPoint.add(pubKeyPoint);

    return expanded.getEncoded(true);
  }

}
