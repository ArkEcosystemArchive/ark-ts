/**
 * @module core
 */
/** HD Wallet. */

import * as bigi from 'bigi';
import * as bytebuffer from 'bytebuffer';

import config from '../config';
import * as model from '../model';

import Crypto from '../utils/Crypto';
import { PrivateKey, PublicKey } from './Key';

const MASTER_SECRET: string = 'Bitcoin seed';
const HIGHEST_BIT: number = 0x80000000;

export class HDNode {
  public chainCode: Buffer; // 32 bytes
  public childNumber: Buffer; // 4 bytes
  public depth: number;
  public fingerPrint: Buffer; // 4 bytes
  public isPrivate: boolean;
  public key: PrivateKey; // 33 bytes
  public version: Buffer; // 4 bytes,
  public network: string;

  constructor() {
    // pass
  }

public static createMasterKey(seed: string | Buffer, networkType: model.NetworkType): HDNode {
    const networkName = model.NetworkType[networkType].toLowerCase();
    const networkConfig = config.networks[networkName].bip32;

    if (typeof seed === 'string') {
      seed = new Buffer(seed, 'hex');
    }

    const hmac = Crypto.hmacSha512(MASTER_SECRET, seed);
    const keyBytes = hmac.slice(0, 32);
    const chainCode = hmac.slice(32);

    const wallet = new HDNode();
    wallet.chainCode = chainCode;
    wallet.childNumber = new Buffer(4);
    wallet.depth = 0;
    wallet.fingerPrint = new Buffer(4);
    wallet.isPrivate = true;
    wallet.key = new PrivateKey(keyBytes);
    wallet.version = Crypto.int32toBuffer(networkConfig['private']);
    wallet.network = networkName;

    return wallet;
  }

public static unserialize(hash: string, networkType: model.NetworkType): HDNode {
    const networkName = model.NetworkType[networkType].toLowerCase();
    const networkConfig = config.networks[networkName].bip32;

    const buffer = Crypto.bs58decode(hash);
    if (buffer.length !== 78) {
      throw new Error('Invalid buffer length');
    }

    const version = buffer.readUInt32BE(0);

    if (version !== networkConfig.public && version !== networkConfig.private) {
      throw new Error('Invalid network version');
    }

    const depth = buffer[4];
    const parentFingerprint = buffer.slice(5, 9);

    if (depth === 0 && parentFingerprint.toString('hex') !== '00000000') {
      throw new Error('Invalid parent fingerprint');
    }

    const index = buffer.readUInt32BE(9);
    if (depth === 0 && index !== 0) {
      throw new Error('Invalid index');
    }

    const chainCode = buffer.slice(13, 45);
    let key;

    if (version === networkConfig.private) {
      if (buffer.readUInt8(45) !== 0x00) {
        throw new Error('Invalid private key');
      }

      key = new PrivateKey(buffer.slice(46, 78));
    } else {
      const curve = Crypto.decodeCurvePoint(buffer.slice(45, 78));

      Crypto.validateCurve(curve);

      key = new PrivateKey(null, curve);
    }

    const wallet = new HDNode();
    wallet.depth = depth;
    wallet.childNumber = Crypto.int32toBuffer(index);
    wallet.fingerPrint = parentFingerprint;
    wallet.key = key;
    wallet.chainCode = chainCode;
    wallet.network = networkName;

    const networkCapitalize = networkName.charAt(0).toUpperCase() + networkName.slice(1);
    wallet.key.getPublicKey().network = model.Network.getDefault(model.NetworkType[networkCapitalize]);

    return wallet;
  }

  public static generateSeed() {
    return Crypto.randomSeed(32);
  }

  public childKey(index: number) {
    const networkConfig = config.networks[this.network].bip32;

    const hardenedChild = index >= HIGHEST_BIT;
    const childIndexBytes = Crypto.int32toBuffer(index);

    if (!this.isPrivate && hardenedChild) {
      throw new Error('Could not derive hardened child key');
    }

    let data: Buffer;

    if (this.isPrivate) {
      if (hardenedChild) {
        data = Buffer.concat([new Buffer(1), this.key.hash]);
      } else {
        data = this.getPublicHash();
      }
    } else {
      data = this.key.getPublicKey().hash;
    }

    data = Buffer.concat([data, childIndexBytes]);

    const hmac = Crypto.hmacSha512(this.chainCode, data);
    const iL = hmac.slice(0, 32);
    const iR = hmac.slice(32);

    Crypto.validateKey(iL);

    const childKey = new HDNode();
    childKey.childNumber = childIndexBytes;
    childKey.chainCode = iR;
    childKey.depth = this.depth + 1;
    childKey.isPrivate = this.isPrivate;
    childKey.network = this.network;

    let newKey: PrivateKey;

    if (this.isPrivate) {
      childKey.version = Crypto.int32toBuffer(networkConfig['private']);
      childKey.fingerPrint = this.getFingerPrint();
      const priv = Crypto.addPrivateKeys(iL, this.key.hash);
      newKey = new PrivateKey(priv);
    } else {
      childKey.version = Crypto.int32toBuffer(networkConfig['public']);
      childKey.fingerPrint = Crypto.hash160(this.getPublicHash());
      const pub = Crypto.addPublicKeys(iL, this.getPublicHash());
      newKey = new PrivateKey(null, pub);
    }

    const networkCapitalize = this.network.charAt(0).toUpperCase() + this.network.slice(1);
    newKey.getPublicKey().setNetwork(model.Network.getDefault(model.NetworkType[networkCapitalize]));

    childKey.key = newKey;

    return childKey;
  }

  public serialize(): string {
    let keyBytes;

    if (this.isPrivate) {
      keyBytes = Buffer.concat([new Buffer(1), this.key.hash]);
    } else {
      keyBytes = this.getPublicHash();
    }

    const buffer = new bytebuffer(78, true);
    buffer.append(this.version);
    buffer.writeInt8(this.depth);
    buffer.append(this.fingerPrint);
    buffer.append(this.childNumber);
    buffer.append(this.chainCode);
    buffer.append(keyBytes);

    buffer.flip();

    const serializedKey = Crypto.bs58encode(buffer.toBuffer());

    return serializedKey;
  }

  public toPublic(): HDNode {
    const wallet = new HDNode();
    wallet.isPrivate = false;

    wallet.chainCode = this.chainCode;
    wallet.childNumber = this.childNumber;
    wallet.depth = this.depth;
    wallet.fingerPrint = this.fingerPrint;
    wallet.network = this.network;
    wallet.version = this.version;
    wallet.key = this.key;

    return wallet;
  }

  private getPublicHash(): Buffer {
    return this.key.getPublicKey().hash;
  }

  private getFingerPrint() {
    return Crypto.hash160(this.getPublicHash()).slice(0, 4);
  }

}
