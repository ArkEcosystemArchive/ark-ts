import * as api from './api';
import { Network } from './model/Network';
import Http from './services/Http';

export default class Client {

  public account: api.AccountApi;
  public delegate: api.DelegateApi;
  public peer: api.PeerApi;
  public loader: api.LoaderApi;
  public block: api.BlockApi;
  public transaction: api.TransactionApi;

  constructor(network: Network) {
    const request = new Http(network);

    this.account = new api.AccountApi(request);
    this.delegate = new api.DelegateApi(request);
    this.peer = new api.PeerApi(request);
    this.loader = new api.LoaderApi(request);
    this.block = new api.BlockApi(request);
    this.transaction = new api.TransactionApi(request);
  }

}
