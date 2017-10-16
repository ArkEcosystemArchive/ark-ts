import { Observable } from 'rxjs/Observable';

import * as model from '../model/Block';
import { Network } from '../model/Network';
import Http from '../services/Http';

/** Blocks related API calls. */
export default class BlockApi {

  constructor(private http: Http) {}

  /**
   * Get network fees.
   */
  public static networkFees(network: Network) {
    return new Http(network).get<model.BlockFees>('/blocks/getfees', null, model.BlockFees);
  }

  /**
   * Get block by id.
   */
  public get(params: model.BlockQueryParams) {
    return this.http.get<model.BlockResponse>('/blocks/get', params, model.BlockResponse);
  }

  /**
   *  Get all blocks.
   */
  public list(params?: model.BlockQueryParams) {
    return this.http.get<model.BlockResponse>('/blocks', params, model.BlockResponse);
  }

  /**
   * Get transaction fee for sending "normal" transactions.
   */
  public blockchainFee() {
    return this.http.get<model.BlockFee>('/blocks/getFee', null, model.BlockFee);
  }

  /**
   * Get blockchain height.
   */
  public blockchainHeight() {
    return this.http.get<model.BlockHeight>('/blocks/getHeight', null, model.BlockHeight);
  }

  /**
   * Get blockchain status.
   */
  public blockchainStatus() {
    return this.http.get<model.BlockStatus>('/blocks/getStatus', null, model.BlockStatus);
  }

}
