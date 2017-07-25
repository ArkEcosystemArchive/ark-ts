/**
 * @module services
 */
/** Http calls from peer url. */

import { Observable } from 'rxjs/Observable';

import { RxHR, RxHttpRequest, RxHttpRequestResponse } from '@akanass/rx-http-request';
import 'rxjs/add/operator/map';

import {deserialize, serialize} from 'json-typescript-mapper';

import * as model from '../model';

/**
 * Convert property from interface to JSON
 */
function formatParams(params: any): any {
  if (!params) {
    return;
  }

  const options = JSON.parse(JSON.stringify(params));

  return { qs: options };
}

/**
 * Convert JSON response to specific interface.
 */
function formatResponse(response: any, responseType: any) {
  try {
    let result: typeof responseType;
    const body = typeof response.body === 'string' ? JSON.parse(response.body) : response.body;

    result = deserialize(responseType, body);

    return result;
  } catch (e) {
    throw new Error(response.body);
  }
}

export default class Http {

  private baseRequest: RxHttpRequest;

  public constructor(public network: model.Network) {
    this.baseRequest = RxHR.defaults({
      baseUrl: network.getPeerUrl(),
      headers: {
        nethash: network.nethash,
        port: network.activePeer.port,
        version: network.version,
      },
      json: true,
    });
  }

  public getNative<T>(url: string, params: any = {}, responseType?: new() => T): Observable<T> {
    return RxHR.get(url, formatParams(params))
               .map((data) => formatResponse(data, responseType));
  }

  public get<T>(url: string, params: any = {}, responseType?: new() => T): Observable<T> {
    return this.baseRequest.get(`/api${url}`, formatParams(params))
                           .map((data) => formatResponse(data, responseType));
  }

  public post<T>(url: string, body: any, responseType?: new() => T): Observable<T> {
    const options = {
      body,
      json: true,
    };

    return this.baseRequest.post(url, options)
                           .map((data) => formatResponse(data, responseType));
  }

  public put(url: string, data: any) {
    const options = {
      json: data,
    };

    return this.baseRequest.put(url, options);
  }

}
