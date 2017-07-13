/**
 * @module api
 */
/** Loader related API calls. */

import * as model from '../model/Loader';
import Http from '../services/Http';

export default class LoaderApi {

  constructor(private http: Http) {}

  /**
   * Get status blockchain.
   */
  public loadingStatus() {
    return this.http.get<model.LoaderStatus>('/loader/status', null);
  }

  /**
   * Get the synchronisation status of the client.
   */
  public synchronisationStatus(fromPeerUrl?: string) {
    if (fromPeerUrl) {
      return this.http.getNative<model.LoaderStatusSync>(`${fromPeerUrl}/api/loader/status/sync`, null);
    }

    return this.http.get<model.LoaderStatusSync>('/loader/status/sync', null);
  }

}
