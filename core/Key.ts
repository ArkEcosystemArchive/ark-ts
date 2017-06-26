import * as secp256k1 from 'secp256k1';
import * as bs58check from 'bs58check';

import { Crypto } from '../utils/Crypto';
import { Network } from '../model/Network';

/* Throw new error based on condition */
function assert(condition: boolean, message: string) {
  if (!condition)
    throw new Error(message || "Assertion failed");
}

interface PublicKey {
  publicKey: Buffer,
  isCompressed: boolean,
  network: Network
}

interface PrivateKey {
  privateKey: Buffer,
  publicKey: PublicKey
}

export class Key {

  /* Return public and private key */
  static getKeys(passphrase: string, network?: Network) {
    var privateKey = this.getPrivateKey(passphrase);
    var publicKey = this.getPublicKey(privateKey);
    if (!network) network = new Network().getDefault(); // mainnet

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

  /* Return public key from 32-byte private key. */
  static getPublicKey(privateKey: Buffer):Buffer {
    assert(privateKey.length === 32, "Bad private key");
    var compressed = secp256k1.publicKeyCreate(privateKey);

    return secp256k1.publicKeyConvert(compressed, true);
  }

  /* Return 32-byte private key from passphrase */
  static getPrivateKey(passphrase: string):Buffer {
    var hash = Crypto.sha256(new Buffer(passphrase, 'utf-8'));

    return hash;
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

  /* Create an ECDSA signature */
  static sign(hash: Buffer, pri: PrivateKey):Buffer {
    var sig = secp256k1.sign(hash, pri.privateKey).signature;
    return secp256k1.signatureExport(sig);
  }

  /* Verify an ECDSA signature. */
  static verify(signature: Buffer, data: Buffer, pub: PublicKey):boolean {
    var sig = secp256k1.signatureImport(signature);
    return secp256k1.verify(data, sig, pub.publicKey);
  }

}