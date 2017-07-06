import * as bytebuffer from 'bytebuffer';
import * as bigi from 'bigi';

import * as model from '../model/models';
import config from '../config';

import { Crypto } from '../utils/Crypto';
import { PublicKey, PrivateKey } from './Key';

const MASTER_SECRET: string = 'Bitcoin seed';
const HIGHEST_BIT: number = 0x80000000;

export class HDNode {
  chainCode: Buffer; // 32 bytes
  childNumber: Buffer; // 4 bytes
  depth: number;
  fingerPrint: Buffer; // 4 bytes
  isPrivate: boolean;
  key: Buffer; // 33 bytes
  version: Buffer; // 4 bytes,
  network: Object;

  constructor() {}

  childKey(index: number) {
    var hardenedChild = index >= HIGHEST_BIT;
    var childIndexBytes = Crypto.int32toBuffer(index);

    if (!this.isPrivate && hardenedChild)
      throw new Error('Could not derive hardened child key');

    let data:Buffer;

    if (this.isPrivate) {
      if (hardenedChild) {
        data = Buffer.concat([new Buffer(1), this.key]);
      } else {
        data = this.getPublicHash();
      }
    } else {
      data = this.key;
    }

    data = Buffer.concat([data, childIndexBytes]);

    var hmac = Crypto.hmacSha512(this.chainCode, data);
    var iL = hmac.slice(0, 32);
    var iR = hmac.slice(32);

    Crypto.validateKey(iL);

    var childKey = new HDNode;
    childKey.childNumber = childIndexBytes;
    childKey.chainCode = iR;
    childKey.depth = this.depth + 1;
    childKey.isPrivate = this.isPrivate;
    childKey.network = this.network;

    if (this.isPrivate) {
      childKey.version = Crypto.int32toBuffer(this.network["private"]);
      childKey.fingerPrint = this.getFingerPrint();
      childKey.key = Crypto.addPrivateKeys(iL, this.key);
    } else {
      childKey.version = Crypto.int32toBuffer(this.network["public"]);
      childKey.fingerPrint = Crypto.hash160(this.key);
      childKey.key = Crypto.addPublicKeys(iL, this.key);
    }

    return childKey;
  }

  private getPublicHash():Buffer {
    if (this.isPrivate) {
      return new PrivateKey(this.key).publicKey.hash
    } else {
      return this.key;
    }
  }

  public serialize():string {
    var keyBytes = this.key;

    if (this.isPrivate) {
      keyBytes = Buffer.concat([new Buffer(0), keyBytes]);
    }

    var buffer = new bytebuffer(78, true);
    buffer.append(this.version);
    buffer.writeInt8(this.depth);
    buffer.append(this.fingerPrint);
    buffer.append(this.childNumber);
    buffer.append(this.chainCode);
    buffer.append(keyBytes);

    var serializedKey = Crypto.bs58encode(buffer.toBuffer());

    return serializedKey;
  }

  public toPublic():HDNode {
    var wallet = new HDNode;
    wallet.chainCode = this.chainCode;
    wallet.childNumber = this.childNumber;
    wallet.depth = this.depth;
    wallet.fingerPrint = this.fingerPrint;
    wallet.isPrivate = false;
    wallet.network = this.network;
    wallet.version = this.version;
    wallet.key = this.getPublicHash();

    return wallet;
  }

  private getFingerPrint() {
    return Crypto.hash160(this.getPublicHash()).slice(0, 4);
  }

  static createMasterKey(seed: string | Buffer, networkType: model.NetworkType):HDNode {
    var networkName = model.NetworkType[networkType].toLowerCase();
    var networkConfig = config.networks[networkName].bip32;

    if (typeof seed === 'string')
      seed = new Buffer(seed, 'hex');

    var hmac = Crypto.hmacSha512(MASTER_SECRET, seed);
    var keyBytes = hmac.slice(0, 32);
    var chainCode = hmac.slice(32);

    var wallet = new HDNode();
    wallet.chainCode = chainCode;
    wallet.childNumber = new Buffer(4);
    wallet.depth = 0;
    wallet.fingerPrint = new Buffer(4);
    wallet.isPrivate = true;
    wallet.key = keyBytes;
    wallet.version = Crypto.int32toBuffer(networkConfig["private"]);
    wallet.network = networkConfig;

    return wallet;
  }

  static unserialize(hash: string, networkType: model.NetworkType):HDNode {
    var networkName = model.NetworkType[networkType].toLowerCase();
    var networkConfig = config.networks[networkName].bip32;

    var buffer = Crypto.bs58decode(hash);
    if (buffer.length !== 78) throw new Error('Invalid buffer length')

    var version = buffer.readUInt32BE(0);

    if (version != networkConfig.public && version != networkConfig.private)
      throw new Error('Invalid network version');

    var depth = buffer[4];
    var parentFingerprint = buffer.readUInt32BE(5);

    if (depth === 0 && parentFingerprint !== 0x00000000) {
      throw new Error('Invalid parent fingerprint');
    }

    var index = buffer.readUInt32BE(9);
    if (depth === 0 && index !== 0) throw new Error('Invalid index');

    var chainCode = buffer.slice(13, 45);
    let key;

    if (version === networkConfig.private) {
      if (buffer.readUInt8(45) !== 0x00) throw new Error('Invalid private key');

      key = bigi.fromBuffer(buffer.slice(46, 78));
    } else {
      var curve = Crypto.decodeCurvePoint(buffer.slice(45, 78));

      Crypto.validateCurve(curve);

      key = curve;
    }

    var wallet = new HDNode;
    wallet.depth = depth;
    wallet.childNumber = Crypto.int32toBuffer(index);
    wallet.fingerPrint = Crypto.int32toBuffer(parentFingerprint);
    wallet.key = key;
    wallet.chainCode = chainCode;

    return wallet;
  }

  static generateSeed() {
    return Crypto.randomSeed(32);
  }

}
