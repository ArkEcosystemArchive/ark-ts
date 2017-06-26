import * as model from '../model/Peer';
import { Http } from '../services/Http';

export class PeerApi {

  constructor(private http: Http) {}

  public get(params: model.PeerQueryParams) {
    return this.http.get('/peers/get', params, model.PeerResponse);
  }

  public list(params?: model.PeerQueryParams) {
    return this.http.get('/peers', params, model.PeerResponse);
  }

}
