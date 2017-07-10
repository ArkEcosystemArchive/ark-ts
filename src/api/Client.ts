/**
 * @module api
 * @preferred
 *
 * Comunicate between peer and api
 */ /** */

import * as model from '../model/models';
import Http from '../services/Http';

import AccountApi from './AccountApi';
import BlockApi from './BlockApi';
import DelegateApi from './DelegateApi';
import LoaderApi from './LoaderApi';
import PeerApi from './PeerApi';
import TransactionApi from './TransactionApi';

export default class Client {

  public account: AccountApi;
  public delegate: DelegateApi;
  public peer: PeerApi;
  public loader: LoaderApi;
  public block: BlockApi;
  public transaction: TransactionApi;

  constructor(network: model.Network) {
    const request = new Http(network);

    this.account = new AccountApi(request);
    this.delegate = new DelegateApi(request);
    this.peer = new PeerApi(request);
    this.loader = new LoaderApi(request);
    this.block = new BlockApi(request);
    this.transaction = new TransactionApi(request);
  }

}
