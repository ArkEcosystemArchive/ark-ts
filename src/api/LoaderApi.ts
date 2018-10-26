import { Observable } from 'rxjs/Observable';

import * as model from '../model/Loader';
import Http from '../services/Http';

/** Loader related API calls. */
export default class LoaderApi {

  constructor(private http: Http) {}

  /**
   * Get configuration info of peer
   */
  public autoConfigure(fromPeerUrl?: string) {
    if (fromPeerUrl) {
      return this.http.getNative<model.LoaderAutoConfigure>(
        `${fromPeerUrl}/api/loader/autoconfigure`, null, model.LoaderAutoConfigure);
    }

    return this.http.get<model.LoaderAutoConfigure>('/loader/autoconfigure', null, model.LoaderAutoConfigure);
  }
  /**
   * Get status blockchain.
   */
  public loadingStatus() {
    return this.http.get<model.LoaderStatus>('/loader/status', null, model.LoaderStatus);
  }

  /**
   * Get the synchronisation status of the client.
   */
  public synchronisationStatus(fromPeerUrl?: string) {
    if (fromPeerUrl) {
      return this.http.getNative<model.LoaderStatusSync>(
        `${fromPeerUrl}/api/loader/status/sync`, null, model.LoaderStatusSync);
    }

    return this.http.get<model.LoaderStatusSync>('/loader/status/sync', null, model.LoaderStatusSync);
  }
}
