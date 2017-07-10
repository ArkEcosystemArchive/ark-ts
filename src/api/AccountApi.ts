/**
 * @module api
 */
/** Account related API calls. */

import * as model from '../model/Account';
import Http from '../services/Http';

export default class AccountApi {

  constructor(private http: Http) {}

  /**
   * Returns account information of an address.
   */
  public get(params: model.AccountQueryParams) {
    return this.http.get<model.AccountResponse>('/accounts', params);
  }

  /**
   * Get the balance of an account.
   */
  public balance(params: model.AccountQueryParams) {
    return this.http.get<model.AccountResponse>('/accounts/getBalance', params);
  }

  /**
   * Get the public key of an account. If the account does not exist the API call will return an error.
   */
  public publicKey(params: model.AccountQueryParams) {
    return this.http.get<model.AccountResponse>('/accounts/getPublicKey', params);
  }

  /**
   * Get votes by account address.
   */
  public votes(params: model.AccountQueryParams) {
    return this.http.get<model.AccountVotesResponse>('/accounts/delegates', params);
  }

}
