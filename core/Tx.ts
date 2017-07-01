import * as bytebuffer from 'bytebuffer';

import * as model from '../model/models';

import { Key } from './Key';
import { Crypto } from '../utils/Crypto';
import { Slot } from '../utils/Slot';

function padBytes(value: string, buf: Buffer) {
  var valBuffer = new Buffer(value);

  if (valBuffer.length <= buf.length) {
    buf.fill(0);
    valBuffer.copy(buf, buf.length - valBuffer.length);
  }

  return buf;
}
/* Comunicate between transaction and keypair */
export class Tx {

  private privKey;
  private secondPrivKey;

  constructor(public transaction: model.Transaction, network: model.Network, private passphrase: string, private secondPassphrase?: string) {
    this.privKey = Key.getKeys(passphrase, network);

    if (secondPassphrase) {
      this.secondPrivKey = Key.getKeys(secondPassphrase);
    }
  }

  public generate() {
    var tx = this.transaction;
    tx.timestamp = Slot.getTime();
    tx.senderPublicKey = this.privKey.publicKey.publicKey.toString('hex');

    if (!tx.amount) {
      tx.amount = 0;
    }

    tx.signature = this.sign().toString('hex');

    if (this.secondPrivKey && !tx.asset.hasOwnProperty('signature')) { // if is not to create second signature
      tx.secondSenderPublicKey = this.secondPrivKey.publicKey.publicKey.toString('hex');
      tx.signSignature = this.secondSign().toString('hex');
    }

    tx.id = this.getId().toString('hex');

    this.transaction = tx;

    return tx;
  }

  public setAddress():void {
    this.transaction.recipientId = Key.getAddress(this.privKey.publicKey);
  }

  public sign():Buffer {
    return Key.sign(this.toBytes(), this.privKey);
  }

  public secondSign():Buffer {
    return Key.sign(this.toBytes(), this.secondPrivKey);
  }

  public setAssetSignature() {
    this.transaction.asset = {
      signature: this.secondPrivKey.publicKey.publicKey.toString('hex')
    }
  }

  /* returns bytearray of the Transaction object to be signed and send to blockchain */
  public toBytes():Buffer {
    var tx = this.transaction;
    var buf = new bytebuffer(undefined, true);

    buf.writeByte(tx.type);
    buf.writeInt(tx.timestamp);
    buf.append(tx.senderPublicKey, 'hex');

    if (tx.requesterPublicKey)
      buf.append(tx.requesterPublicKey, 'hex');

    if (typeof tx.recipientId !== 'undefined') {
      buf.append(Key.decodeAddress(tx.recipientId));
    } else {
      buf.append(new Buffer(21));
    }

    var padVendor = new Buffer(64);

    if (tx.vendorField) {
      padVendor = padBytes(tx.vendorField, padVendor);
    }

    buf.append(padVendor);

    buf.writeLong(tx.amount);
    buf.writeLong(tx.fee);

    if (tx.asset && Object.keys(tx.asset).length > 0) {
      var asset = tx.asset[Object.keys(tx.asset)[0]];
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

    var txBytes = Crypto.hash256(buf.toBuffer());

    return txBytes;
  }

  static fromBytes(hash: string) {
    var buf = new bytebuffer.fromHex(hash, true, false);
    var type = buf.readByte();
    var timestamp = buf.readInt();
    var senderPublicKey = buf.readBytes(33).toBuffer();

    var recipientBegin = buf.readBytes(21);

    if (type == 0 || type == 3) {
      recipientBegin = buf.readBytes(13).prepend(recipientBegin);
    }

    recipientBegin = recipientBegin.toBuffer();

    var vendorField = buf.readBytes(64).toBuffer();
    var amount = buf.readLong().low;
    var fee = buf.readLong().low;

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

  /* Verify an ECDSA signature from transaction */
  public verify():boolean {
    var txBytes = Crypto.hash256(this.toBytes());
    var signBytes = new Buffer(this.transaction.signature, 'hex');
    var pubBytes = new Buffer(this.transaction.senderPublicKey, 'hex');

    return Key.verify(txBytes, signBytes, pubBytes);
  }

  /* Verify an ECDSA second signature from transaction */
  public secondVerify():boolean {
    var txBytes = Crypto.hash256(this.toBytes());
    var signBytes = new Buffer(this.transaction.signSignature, 'hex');
    var pubBytes = new Buffer(this.transaction.secondSenderPublicKey, 'hex');

    return Key.verify(txBytes, signBytes, pubBytes);
  }

  /* returns calculated ID of transaction - hashed 256 */
  public getId() {
    return this.toBytes();
  }
}