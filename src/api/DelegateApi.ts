import { Observable } from 'rxjs/Observable';

import * as model from '../model/Delegate';
import Http from '../services/Http';

/** Delegate related API calls. */
export default class DelegateApi {

  constructor(private http: Http) {}

  /**
   * Get delegate by username.
   */
  public get(params: model.DelegateQueryParams) {
    return this.http.get<model.DelegateResponse>('/delegates/get', params, model.DelegateResponse);
  }

  /**
   * Get delegates list.
   */
  public list(params?: model.DelegateQueryParams) {
    return this.http.get<model.DelegateResponse>('/delegates', params, model.DelegateResponse);
  }

  /**
   * Get voters of delegate.
   */
  public voters(params: model.DelegateQueryParams) {
    /* To find voters directly by model */
    if (params.delegate && params.delegate instanceof model.Delegate) {
      params = {publicKey: params.delegate.publicKey};
    }

    return this.http.get<model.DelegateVoters>('/delegates/voters', params, model.DelegateVoters);
  }

  /**
   * Get forged data of delegate.
   */
  public forgedData(params: model.DelegateQueryParams) {
    /* To find result directly by model */
    if (params.delegate) {
      params.generatorPublicKey = params.delegate.publicKey;
    }

    if (params.publicKey && !params.generatorPublicKey) {
      params.generatorPublicKey = params.publicKey;
    }

    return this.http.get<model.ForgedDetails>('/delegates/forging/getForgedByAccount', params, model.ForgedDetails);
  }

  /**
   * Search delegates
   */
  public search(params: model.DelegateQueryParams) {
    return this.http.get<model.DelegateResponse>('/delegates/search', params, model.DelegateResponse);
  }

}
