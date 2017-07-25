import * as api from './api';
import { Network } from './model/Network';
export default class Client {
    account: api.AccountApi;
    delegate: api.DelegateApi;
    peer: api.PeerApi;
    loader: api.LoaderApi;
    block: api.BlockApi;
    transaction: api.TransactionApi;
    constructor(network: Network);
}
