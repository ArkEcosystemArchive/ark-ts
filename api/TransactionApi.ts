import * as model from '../model/Transaction';

import { Http } from '../services/Http';
import { BlockApi } from './BlockApi';

import { Slot } from '../utils/Slot';

import { Key } from '../core/Key';
import { Crypto } from '../utils/Crypto';

import { TypedJSON } from 'typedjson-npm';

export class TransactionApi {

  constructor(private http: Http) {}

  send(params: model.TransactionSend) {
    BlockApi.networkFees(this.http.network).subscribe(blocks => {
      var fees = blocks.fees;
      var tx = <model.Transaction>{
        type: model.TransactionType.SendArk,
        recipientId: params.recipientId,
        amount: params.amount,
        fee: fees.send,
        vendorField: params.vendorField
      };

      tx.timestamp = Slot.getTime();

    });
  }

  post(params: model.TransactionPayload) {
    return this.http.post('/peer/transactions', params, model.TransactionResponse);
  }

  get(params: model.TransactionQueryParams) {
    return this.http.get('/transactions/get', params, model.TransactionResponse);
  }

  getUncofirmed(params: model.TransactionQueryParams) {
    return this.http.get('/transactions/unconfirmed/get', params, model.TransactionResponse);
  }

  list(params?: model.TransactionQueryParams) {
    return this.http.get('/transactions', params, model.TransactionResponse);
  }

  listUncofirmed(params?: model.TransactionQueryParams) {
    return this.http.get('/transactions/unconfirmed', params, model.TransactionResponse);
  }

  /* sign the transaction */
  private sign(transaction: model.Transaction, passphrase: string) {
    var keys = Key.getKeys(passphrase, this.http.network);
    transaction.senderPublicKey = keys.publicKey.publicKey.toString('hex');

    var txBytes = Crypto.hash256(new Buffer(TypedJSON.stringify(transaction)));

    var sig = Key.sign(txBytes, keys);

    return sig.toString('hex');
  }

  /* returns calculated ID of transaction - hashed 256 */
  private getId(transaction: model.Transaction) {
    var hash = Crypto.hash256(new Buffer(TypedJSON.stringify(transaction)));

    return hash.toString('hex');
  }

}
