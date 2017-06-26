import * as model from '../model/Account';
import { Http } from '../services/Http';

export class AccountApi {

  constructor(private http: Http) {}

  get(params: model.AccountQueryParams) {
    return this.http.get('/accounts', params, model.AccountResponse);
  }

}
