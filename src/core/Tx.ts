import * as bytebuffer from 'bytebuffer';

import * as model from '../model';

import { PrivateKey, PublicKey } from './Key';

import Crypto from '../utils/Crypto';
import Slot from '../utils/Slot';

function padBytes(value: string, buf: Buffer) {
  const valBuffer = new Buffer(value.length > buf.length ? value.substr(0, buf.length) : value);

  valBuffer.copy(buf, 0);
  for (let i=0; i < buf.length - valBuffer.length; i++) {
    buf.writeInt8(0, i + valBuffer.length);
  }

  return buf;
}

/** Communicate between transaction and keypair. */
export default class Tx {
  public transaction: model.Transaction;

  private privKey: PrivateKey;
  private secondPrivKey: PrivateKey;

  constructor(
    transaction: model.Transaction,
    network: model.Network,
    key: string | PrivateKey,
    secondKey?: string | PrivateKey,
  ) {
    this.transaction = transaction;

    if (typeof key === 'string') {
      key = PrivateKey.fromSeed(key, network);
    }

    if (secondKey) {
      if (typeof secondKey === 'string') {
        secondKey = PrivateKey.fromSeed(secondKey, network);
      }

      this.secondPrivKey = secondKey;
    }

    this.privKey = key;
    this.privKey.getPublicKey().setNetwork(network);
  }

  /**
   * Generate transaction
   * Call all steps to generate a id.
   */
  public static fromBytes(hash: string) {
    const buf = new bytebuffer.fromHex(hash, true, false);
    const type = buf.readByte();
    const timestamp = buf.readInt();
    const senderPublicKey = buf.readBytes(33).toBuffer();

    let recipientBegin = buf.readBytes(21);

    if (type === 0 || type === 3) {
      recipientBegin = buf.readBytes(13).prepend(recipientBegin);
    }

    recipientBegin = recipientBegin.toBuffer();

    const vendorField = buf.readBytes(64).toBuffer();
    const amount = buf.readLong().low;
    const fee = buf.readLong().low;

    let asset;

    switch (type) {
      case model.TransactionType.CreateDelegate:
        asset = buf.readBytes(20);
      case model.TransactionType.Vote:
        asset = buf.readBytes(67);
      case model.TransactionType.SecondSignature:
        asset = buf.readBytes(33);
    }

    // TODO
    // signature

  }

  /**
   * Generate transaction
   * Call all steps to generate a id.
   */
  public generate(): model.Transaction {
    const tx = this.transaction;
    tx.timestamp = tx.timestamp || Slot.getTime();
    tx.senderPublicKey = this.privKey.getPublicKey().toHex();

    if (!tx.amount) {
      tx.amount = 0;
    }

    tx.signature = this.sign().toString('hex');

    if (this.secondPrivKey && (tx.asset && !tx.asset.hasOwnProperty('signature'))) { // if is not to create second signature
      tx.secondSenderPublicKey = this.secondPrivKey.getPublicKey().toHex();
      tx.signSignature = this.secondSign().toString('hex');
    }

    tx.id = this.getId().toString('hex');

    this.transaction = tx;

    return tx;
  }

  /**
   * Set address by current publicKey.
   * To reference transaction without a recipient.
   */
  public setAddress(): void {
    this.transaction.recipientId = this.privKey.getPublicKey().getAddress();
  }

  /**
   * Sign transaction.
   */
  public sign(): Buffer {
    return this.privKey.sign(this.getHash(true, true));
  }

  /**
   * Sign transaction with second passphrase.
   */
  public secondSign(): Buffer {
    return this.secondPrivKey.sign(this.getHash(false, false));
  }

  /**
   * Set asset to create second passphrase in current Tranasction.
   */
  public setAssetSignature(): void {
    this.transaction.asset = {
      signature: {
        publicKey: this.secondPrivKey.getPublicKey().toHex(),
      },
    };
  }

  /**
   * Returns bytearray of the Transaction object to be signed and send to blockchain
   */
  public toBytes(skipSignature: boolean = false, skipSecondSignature: boolean = false): Buffer {
    const tx = this.transaction;
    const buf = new bytebuffer(1 + 4 + 32 + 8 + 8 + 21 + 64 + 64 + 64, true);

    buf.writeByte(tx.type);
    buf.writeInt(tx.timestamp);

    buf.append(tx.senderPublicKey, 'hex');

    if (tx.requesterPublicKey) {
      buf.append(tx.requesterPublicKey, 'hex');
    }

    if (typeof tx.recipientId !== 'undefined') {
      buf.append(PublicKey.fromAddress(tx.recipientId).hash);
    } else {
      buf.append(new Buffer(21));
    }

    let padVendor = new Buffer(64);
    padVendor = padBytes(tx.vendorField || '', padVendor);

    buf.append(padVendor);

    buf.writeLong(tx.amount);
    buf.writeLong(tx.fee);

    if (tx.asset && Object.keys(tx.asset).length > 0) {
      const asset = tx.asset;
      if (tx.type === model.TransactionType.CreateDelegate) {
        buf.append(padBytes(asset['delegate']['username'], new Buffer(20)), 'utf-8');
      } else if (tx.type === model.TransactionType.SecondSignature) {
        buf.append(new Buffer(asset['signature']['publicKey'], 'utf-8'));
      } else if (tx.type === model.TransactionType.Vote) {
        buf.append(new Buffer(asset['votes'].join(''), 'utf-8'));
      }
    }

    if (!skipSignature && tx.signature) {
      buf.append(tx.signature, 'hex');
    }

    if (!skipSecondSignature && tx.signSignature) {
      buf.append(tx.signSignature, 'hex');
    }

    buf.flip();

    const txBytes = buf.toBuffer();

    return txBytes;
  }

  public getHash(skipSignature: boolean = false, skipSecondSignature: boolean = false) {
    return Crypto.sha256(this.toBytes(skipSignature, skipSecondSignature));
  }

  /**
   * Verify an ECDSA signature from transaction
   */
  public verify(): boolean {
    const txBytes = this.getHash(true, true);
    const signBytes = new Buffer(this.transaction.signature, 'hex');

    return this.privKey.getPublicKey().verifySignature(signBytes, txBytes);
  }

  /**
   * Verify an ECDSA second signature from transaction.
   */
  public secondVerify(): boolean {
    const txBytes = Crypto.hash256(this.getHash(false, false));
    const signBytes = new Buffer(this.transaction.signSignature, 'hex');
    const pub = PublicKey.fromHex(this.transaction.secondSenderPublicKey);

    return pub.verifySignature(signBytes, txBytes);
  }

  /**
   * Returns calculated ID of transaction - hashed 256.
   */
  public getId() {
    return this.getHash();
  }
}
