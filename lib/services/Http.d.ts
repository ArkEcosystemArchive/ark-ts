/**
 * @module services
 */
/** Http calls from peer url. */
import { Observable } from 'rxjs/Observable';
import { RxHttpRequestResponse } from '@akanass/rx-http-request';
import 'rxjs/add/operator/map';
import * as model from '../model';
export default class Http {
    network: model.Network;
    private baseRequest;
    constructor(network: model.Network);
    getNative<T>(url: string, params?: any, responseType?: new () => T): Observable<T>;
    get<T>(url: string, params?: any, responseType?: new () => T): Observable<T>;
    post<T>(url: string, body: any, responseType?: new () => T): Observable<T>;
    put(url: string, data: any): Observable<RxHttpRequestResponse>;
}
