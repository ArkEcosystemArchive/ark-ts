import * as model from './models';
import config from '../config';

export enum NetworkType {
  Mainnet,
  Devnet,
}

export class Network {
  name: string;
  nethash: string;
  token: string;
  symbol: string;
  version: number;
  explorer: string;
  wif?: number;
  activePeer: model.Peer;

  constructor() {}

  public getDefault(type: NetworkType = NetworkType.Mainnet): Network {
    var item = NetworkType[type].toLowerCase();
    var networks = config.networks;

    var name = networks[item];

    var network = new Network();
    Object.assign(network, name);

    return network;
  }

  getPeerUrl(): string {
    return `http://${this.activePeer.ip}:${this.activePeer.port}`;
  }

}
