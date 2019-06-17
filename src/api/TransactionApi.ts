import { Observable } from 'rxjs/Observable';

import {deserialize, serialize} from 'json-typescript-mapper';

import * as model from '../model/Transaction';

import Http from '../services/Http';
import BlockApi from './BlockApi';
import { Peer } from '../model/Peer';

import { PrivateKey, PublicKey } from '../core/Key';
import Tx from '../core/Tx';

/** Transaction related API calls. */
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

      if (!params.fee) {
        return observer.error('Missing "send" transaction fee');
      }
      let data = <model.Transaction> {
        amount: params.amount,
        fee: params.fee,
        recipientId: params.recipientId,
        timestamp: params.timestamp,
        type: model.TransactionType.SendArk,
        vendorField: params.vendorField,
      };

      const tx = new Tx(data, this.http.network, params.passphrase, params.secondPassphrase);
      data = tx.generate();
      const typedTx = deserialize(model.Transaction, data);

      observer.next(typedTx);
      observer.complete();
    });
  }

  /**
   * Transaction used to vote for a chosen Delegate.
   */
  public createVote(params: model.TransactionVote) {
    return Observable.create((observer: any) => {
      if (!params.fee) {
        return observer.error('Missing "vote" transaction fee');
      }
      const updown = model.VoteType[params.type] === 'Add' ? '+' : '-';

      let data = <model.Transaction> {
        asset: {
          votes: [updown + params.delegatePublicKey],
        },
        fee: params.fee,
        type: model.TransactionType.Vote,
        vendorField: params.vendorField,
      };

      const tx = new Tx(data, this.http.network, params.passphrase, params.secondPassphrase);
      tx.setAddress();
      data = tx.generate();

      const typedTx = deserialize(model.Transaction, data);
      typedTx.asset = data.asset;

      observer.next(typedTx);
      observer.complete();
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

      if (!params.fee) {
        return observer.error('Missing "delegate" transaction fee');
      }
      let data = <model.Transaction> {
        asset: {
          delegate: {
            publicKey: params.publicKey,
            username: params.username,
          },
        },
        fee: params.fee,
        type: model.TransactionType.CreateDelegate,
        vendorField: params.vendorField,
      };

      const tx = new Tx(data, this.http.network, params.passphrase, params.secondPassphrase);
      data = tx.generate();

      const typedTx = deserialize(model.Transaction, data);
      typedTx.asset = data.asset;

      observer.next(typedTx);
      observer.complete();
    });
  }

  /**
   * Transaction used to create second passphrase.
   */
  public createSignature(passphrase: string | PrivateKey, secondPassphrase: string, vendorField?: string, fee?: number) {
    return Observable.create((observer: any) => {
      if (!fee) {
        return observer.error('Missing "secondsignature" transaction fee');
      }
      let data = <model.Transaction> {};
      data.asset = {};
      data.fee = fee;
      data.type = model.TransactionType.SecondSignature;
      data.vendorField = vendorField;

      const tx = new Tx(data, this.http.network, passphrase, secondPassphrase);
      tx.setAssetSignature();
      data = tx.generate();

      const typedTx = deserialize(model.Transaction, data);
      typedTx.asset = tx.transaction.asset;

      observer.next(typedTx);
      observer.complete();
    });
  }

  /**
   * Post transaction to broadcast
   */
  public post(transaction: model.Transaction, peer?: Peer) {
    const params = {transactions: [transaction]};
    const host = peer ? peer.ip : this.http.network.activePeer.ip;
    let endpoint = '/peer/transactions';

    let port = peer ? peer.port : this.http.network.activePeer.port;

    let options = {}
    if (this.http.network.isV2) {
      endpoint = '/api/transactions';
      options = {
        headers: {
          'api-version': 2
        },
      };
    } else {
      options = {
        headers: {
          nethash: this.http.network.nethash,
          port,
          version: this.http.network.p2pVersion || '',
        },
      };
    }

    const url = `http://${host}:${port}${endpoint}`;
    return this.http.postNative<model.TransactionPostResponse>(url, params, model.TransactionPostResponse, options);
  }

  /**
   * Transaction matched by id.
   */
  public get(id: string) {
    const params = {id};
    return this.http.get<model.TransactionResponse>('/transactions/get', params, model.TransactionResponse);
  }

  /**
   * Get unconfirmed transaction by id.
   */
  public getUnconfirmed(id: string) {
    const params = {id};
    return this.http.get<model.TransactionResponse>('/transactions/unconfirmed/get', params, model.TransactionResponse);
  }

  /**
   * Transactions list matched by provided parameters.
   */
  public list(params?: model.TransactionQueryParams) {
    return this.http.get<model.TransactionResponse>('/transactions', params, model.TransactionResponse);
  }

  /**
   * Transactions unconfirmed list matched by provided parameters.
   */
  public listUnconfirmed(params?: model.TransactionQueryParams) {
    return this.http.get<model.TransactionResponse>('/transactions/unconfirmed', params, model.TransactionResponse);
  }

}
