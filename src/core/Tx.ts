/**
 * @module core
 */
/** Comunicate between transaction and keypair. */

import * as bytebuffer from 'bytebuffer';

import * as model from '../model/models';

import { PrivateKey, PublicKey } from './Key';

import Crypto from '../utils/Crypto';
import Slot from '../utils/Slot';

function padBytes(value: string, buf: Buffer) {
  const valBuffer = new Buffer(value);

  if (valBuffer.length <= buf.length) {
    buf.fill(0);
    valBuffer.copy(buf, buf.length - valBuffer.length);
  }

  return buf;
}

export default class Tx {
  public transaction: model.Transaction;

  private passphrase: string;
  private secondPassphrase: string;
  private privKey: PrivateKey;
  private secondPrivKey: PrivateKey;

  constructor(
    transaction: model.Transaction,
    network: model.Network,
    passphrase: string,
    secondPassphrase?: string) {

    this.transaction = transaction;
    this.passphrase = passphrase;
    this.secondPassphrase = secondPassphrase;
    this.privKey = PrivateKey.fromSeed(passphrase);
    this.privKey.publicKey.network = network;

    if (secondPassphrase) {
      this.secondPrivKey = PrivateKey.fromSeed(secondPassphrase);
    }
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
  public generate() {
    const tx = this.transaction;
    tx.timestamp = Slot.getTime();
    tx.senderPublicKey = this.privKey.publicKey.toHex();

    if (!tx.amount) {
      tx.amount = 0;
    }

    tx.signature = this.sign().toString('hex');

    if (this.secondPrivKey && !tx.asset.hasOwnProperty('signature')) { // if is not to create second signature
      tx.secondSenderPublicKey = this.secondPrivKey.publicKey.toHex();
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
    this.transaction.recipientId = this.privKey.publicKey.getAddress();
  }

  /**
   * Sign transaction.
   */
  public sign(): Buffer {
    return this.privKey.sign(this.toBytes());
  }

  /**
   * Sign transaction with second passphrase.
   */
  public secondSign(): Buffer {
    return this.secondPrivKey.sign(this.toBytes());
  }

  /**
   * Set asset to create second passphrase in current Tranasction.
   */
  public setAssetSignature(): void {
    this.transaction.asset = {
      signature: this.secondPrivKey.publicKey.toHex(),
    };
  }

  /**
   * Returns bytearray of the Transaction object to be signed and send to blockchain
   */
  public toBytes(): Buffer {
    const tx = this.transaction;
    const buf = new bytebuffer(undefined, true);

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

    if (tx.vendorField) {
      padVendor = padBytes(tx.vendorField, padVendor);
    }

    buf.append(padVendor);

    buf.writeLong(tx.amount);
    buf.writeLong(tx.fee);

    if (tx.asset && Object.keys(tx.asset).length > 0) {
      const asset = tx.asset[Object.keys(tx.asset)[0]];
      if (tx.type == model.TransactionType.CreateDelegate) {
        buf.append(padBytes(asset, new Buffer(20)), 'utf-8');
      } else {
        buf.append(new Buffer(asset, 'utf-8'));
      }
    }

    if (tx.signature) {
      buf.append(tx.signature, 'hex');
    }

    if (tx.signSignature) {
      buf.append(tx.signSignature, 'hex');
    }

    buf.flip();

    const txBytes = Crypto.hash256(buf.toBuffer());

    return txBytes;
  }

  /**
   * Verify an ECDSA signature from transaction
   */
  public verify(): boolean {
    const txBytes = Crypto.hash256(this.toBytes());
    const signBytes = new Buffer(this.transaction.signature, 'hex');
    const pub = PublicKey.fromHex(this.transaction.senderPublicKey);

    return pub.verifySignature(txBytes, signBytes);
  }

  /**
   * Verify an ECDSA second signature from transaction.
   */
  public secondVerify(): boolean {
    const txBytes = Crypto.hash256(this.toBytes());
    const signBytes = new Buffer(this.transaction.signSignature, 'hex');
    const pub = PublicKey.fromHex(this.transaction.secondSenderPublicKey);

    return pub.verifySignature(txBytes, signBytes);
  }

  /**
   * Returns calculated ID of transaction - hashed 256.
   */
  public getId() {
    return this.toBytes();
  }
}
