/**
 * @module api
 */
/** Peer related API calls. */
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import * as model from '../model';
import Http from '../services/Http';
export default class PeerApi {
    private http;
    constructor(http: Http);
    /**
     * Get peer by ip and port.
     */
    get(ip: string, port: number): Observable<model.PeerResponse>;
    /**
     * Get peers list by parameters.
     */
    list(params?: model.PeerQueryParams): Observable<model.PeerResponse>;
    /**
     * Find good peer ordered by synchronized blocks.
     */
    findGoodPeer(): Observable<model.Peer>;
}
