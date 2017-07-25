/**
 * @module api
 */
/** Blocks related API calls. */
import { Observable } from 'rxjs/Observable';
import * as model from '../model/Block';
import { Network } from '../model/Network';
import Http from '../services/Http';
export default class BlockApi {
    private http;
    constructor(http: Http);
    /**
     * Get network fees.
     */
    static networkFees(network: Network): Observable<model.BlockFees>;
    /**
     * Get block by id.
     */
    get(params: model.BlockQueryParams): Observable<model.BlockResponse>;
    /**
     *  Get all blocks.
     */
    list(params?: model.BlockQueryParams): Observable<model.BlockResponse>;
    /**
     * Get transaction fee for sending "normal" transactions.
     */
    blockchainFee(): Observable<model.BlockFee>;
    /**
     * Get blockchain height.
     */
    blockchainHeight(): Observable<model.BlockHeight>;
}
