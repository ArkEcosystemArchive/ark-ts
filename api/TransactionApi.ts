import { Observable } from 'rxjs/Observable';
import { TypedJSON } from 'typedjson-npm';
import * as ByteBuffer from 'bytebuffer';

import * as model from '../model/Transaction';

import { Http } from '../services/Http';
import { BlockApi } from './BlockApi';

import { Slot } from '../utils/Slot';

import { Key } from '../core/Key';
import { Crypto } from '../utils/Crypto';

export class TransactionApi {

  constructor(private http: Http) {}

  /* Transaction used to transfer amounts to specific address */
  createTransaction(params: model.TransactionSend):Observable<model.Transaction> {
    return Observable.create((observer:any) => {

      if (!Key.validateAddress(params.recipientId, this.http.network)) {
        observer.error('Wrong recipientId')
      }

      BlockApi.networkFees(this.http.network).subscribe(blocks => {
        var fees = blocks.fees;
        var tx = <model.Transaction>{
          type: model.TransactionType.SendArk,
          recipientId: params.recipientId,
          amount: params.amount,
          fee: fees.send,
          timestamp: Slot.getTime(),
          vendorField: params.vendorField
        };

        this.sign(tx, params.passphrase);

        if (params.secondPassphrase) {
          this.secondSign(tx, params.secondPassphrase);
        }

        this.setId(tx);

        var typedTx = TypedJSON.parse(TypedJSON.stringify(tx), model.Transaction);

        observer.next(typedTx);
        observer.complete();
      }, (e) => observer.error(e));
    })
  }

  /* Transaction used to vote for a chosen Delegate */
  createVote(params: model.TransactionVote) {
    return Observable.create((observer:any) => {
      BlockApi.networkFees(this.http.network).subscribe(blocks => {
        var fees = blocks.fees;
        var tx = <model.Transaction>{
          type: model.TransactionType.Vote,
          fee: fees.vote,
          amount: 0,
          timestamp: Slot.getTime(),
          vendorField: "Delegate vote transaction",
          asset: {
            votes: params.type+params.delegatePublicKey
          }
        };

        var keys = Key.getKeys(params.passphrase, this.http.network);
        var address = Key.getAddress(keys.publicKey);
        tx.recipientId = address;

        this.sign(tx, params.passphrase);

        if (params.secondPassphrase) {
          this.secondSign(tx, params.secondPassphrase);
        }

        this.setId(tx);

        var typedTx = TypedJSON.parse(TypedJSON.stringify(tx), model.Transaction);

        observer.next(typedTx);
        observer.complete();
      }, (e) => observer.error(e));
    });
  }

  /* Transaction used to register as a Delegate */
  createDelegate(params: model.TransactionDelegate) {
    return Observable.create((observer:any) => {
      BlockApi.networkFees(this.http.network).subscribe(blocks => {
        var fees = blocks.fees;
        var tx = <model.Transaction>{
          type: model.TransactionType.CreateDelegate,
          fee: fees.delegate,
          amount: 0,
          recipientId: null,
          timestamp: Slot.getTime(),
          vendorField: "Create delegate transaction",
          asset: {
            username: params.username
          }
        }

        this.sign(tx, params.passphrase);

        if (params.secondPassphrase) {
          this.secondSign(tx, params.secondPassphrase);
        }

        this.setId(tx);

        var typedTx = TypedJSON.parse(TypedJSON.stringify(tx), model.Transaction);

        observer.next(typedTx);
        observer.complete();
      }, (e) => observer.error(e));
    });
  }

  /* Transaction used to create second passphrase */
  createSignature(passphrase:string, secondPassphrase:string) {
    return Observable.create((observer:any) => {
      BlockApi.networkFees(this.http.network).subscribe(blocks => {
        var fees = blocks.fees;
        var keys = Key.getKeys(secondPassphrase, this.http.network);

        var tx = <model.Transaction>{
          type: model.TransactionType.SecondSignature,
          fee: fees.secondsignature,
          amount: 0,
          recipientId: null,
          timestamp: Slot.getTime(),
          vendorField: "Create second signature",
          asset: {
            signature: keys.publicKey.publicKey.toString('hex')
          }
        }

        this.sign(tx, passphrase);

        this.setId(tx);

        var typedTx = TypedJSON.parse(TypedJSON.stringify(tx), model.Transaction);

        observer.next(typedTx);
        observer.complete();
      }, (e) => observer(e));
    });
  }

  post(params: model.TransactionPayload) {
    return this.http.post('/peer/transactions', params, model.TransactionResponse);
  }

