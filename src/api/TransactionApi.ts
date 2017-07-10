/**
 * @module api
 */
/** Transaction related API calls. */

import { Observable } from 'rxjs/Observable';
import { TypedJSON } from 'typedjson-npm';

import * as model from '../model/Transaction';

import Http from '../services/Http';
import BlockApi from './BlockApi';

import { PrivateKey, PublicKey } from '../core/Key';
import Tx from '../core/Tx';

export default class TransactionApi {

  constructor(private http: Http) {}

  /**
   * Transaction used to transfer amounts to specific address.
   */
  public createTransaction(params: model.TransactionSend): Observable<model.Transaction> {
    return Observable.create((observer: any) => {

      if (!PublicKey.validateAddress(params.recipientId, this.http.network)) {
        observer.error('Wrong recipientId');
      }

      BlockApi.networkFees(this.http.network).subscribe((blocks) => {
        const fees = blocks.fees;
        let data = <model.Transaction> {
          amount: params.amount,
          fee: fees.send,
          recipientId: params.recipientId,
          type: model.TransactionType.SendArk,
          vendorField: params.vendorField,
        };

        const tx = new Tx(data, this.http.network, params.passphrase, params.secondPassphrase);
        data = tx.generate();

        const typedTx = TypedJSON.parse(TypedJSON.stringify(data), model.Transaction);

        observer.next(typedTx);
        observer.complete();
      }, (e) => observer.error(e));
    });
  }

  /**
   * Transaction used to vote for a chosen Delegate.
   */
  public createVote(params: model.TransactionVote) {
    return Observable.create((observer: any) => {
      BlockApi.networkFees(this.http.network).subscribe((blocks) => {
        const fees = blocks.fees;
        const updown = model.VoteType[params.type] === 'Add' ? '+' : '-';

        let data = <model.Transaction> {
          asset: {
            votes: updown + params.delegatePublicKey,
          },
          fee: fees.vote,
          type: model.TransactionType.Vote,
          vendorField: 'Delegate vote transaction',
        };

        const tx = new Tx(data, this.http.network, params.passphrase, params.secondPassphrase);
        tx.setAddress();
        data = tx.generate();

        const typedTx = TypedJSON.parse(TypedJSON.stringify(data), model.Transaction);

        observer.next(typedTx);
        observer.complete();
      }, (e) => observer.error(e));
    });
  }

  /**
   * Transaction used to register as a Delegate.
   */
  public createDelegate(params: model.TransactionDelegate) {
    return Observable.create((observer: any) => {
      if (params.username.length > 20) {
        observer.error('Delegate name is too long, 20 characters maximum');
      }

      BlockApi.networkFees(this.http.network).subscribe((blocks) => {
        const fees = blocks.fees;
        let data = <model.Transaction> {
          asset: {
            username: params.username,
          },
          fee: fees.delegate,
          type: model.TransactionType.CreateDelegate,
          vendorField: 'Create delegate transaction',
        };

        const tx = new Tx(data, this.http.network, params.passphrase, params.secondPassphrase);
        data = tx.generate();

        const typedTx = TypedJSON.parse(TypedJSON.stringify(data), model.Transaction);

        observer.next(typedTx);
        observer.complete();
      }, (e) => observer.error(e));
    });
  }

  /**
   * Transaction used to create second passphrase.
   */
  public createSignature(passphrase: string, secondPassphrase: string) {
    return Observable.create((observer: any) => {
      BlockApi.networkFees(this.http.network).subscribe((blocks) => {
        const fees = blocks.fees;
        let data = <model.Transaction> {
          asset: {},
          fee: fees.secondsignature,
          type: model.TransactionType.SecondSignature,
          vendorField: 'Create second signature',
        };

        const tx = new Tx(data, this.http.network, passphrase, secondPassphrase);
        tx.setAssetSignature();
        data = tx.generate();

        const typedTx = TypedJSON.parse(TypedJSON.stringify(data), model.Transaction);

        observer.next(typedTx);
        observer.complete();
      }, (e) => observer(e));
    });
  }

  public post(params: model.TransactionPayload) {
    return this.http.post<model.TransactionResponse>('/peer/transactions', params);
  }

  /**
   * Transaction matched by id.
   */
  public get(params: model.TransactionQueryParams) {
    return this.http.get<model.TransactionResponse>('/transactions/get', params);
  }

  /**
   * Get unconfirmed transaction by id.
   */
  public getUnconfirmed(params: model.TransactionQueryParams) {
    return this.http.get<model.TransactionResponse>('/transactions/unconfirmed/get', params);
  }

  /**
   * Transactions list matched by provided parameters.
   */
  public list(params?: model.TransactionQueryParams) {
    return this.http.get<model.TransactionResponse>('/transactions', params);
  }

  /**
   * Transactions unconfirmed list matched by provided parameters.
   */
  public listUnconfirmed(params?: model.TransactionQueryParams) {
    return this.http.get<model.TransactionResponse>('/transactions/unconfirmed', params);
  }

}
