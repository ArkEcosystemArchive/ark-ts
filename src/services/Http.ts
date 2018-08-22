import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { RxRequest } from './RxRequest';

import { deserialize, serialize } from 'json-typescript-mapper';

import * as model from '../model';

/** Http calls from peer url. */
export default class Http {

  private baseRequest;
  private timeout = 3000

  public constructor(public network?: model.Network) {
    const options = {
      json: true,
      timeout: this.timeout,
    };

    if (network) {
      options['baseUrl'] = network.getPeerUrl();
    }

    this.baseRequest = new RxRequest(options);
  }

  public getNative<T>(url: string, params: any = {}, responseType?: new() => T): Observable<T> {
    const r = new RxRequest({ json: true, timeout: this.timeout });

    return r.get(url, this.formatParams(params)).map((data) => this.formatResponse(data, responseType));
  }

  public get<T>(url: string, params: any = {}, responseType?: new() => T): Observable<T> {
    return this.baseRequest.get(`/api${url}`, this.formatParams(params))
                           .map((data) => this.formatResponse(data, responseType));
  }

  public post<T>(url: string, body: any, responseType?: new() => T): Observable<T> {
    const options = {
      body,
      json: true,
    };

    if (/^\/peer/.test(url)) {
      options['headers'] = {
        nethash: this.network.nethash,
        port: this.network.activePeer.port,
        version: this.network.version,
      };
    }

    return this.baseRequest.post(url, options)
                           .map((data) => this.formatResponse(data, responseType));
  }

  public postNative<T>(url: string, body: any, responseType?: new() => T): Observable<T> {
    const options = {
      body,
      json: true,
    }

    if (/:\d+\/peer/.test(url)) {
      options['headers'] = {
        nethash: this.network.nethash,
        port: this.network.activePeer.port,
        version: this.network.version,
      };
    }

    const r = new RxRequest(options);

    return r.post(url).map((data) => this.formatResponse(data, responseType));
  }

  public put(url: string, data: any) {
    const options = {
      json: data,
    };

    return this.baseRequest.put(url, options);
  }

  /**
   * Convert JSON response to specific interface.
   */
  private formatResponse(response: any, responseType: any) {
    try {
      let result: typeof responseType;
      const body = typeof response === 'string' ? JSON.parse(response) : response;

      result = deserialize(responseType, body);

      return result;
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   * Convert property from interface to JSON
   */
  private formatParams(params: any): any {
    const options = JSON.parse(JSON.stringify(params) || '{}');

    return { qs: options };
  }

}
