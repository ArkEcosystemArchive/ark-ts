import config from '../config';
import { Peer } from './Peer';

export enum NetworkType {
  Mainnet,
  Devnet,
  Customnet,
  CustomDevnet
}

/** Network model. */
export class Network {
  public type: NetworkType;
  public name: string;
  public nethash: string;
  public token: string;
  public symbol: string;
  public version: number;
  public explorer: string;
  public wif?: number;
  public activePeer: Peer;

  constructor() {
    // pass
  }

  /**
   * Get list of all defaults networks.
   */
  public static getAll(): Network[] {
    const networks = config.networks;
    const list = [];

    Object.keys(networks).forEach((item) => {
      const name = networks[item];
      const {peers, ...defaultNetwork} = name; // to remove peers list

      const network = new Network();
      Object.assign(network, defaultNetwork);

      const type = NetworkType[item.charAt(0).toUpperCase() + item.substr(1).toLowerCase()];
      network.type = type;

      list.push(network);
    });

    return list;
  }

  /**
   * Get network from default config file based on type.
   */
  public static getDefault(type: NetworkType = NetworkType.Mainnet): Network {
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
  public setPeer(peer: Peer) {
    this.activePeer = peer;
  }

  /**
   * Get formated peer url.
   */
  public getPeerUrl(): string {
    return `http://${this.activePeer.ip}:${this.activePeer.port}`;
  }

}
