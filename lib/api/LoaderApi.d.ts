/**
 * @module api
 */
/** Loader related API calls. */
import { Observable } from 'rxjs/Observable';
import * as model from '../model/Loader';
import Http from '../services/Http';
export default class LoaderApi {
    private http;
    constructor(http: Http);
    /**
     * Get configuration info of peer
     */
    autoConfigure(fromPeerUrl?: string): Observable<model.LoaderAutoConfigure>;
    /**
     * Get status blockchain.
     */
    loadingStatus(): Observable<model.LoaderStatus>;
    /**
     * Get the synchronisation status of the client.
     */
    synchronisationStatus(fromPeerUrl?: string): Observable<model.LoaderStatusSync>;
}
