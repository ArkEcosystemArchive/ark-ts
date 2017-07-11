/**
 * @module model
 */
/** Network model. */

import config from '../../config';
import * as model from './models';

export enum NetworkType {
  Mainnet,
  Devnet,
}

export class Network {
  type: NetworkType;
  name: string;
  nethash: string;
  token: string;
  symbol: string;
  version: number;
  explorer: string;
  wif?: number;
  activePeer: model.Peer;

  constructor() {
    // pass
  }

  /**
   * Get network from default config file based on type.
   */
  public getDefault(type: NetworkType = NetworkType.Mainnet): Network {
    const item = NetworkType[type].toLowerCase();
    const networks = config.networks;

    const name = networks[item];
    const {peers, ...defaultNetwork} = name; // to remove peers list

    const network = new Network();
    Object.assign(network, defaultNetwork);

    network.type = type;

    return network;
  }

  /**
   * Set peer to current network.
   */
  public setPeer(peer: model.Peer) {
    this.activePeer = peer;
  }

  /**
   * Get formated peer url.
   */
  public getPeerUrl(): string {
    return `http://${this.activePeer.ip}:${this.activePeer.port}`;
  }

}
