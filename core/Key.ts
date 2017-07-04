import * as model from '../model/models';
import * as secp256k1 from 'secp256k1';
import * as wif from 'wif';

import { Crypto } from '../utils/Crypto';

export class PublicKey {

  constructor(public hash: Buffer, public isCompressed: boolean = true, public network?: model.Network) {}

  getAddress():string {
    if (!this.network) throw new Error('Network not defined');

    var payload = new Buffer(21);
    var buf = Crypto.ripemd160(this.hash);
    payload.writeUInt8(this.network.version, 0);
    buf.copy(payload, 1);

    return Crypto.bs58encode(buf);
  }

  toHex() {
    return this.hash.toString('hex');
  }

  verifySignature(signature: Buffer, data: Buffer) {
    var sig = secp256k1.signatureImport(signature);
    return secp256k1.verify(data, sig, this.hash);
  }

  static fromAddress(address: string):PublicKey {
    var hash = Crypto.bs58decode(address);
    return new PublicKey(hash);
  }

  static fromHex(hex: string):PublicKey {
    var buf = new Buffer(hex, 'hex');

    return new PublicKey(buf);
  }

  static validateAddress(address: string, network: model.Network) {
    try {
      var decode = this.fromAddress(address);
      return decode.hash[0] == network.version;
    } catch (e) {
      return false;
    }
  }

}

export class PrivateKey {

  constructor(public hash: Buffer, public publicKey?: PublicKey) {
    this.publicKey = this.getPublicKey();
  }

  getPublicKey():PublicKey {
    if (this.publicKey) return this.publicKey;

    var compressed = secp256k1.publicKeyCreate(this.hash);
    var pub = secp256k1.publicKeyConvert(compressed, true);
    return new PublicKey(pub);
  }

  sign(data: Buffer) {
    var sig = secp256k1.sign(data, this.hash).signature;

    return secp256k1.signatureExport(sig);
  }

  toHex() {
    return this.hash.toString('hex');
  }

  toWIF() {
    return wif.encode(this.publicKey.network.wif, this.hash, this.publicKey.isCompressed);
  }

  static fromWIF(wifString: string, network?: model.Network):PrivateKey {
    if (!network) network = new model.Network().getDefault();

    var decoded = wif.decode(wifString);
    var version = decoded.version;

    return new PrivateKey(decoded.privateKey);
  }

  static fromSeed(passphrase: string | Buffer):PrivateKey {
    let password;

    if (typeof passphrase === 'string') {
      password = new Buffer(passphrase, 'utf-8');
    } else {
      password = <Buffer>passphrase;
    }

    var hash = Crypto.sha256(password);

    return new PrivateKey(hash);
  }

}