  get(params: model.TransactionQueryParams) {
    return this.http.get('/transactions/get', params, model.TransactionResponse);
  }

  getUnconfirmed(params: model.TransactionQueryParams) {
    return this.http.get('/transactions/unconfirmed/get', params, model.TransactionResponse);
  }

  list(params?: model.TransactionQueryParams) {
    return this.http.get('/transactions', params, model.TransactionResponse);
  }

  listUnconfirmed(params?: model.TransactionQueryParams) {
    return this.http.get('/transactions/unconfirmed', params, model.TransactionResponse);
  }

  /* Verify function verifies if tx is validly signed */
  verify(transaction: model.Transaction) {
    var txBytes = Crypto.hash256(this.toBytes(transaction, true, true));
    var signBytes = new Buffer(transaction.signature, 'hex');
    var pubBytes = new Buffer(transaction.senderPublicKey, 'hex');

    return Key.verify(signBytes, txBytes, pubBytes);
  }

  /* Verify function verifies if tx is validly signed by secondPublicKey */
  secondVerify(transaction: model.Transaction) {
    var txBytes = Crypto.hash256(this.toBytes(transaction, true, true));
    var signBytes = new Buffer(transaction.signSignature, 'hex');
    var pubBytes = new Buffer(transaction.secondSenderPublicKey, 'hex');

    return Key.verify(signBytes, txBytes, pubBytes);
  }

  /* returns bytearray of the Transaction object to be signed and send to blockchain */
  private toBytes(transaction: model.Transaction, skipSignature: boolean, skipSecondSignature: boolean):Buffer {
    var txBuf = new ByteBuffer(undefined, true);

    txBuf.writeByte(transaction.type);
    txBuf.writeInt(transaction.timestamp);
    txBuf.append(transaction.senderPublicKey, 'hex');

    if (transaction.requesterPublicKey)
      txBuf.append(transaction.requesterPublicKey, 'hex');

    if (transaction.recipientId) {
      var recipient = Key.decodeAddress(transaction.recipientId);
      txBuf.append(recipient, 'hex');
    } else {
      txBuf.append(new Buffer(21));
    }

    if (transaction.vendorField) {
      var vendorBytes = new Buffer(transaction.vendorField);
      var buf = new Buffer(64);

      if (vendorBytes.length < 65) {
        buf.fill(0);
        vendorBytes.copy(buf, 64 - vendorBytes.length);
      }
    } else {
      txBuf.append(buf);
    }

    txBuf.writeLong(transaction.amount);
    txBuf.writeLong(transaction.fee);

    switch(transaction.type) {
      case model.TransactionType.SecondSignature:
        txBuf.append(transaction.asset["signature"], 'hex');
        break;
      case model.TransactionType.CreateDelegate:
        var usernameBytes = new Buffer(transaction.asset["username"], 'utf-8');
        txBuf.append(usernameBytes);
        break;
      case model.TransactionType.Vote:
        var voteBytes = new Buffer(transaction.asset["votes"], 'utf-8');
        txBuf.append(voteBytes);
        break;
    }

    if (!skipSignature && typeof transaction.signature !== 'undefined')
      txBuf.append(transaction.signature, 'hex');

    if (!skipSecondSignature && typeof transaction.signSignature !== 'undefined')
      txBuf.append(transaction.signSignature, 'hex');

    txBuf.flip();

    return txBuf.toBuffer();
  }

  /* sign the transaction */
  private sign(transaction: model.Transaction, passphrase: string) {
    var keys = Key.getKeys(passphrase, this.http.network);
    transaction.senderPublicKey = keys.publicKey.publicKey.toString('hex');

    var txBytes = Crypto.hash256(this.toBytes(transaction, true, true));

    var sig = Key.sign(txBytes, keys);
    transaction.signature = sig.toString('hex');

    return transaction;
  }

  /* sign the transaction with second passphrase */
  private secondSign(transaction: model.Transaction, passphrase: string) {
    var keys = Key.getKeys(passphrase, this.http.network);
    transaction.secondSenderPublicKey = keys.publicKey.publicKey.toString('hex');

    var txBytes = Crypto.hash256(this.toBytes(transaction, true, true));

    var sig = Key.sign(txBytes, keys);
    transaction.signSignature = sig.toString('hex');

    return transaction;
  }

  /* returns calculated ID of transaction - hashed 256 */
  private setId(transaction: model.Transaction) {
    var hash = Crypto.hash256(this.toBytes(transaction, false, false));
    transaction.id = hash.toString('hex');

    return transaction;
  }

}
