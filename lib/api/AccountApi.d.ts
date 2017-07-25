/**
 * @module api
 */
/** Account related API calls. */
import { Observable } from 'rxjs/Observable';
import * as model from '../model/Account';
import Http from '../services/Http';
export default class AccountApi {
    private http;
    constructor(http: Http);
    /**
     * Returns account information of an address.
     */
    get(params: model.AccountQueryParams): Observable<model.AccountResponse>;
    /**
     * Get the balance of an account.
     */
    balance(params: model.AccountQueryParams): Observable<model.AccountResponse>;
    /**
     * Get the public key of an account. If the account does not exist the API call will return an error.
     */
    publicKey(params: model.AccountQueryParams): Observable<model.AccountResponse>;
    /**
     * Get votes by account address.
     */
    votes(params: model.AccountQueryParams): Observable<model.AccountVotesResponse>;
}
