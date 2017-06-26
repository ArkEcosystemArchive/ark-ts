import { Http } from '../services/Http';
import * as model from '../model/models';

import { AccountApi } from './AccountApi';
import { DelegateApi } from './DelegateApi';
import { PeerApi } from './PeerApi';
import { LoaderApi } from './LoaderApi';
import { BlockApi } from './BlockApi';

export class Api {

  public account: AccountApi;
  public delegate: DelegateApi;
  public peer: PeerApi;
  public loader: LoaderApi;
  public block: BlockApi;

  constructor(network: model.Network) {
    var request = new Http(network);

    this.account = new AccountApi(request);
    this.delegate = new DelegateApi(request);
    this.peer = new PeerApi(request);
    this.loader = new LoaderApi(request);
    this.block = new BlockApi(request);
  }

}
