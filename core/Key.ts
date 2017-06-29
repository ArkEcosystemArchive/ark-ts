import * as secp256k1 from 'secp256k1';
import * as bs58check from 'bs58check';
import * as wif from 'wif';

import { Crypto } from '../utils/Crypto';

import * as model from '../model/models';

/* Throw new error based on condition */
function assert(condition: boolean, message: string = "Assertion failed") {
  if (!condition)
    throw new Error(message);
}

interface PublicKey {
  publicKey: Buffer,
  isCompressed: boolean,
  network: model.Network
}

interface PrivateKey {
  privateKey: Buffer,
  publicKey: PublicKey
}

export class Key {

  /* Return public key from address */
  static decodeAddress(address: string) {
    return bs58check.decode(address);
  }

  /* Return address from publicKey */
  static getAddress(pub: PublicKey):string {
    var payload = new Buffer(21);
    var hash = Crypto.ripemd160(pub.publicKey);
    var version = pub.network.version;

    payload.writeUInt8(version, 0);
    hash.copy(payload, 1);

    return bs58check.encode(payload);
  }

  /* Gets public and private key from private key of WIF format. */
  static getKeysFromWIF(wifString: string, network: model.Network = new model.Network().getDefault()) {
    var decoded = wif.decode(wifString);
    var version = decoded.version;

    assert(version == network.wif, 'Unknown network version');
    var privateKey = decoded.privateKey;
    var publicKey = this.getPublicKey(privateKey);

    var pub = <PublicKey>{
      publicKey: publicKey,
      isCompressed: true,
      network: network
    }

    var pri = <PrivateKey>{
      privateKey: privateKey,
      publicKey: pub
    }

    return pri;
  }

  /* Return public and private key from passphrase */
  static getKeys(passphrase: string | Buffer, network: model.Network = new model.Network().getDefault()) {
    var privateKey = this.getPrivateKey(passphrase);
    var publicKey = this.getPublicKey(privateKey);

    var pub = <PublicKey>{
      publicKey: publicKey,
      isCompressed: true,
      network: network
    }

    var pri = <PrivateKey>{
      privateKey: privateKey,
      publicKey: pub
    }

    return pri;
  }

  /* Return public key from 32-byte private key or passphrase. */
  static getPublicKey(privateKey: string | Buffer):Buffer {
    if (typeof privateKey === 'string')
      privateKey = this.getPrivateKey(privateKey);

    assert(privateKey.length === 32, "Bad private key");
    var compressed = secp256k1.publicKeyCreate(privateKey);

    return secp256k1.publicKeyConvert(compressed, true);
  }

  /* Return 32-byte private key from passphrase */
  static getPrivateKey(passphrase: string | Buffer):Buffer {
    let password;

    if (typeof passphrase === 'string') {
      password = new Buffer(passphrase, 'utf-8');
    } else {
      password = <Buffer>passphrase;
    }

    var hash = Crypto.sha256(password);

    return hash;
  }

  /* Create an ECDSA signature */
  static sign(hash: Buffer, pri: PrivateKey):Buffer {
    var sig = secp256k1.sign(hash, pri.privateKey).signature;
    return secp256k1.signatureExport(sig);
  }

  /* Returns WIF format string from PrivateKey */
  static toWIF(pri: PrivateKey):string {
    return wif.encode(pri.publicKey.network.wif, pri.privateKey, pri.publicKey.isCompressed);
  }

  /* Verify if is a valid address. */
  static validateAddress(address: string, network: model.Network) {
    try {
      var decode = this.decodeAddress(address);
      return decode[0] == network.version;
    } catch (e) {
      return false;
    }
  }

  /* Verify an ECDSA signature. */
  static verify(signature: Buffer, data: Buffer, pub: PublicKey | Buffer):boolean {
    var sig = secp256k1.signatureImport(signature);
    let pubKey:Buffer;

    if (pub instanceof Buffer) {
      pubKey = <Buffer>pub;
    } else {
      pubKey = pub.publicKey;
    }

    return secp256k1.verify(data, sig, pubKey);
  }

}