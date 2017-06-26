import { RxHR, RxHttpRequest } from '@akanass/rx-http-request';
import 'rxjs/add/operator/map';

import { TypedJSON } from 'typedjson-npm';

import * as model from '../model/models';

/* Convert property from interface to JSON */
function formatParams(params: any) {
  if (!params) return;

  var options = JSON.parse(JSON.stringify(params));

  return { qs: options };
}

/* Convert JSON response to specific interface */
function formatResponse(response: any, responseType: any) {
  return TypedJSON.parse(response.body, responseType);
}

export class Http {

  private baseRequest: RxHttpRequest;

  constructor(network: model.Network) {
    this.baseRequest = RxHR.defaults({
      baseUrl: network.getPeerUrl() + '/api',
      json: true,
      headers: {
        'nethash': network.nethash,
        'version': network.version,
        'port': network.activePeer.port
      }
    });
  }

  get(url: string, params?: any, responseType?: any) {
    return this.baseRequest.get(url, formatParams(params))
                           .map(data => formatResponse(data, responseType));
  }

  post(url: string, data: any) {
    var options = {
      form: data,
      json: true
    };

    return this.baseRequest.post(url, options);
  }

  put(url: string, data: any) {
    var options = {
      json: data
    }

    return this.baseRequest.put(url, options);
  }

}
