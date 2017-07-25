/**
 * @module api
 */
/** Transaction related API calls. */
import { Observable } from 'rxjs/Observable';
import * as model from '../model/Transaction';
import Http from '../services/Http';
export default class TransactionApi {
    private http;
    constructor(http: Http);
    /**
     * Transaction used to transfer amounts to specific address.
     */
    createTransaction(params: model.TransactionSend): Observable<model.Transaction>;
    /**
     * Transaction used to vote for a chosen Delegate.
     */
    createVote(params: model.TransactionVote): any;
    /**
     * Transaction used to register as a Delegate.
     */
    createDelegate(params: model.TransactionDelegate): any;
    /**
     * Transaction used to create second passphrase.
     */
    createSignature(passphrase: string, secondPassphrase: string): any;
    /**
     * Post transaction to broadcast
     */
    post(transaction: model.Transaction): Observable<model.TransactionResponse>;
    /**
     * Transaction matched by id.
     */
    get(id: string): Observable<model.TransactionResponse>;
    /**
     * Get unconfirmed transaction by id.
     */
    getUnconfirmed(id: string): Observable<model.TransactionResponse>;
    /**
     * Transactions list matched by provided parameters.
     */
    list(params?: model.TransactionQueryParams): Observable<model.TransactionResponse>;
    /**
     * Transactions unconfirmed list matched by provided parameters.
     */
    listUnconfirmed(params?: model.TransactionQueryParams): Observable<model.TransactionResponse>;
}
