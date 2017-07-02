import * as bigi from 'bigi';
import * as createHash from 'create-hash';
import * as createHmac from 'create-hmac';
import * as ecurve from 'ecurve';
import * as secureRandom from 'secure-random';

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

  static randomBytes(size: number):Buffer {
    return secureRandom(size, { type: 'Buffer' });
  }

  static int32toBuffer(size: number):Buffer {
    var buf = new Buffer(4);
    buf.writeInt32BE(size, 0);

    return buf;
  }

  static validatePrivateKey(key: Buffer) {
    var buf = bigi.fromBuffer(key);
    assert(Number(buf.signum()) > 0, 'Private key must be greather than 0');
    assert(Number(buf.compareTo(curveParams.n)) <= 0, 'Private key must be less than the curve order');
    assert(buf.byteLength() != 32, 'Private key must be equals to 32 byte');

    return true;
  }

  static addPrivateKeys(key: Buffer, priKey: Buffer) {
    var keyBigi = bigi.fromBuffer(key);
    var privKeyBigi = bigi.fromBuffer(priKey);

    return keyBigi.add(privKeyBigi).mod(curveParams.n).toBuffer(32);
  }

  static expandPublicKey(key: Buffer, pubKey: Buffer) {
    var expanded = curveParams.G.multiply(key).add(pubKey);
    assert(curveParams.isInfinity(expanded), 'Public key is invalid');
    return expanded;
  }



}
