import { Observable } from 'rxjs/Observable';
import { TypedJSON } from 'typedjson-npm';

import * as model from '../model/Transaction';

import { Http } from '../services/Http';
import { BlockApi } from './BlockApi';

import { Tx } from '../core/Tx';
import { Key } from '../core/Key';

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
        var data = <model.Transaction>{
          type: model.TransactionType.SendArk,
          recipientId: params.recipientId,
          amount: params.amount,
          fee: fees.send,
          vendorField: params.vendorField
        };

        var tx = new Tx(data, this.http.network, params.passphrase, params.secondPassphrase);
        data = tx.finalize();

        var typedTx = TypedJSON.parse(TypedJSON.stringify(data), model.Transaction);

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
        var updown = model.VoteType[params.type] == 'Add' ? '+' : '-';

        var data = <model.Transaction>{
          type: model.TransactionType.Vote,
          fee: fees.vote,
          vendorField: "Delegate vote transaction",
          asset: {
            votes: updown+params.delegatePublicKey
          }
        };

        var tx = new Tx(data, this.http.network, params.passphrase, params.secondPassphrase);
        tx.setAddress();
        data = tx.finalize();

        var typedTx = TypedJSON.parse(TypedJSON.stringify(data), model.Transaction);

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
        var data = <model.Transaction>{
          type: model.TransactionType.CreateDelegate,
          fee: fees.delegate,
          vendorField: "Create delegate transaction",
          asset: {
            username: params.username
          }
        }

        var tx = new Tx(data, this.http.network, params.passphrase, params.secondPassphrase);
        data = tx.finalize();

        var typedTx = TypedJSON.parse(TypedJSON.stringify(data), model.Transaction);

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
        var data = <model.Transaction>{
          type: model.TransactionType.SecondSignature,
          fee: fees.secondsignature,
          vendorField: "Create second signature",
          asset: {}
        }

        var tx = new Tx(data, this.http.network, passphrase, secondPassphrase);
        tx.setAssetSignature();
        data = tx.finalize();

        var typedTx = TypedJSON.parse(TypedJSON.stringify(data), model.Transaction);

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

}
