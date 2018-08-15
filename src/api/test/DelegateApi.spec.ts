import DelegateApi from '../DelegateApi';

import Http from '../../services/Http';

import { Network, NetworkType } from '../../model/Network';

import { expect } from 'chai';

/* tslint:disable:no-unused-expression */

describe('DelegateApi', () => {
  const network = Network.getDefault(NetworkType.Devnet);
  const http = new Http(network);
  const api = new DelegateApi(http);
  const address = 'DPHk9YyDekLZ5NN6Pz42RbP2KEZrkBmkmy';

  it('should be instance of DelegateApi', () => {
    expect(api).to.be.instanceOf(DelegateApi);
  });

  it('should have properties', () => {
    expect(api).to.have.property('get');
    expect(api).to.have.property('list');
    expect(api).to.have.property('voters');
    expect(api).to.have.property('forgedData');
  });

  it('should return sucess from get', () => {
    return api.get({username: 'genesis_14'}).forEach((response) => {
      expect(response).to.have.property('success', true);
    });
  });

  it('should return sucess from list', () => {
    return api.list().forEach((response) => {
      expect(response).to.have.property('success', true);
    });
  });

  it('should return sucess from voters', () => {
    return api.voters({
      publicKey: '03bd4f16e39aaba5cba6a87b7498b08ce540f279be367e68ae96fb05dfabe203ad'
    }).forEach((response) => {
      expect(response).to.have.property('success', true);
    });
  });

  it('should return instance of ForgedDetails from forgedData', () => {
    return api.forgedData({
      publicKey: '03bd4f16e39aaba5cba6a87b7498b08ce540f279be367e68ae96fb05dfabe203ad'
    }).forEach((response) => {
      expect(response).to.be.property('success', true);
    });
  });

  it('should return success from search', () => {
    return api.search({
      q: 'genesis'
    }).forEach((response) => {
      expect(response).to.be.property('success', true);
    });
  });
});
