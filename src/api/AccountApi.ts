import { Observable } from 'rxjs/Observable';

import * as model from '../model/Account';
import Http from '../services/Http';

/** Account related API calls. */
export default class AccountApi {

  constructor(private http: Http) {}

  /**
   * Returns account information of an address.
   */
  public get(params: model.AccountQueryParams) {
    return this.http.get<model.AccountResponse>('/accounts', params, model.AccountResponse);
  }

  /**
   * Get the balance of an account.
   */
  public balance(params: model.AccountQueryParams) {
    return this.http.get<model.AccountBalanceResponse>('/accounts/getBalance', params, model.AccountBalanceResponse);
  }

  /**
   * Get the public key of an account. If the account does not exist the API call will return an error.
   */
  public publicKey(params: model.AccountQueryParams) {
    return this.http.get<model.AccountResponse>('/accounts/getPublicKey', params, model.AccountResponse);
  }

  /**
   * Get votes by account address.
   */
  public votes(params: model.AccountQueryParams) {
    return this.http.get<model.AccountVotesResponse>('/accounts/delegates', params, model.AccountVotesResponse);
  }

}
