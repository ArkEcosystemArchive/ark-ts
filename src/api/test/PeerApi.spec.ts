import PeerApi from '../PeerApi';

import Http from '../../services/Http';

import { Network, NetworkType } from '../../model/Network';
import { Peer } from '../../model/Peer';

import { expect } from 'chai';

/* tslint:disable:no-unused-expression */

describe('PeerApi', () => {
  const network = Network.getDefault(NetworkType.Devnet);
  const http = new Http(network);
  const api = new PeerApi(http);
  const address = 'DLteVA8j6B5DLpFp2Z3XSw1ENGXMjtFQsf';

  it('should be instance of PeerApi', () => {
    expect(api).to.be.instanceOf(PeerApi);
  });

  it('should have properties', () => {
    expect(api).to.have.property('get');
    expect(api).to.have.property('list');
    expect(api).to.have.property('findGoodPeer');
  });

  it('should return sucess from get', () => {
    return api.get('66.228.46.44', 4002).forEach((response) => {
      expect(response).to.have.property('success', true);
    });
  });

  it('should return sucess from list', () => {
    return api.list().forEach((response) => {
      expect(response).to.have.property('success', true);
    });
  });

  it('should return instance of Peer from findGoodPeer', (done) => {
    return api.findGoodPeer().subscribe((peer) => {
      expect(peer).to.be.instanceOf(Peer);
      done();
    });
  });

  it('should return instance of Peer from static findGoodPeer', (done) => {
    return PeerApi.findGoodPeer(network).subscribe((peer) => {
      expect(peer).to.be.instanceOf(Peer);
      done();
    });
  });

  it('should return sucess from version', () => {
    return api.version().forEach((response) => {
      expect(response).to.have.property('success', true);
    });
  });

});
