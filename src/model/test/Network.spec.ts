import { Network, NetworkType } from '../Network';
import { Peer } from '../Peer';

import { expect } from 'chai';

/* tslint:disable:no-unused-expression */

describe('Network', () => {

  it ('should be a object', () => {
    expect(NetworkType).to.be.a('object');
  });

  it ('should have properties', () => {
    expect(NetworkType).have.property('Mainnet');
    expect(Network).have.property('getDefault');
  });

  it('should create a instance of mainnet network', () => {
    const network = Network.getDefault(NetworkType.Mainnet);
    expect(network.name).to.be.equal('mainnet');
  });

  it('should create a instance of devnet network', () => {
    const network = Network.getDefault(NetworkType.Devnet);
    expect(network.name).to.be.equal('devnet');
  });

  it('should create a manual instance of network', () => {
    const network = new Network;

    network.type = NetworkType.Mainnet;
    network.name = 'testnet';
    network.nethash = '6e84d08bd299ed97c212c886c98a57e36545c8f5d645ca7eeae63a8bd62d8988';

    expect(network).to.be.instanceOf(Network);
  });

  it('should set a active peer', () => {
    const network = new Network;
    const peer = new Peer;
    peer.ip = '5.39.9.251';
    peer.port = 4001;

    network.type = NetworkType.Mainnet;
    network.name = 'testnet';
    network.nethash = '6e84d08bd299ed97c212c886c98a57e36545c8f5d645ca7eeae63a8bd62d8988';

    network.setPeer(peer);
    expect(network.activePeer).to.be.instanceOf(Peer);
  });

  it('should return string url from active peer', () => {
    const network = new Network;
    const peer = new Peer;
    peer.ip = '5.39.9.251';
    peer.port = 4001;

    network.type = NetworkType.Mainnet;
    network.name = 'testnet';
    network.nethash = '6e84d08bd299ed97c212c886c98a57e36545c8f5d645ca7eeae63a8bd62d8988';

    network.setPeer(peer);
    expect(network.getPeerUrl()).to.be.a('string').and.not.empty;
  });

  it('should return array of two Networks', () => {
    expect(Network.getAll()).to.be.an('array').and.to.have.lengthOf(2);
  });

});
