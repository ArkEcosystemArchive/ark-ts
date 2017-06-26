import * as model from '../model/Delegate';
import { Http } from '../services/Http';

export class DelegateApi {

  constructor(private http: Http) {}

  get(params: model.DelegateQueryParams) {
    return this.http.get('/delegates/get', params, model.DelegateResponse);
  }

  list(params?: model.DelegateQueryParams) {
    return this.http.get('/delegates', params, model.DelegateResponse);
  }

  voters(params: model.DelegateQueryParams) {
    /* To find voters directly by model */
    if (params.delegate && params.delegate instanceof model.Delegate)
      params = {publicKey: params.delegate.publicKey}

    return this.http.get('/delegates/voters', params, model.DelegateVoters);
  }

  forgedData(params: model.DelegateQueryParams) {
    /* To find result directly by model */
    if (params.delegate)
      params.generatorPublicKey = params.delegate.publicKey

    if (params.publicKey && !params.generatorPublicKey)
      params.generatorPublicKey = params.publicKey

    return this.http.get('/delegates/forging/getForgedByAccount', params, model.ForgedDetails);
  }

}
