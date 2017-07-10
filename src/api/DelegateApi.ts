/**
 * @module api
 */
/** Delegate related API calls. */

import * as model from '../model/Delegate';
import Http from '../services/Http';

export default class DelegateApi {

  constructor(private http: Http) {}

  /**
   * Get delegate by username.
   */
  public get(params: model.DelegateQueryParams) {
    return this.http.get<model.DelegateResponse>('/delegates/get', params);
  }

  /**
   * Get delegates list.
   */
  public list(params?: model.DelegateQueryParams) {
    return this.http.get<model.DelegateResponse>('/delegates', params);
  }

  /**
   * Get voters of delegate.
   */
  public voters(params: model.DelegateQueryParams) {
    /* To find voters directly by model */
    if (params.delegate && params.delegate instanceof model.Delegate) {
      params = {publicKey: params.delegate.publicKey};
    }

    return this.http.get<model.DelegateVoters>('/delegates/voters', params);
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

    return this.http.get('/delegates/forging/getForgedByAccount', params, model.ForgedDetails);
  }

}
