/**
 * @module api
 */
/** Blocks related API calls. */

import * as model from '../model/Block';
import { Network } from '../model/Network';
import Http from '../services/Http';

export default class BlockApi {

  constructor(private http: Http) {}

  /**
   * Get network fees.
   */
  public static networkFees(network: Network) {
    return new Http(network).get<model.BlockFees>('/blocks/getfees', null);
  }

  /**
   * Get block by id.
   */
  public get(params: model.BlockQueryParams) {
    return this.http.get<model.BlockResponse>('/blocks/get', params);
  }

  /**
   *  Get all blocks.
   */
  public list(params?: model.BlockQueryParams) {
    return this.http.get<model.BlockResponse>('/blocks', params);
  }

  /**
   * Get transaction fee for sending "normal" transactions.
   */
  public blockchainFee() {
    return this.http.get<model.BlockFee>('/blocks/getFee', null);
  }

  /**
   * Get blockchain height.
   */
  public blockchainHeight() {
    return this.http.get<model.BlockHeight>('/blocks/getHeight', null);
  }

}
