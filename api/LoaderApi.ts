import * as model from '../model/Loader';
import { Http } from '../services/Http';

export class LoaderApi {

  constructor(private http: Http) {}

  loadingStatus() {
    return this.http.get('/loader/status', null, model.LoaderStatus);
  }

  synchronisationStatus(fromPeerUrl?: string) {
    if (fromPeerUrl) {
      return this.http.getNative(`${fromPeerUrl}/loader/status/sync`, null, model.LoaderStatusSync);
    }

    return this.http.get('/loader/status/sync', null, model.LoaderStatusSync);
  }

}