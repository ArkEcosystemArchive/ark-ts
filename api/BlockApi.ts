import * as model from '../model/Block';
import { Network } from '../model/Network';
import { Http } from '../services/Http';

export class BlockApi {

  constructor(private http: Http) {}

  get(params: model.BlockQueryParams) {
    return this.http.get('/blocks/get', params, model.BlockResponse);
  }

  list(params?: model.BlockQueryParams) {
    return this.http.get('/blocks', params, model.BlockResponse);
  }

  blockchainFee() {
    return this.http.get('/blocks', null, model.BlockFee);
  }

  blockchainHeight() {
    return this.http.get('/blocks', null, model.BlockHeight);
  }

  static networkFees(network: Network) {
    return new Http(network).get('/blocks/getfees', null, model.BlockFees);
  }

}