import * as model from '../model/Loader';
import { Http } from '../services/Http';

export class LoaderApi {

  constructor(private http: Http) {}

  loadingStatus() {
    return this.http.get('/loader/status', null, model.LoaderStatus);
  }

  synchronisationStatus() {
    return this.http.get('/loader/status/sync', null, model.LoaderStatusSync);
  }

}