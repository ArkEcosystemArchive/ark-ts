import * as model from '../model/Transaction';
import { Http } from '../services/Http';

export class TransactionApi {

  constructor(private http: Http) {}

  send(params: model.TransactionSend) {
    return this.http.get('/accounts', params, model.TransactionResponse);
  }

  vote() {}
}
