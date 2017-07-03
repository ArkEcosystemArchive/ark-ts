import * as bytebuffer from 'bytebuffer';

import * as model from '../model/models';
import config from '../config';

import { Crypto } from '../utils/Crypto';
import { Key } from './Key';

const MASTER_SECRET: string = 'Bitcoin seed';
const HIGHEST_BIT: number = 0x80000000;

export interface Bip32 {
  chainCode: Buffer, // 32 bytes
  childNumber: Buffer, // 4 bytes
  depth: number,
  fingerPrint: Buffer, // 4 bytes
  isPrivate: boolean,
  key: Buffer, // 33 bytes
  version: Buffer, // 4 bytes,
  network: Object
}

export class HDNode {

  constructor(private masterKey: Bip32) {}

  /**
   * Creates a new master key from a seed
   *
   * @static
   * @param {(string | Buffer)} seed - Buffer or Hex string containing 32 byte
   * @param {model.NetworkType} networkType
   * @returns {Bip32}
   * @memberof HDNode
   */
  static createMasterKey(seed: string | Buffer, networkType: model.NetworkType):HDNode {
    var networkName = model.NetworkType[networkType].toLowerCase();
    var networkConfig = config.networks[networkName].bip32;

    if (typeof seed === 'string')
      seed = new Buffer(seed, 'hex');

    var hmac = Crypto.hmacSha512(MASTER_SECRET, seed);
    var keyBytes = hmac.slice(0, 32);
    var chainCode = hmac.slice(32);

    Crypto.validatePrivateKey(keyBytes);

    var bip32 = <Bip32>{
      chainCode: chainCode,
      childNumber: new Buffer(4),
      depth: 0,
      fingerPrint: new Buffer(4),
      isPrivate: true,
      key: keyBytes,
      version: Crypto.int32toBuffer(networkConfig.private),
      network: networkConfig
    }

    return new HDNode(bip32);
  }

  /**
   * Derives a child key from a given parent as outlined by bip32
   *
   * @param {number} index
   * @returns {Bip32}
   * @memberof HDNode
   */
  derive(index: number):HDNode {
    var hardenedChild = index >= HIGHEST_BIT;
    var childIndexBytes = Crypto.int32toBuffer(index);

    if (!this.masterKey.isPrivate && hardenedChild)
      throw new Error('Could not derive hardened child key');

    let data:Buffer;

    if (hardenedChild) {
      data = Buffer.concat([new Buffer(1), this.masterKey.key]);
    } else {
      data = this.getPublicKey();
    }

    data = Buffer.concat([data, childIndexBytes]);

    var hmac = Crypto.hmacSha512(this.masterKey.chainCode, data);
    var childKey = <Bip32>{
      childNumber: childIndexBytes,
      chainCode: data.slice(32),
      depth: this.masterKey.depth + 1,
      isPrivate: this.masterKey.isPrivate
    }

    if (this.masterKey.isPrivate) {
      childKey.version = Crypto.int32toBuffer(this.masterKey.network["private"]);
      childKey.fingerPrint = this.getFingerPrint();
      childKey.key = Crypto.addPrivateKeys(data.slice(0, 32), this.masterKey.key);

      Crypto.validatePrivateKey(childKey.key);
    } else {
      var keyBytes = Key.getPublicKey(data.slice(0, 32));

      childKey.version = Crypto.int32toBuffer(this.masterKey.network["public"]);
      childKey.fingerPrint = this.getFingerPrint();
      childKey.key = Crypto.expandPublicKey(data.slice(0, 32), keyBytes);
    }

    return new HDNode(childKey);
  }

  public getPublicKey() {
    if (this.masterKey.isPrivate) {
      return Key.getPublicKey(this.masterKey.key);
    } else {
      return this.masterKey.key;
    }
  }

  public getAddress() {
    let pub = this.getPublicKey();

    return Key.getAddress(pub, Number(this.masterKey.version.toString()));
  }

  /**
   * Serialize a Key to a 78 byte byte slice
   *
   * @returns {Buffer}
   * @memberof HDNode
   */
  public serialize():Buffer {
    var keyBytes = this.masterKey.key;

    if (this.masterKey.isPrivate) {
      keyBytes = Buffer.concat([new Buffer(0), keyBytes]);
    }

    var buffer = new bytebuffer(78, true);
    buffer.append(this.masterKey.version);
    buffer.writeInt8(this.masterKey.depth);
    buffer.append(this.masterKey.fingerPrint);
    buffer.append(this.masterKey.childNumber);
    buffer.append(this.masterKey.chainCode);
    buffer.append(keyBytes);

    var serializedKey = Crypto.bs58encode(buffer.toBuffer());

    return serializedKey;
  }

  public sign(hash: Buffer) {
    return Key.sign(hash, this.masterKey.key);
  }

  public verify(signature: Buffer, buffer: Buffer) {
    var pub = this.getPublicKey();

    return Key.verify(signature, buffer, pub);
  }

  private getFingerPrint() {
    return Crypto.hash160(Key.getPublicKey(this.masterKey.key)).slice(0, 4);
  }

  static makeRandomSeed() {
    return Crypto.randomBytes(256);
  }

}
