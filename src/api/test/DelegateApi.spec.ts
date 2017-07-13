import DelegateApi from '../DelegateApi';

import Http from '../../services/Http';

import { Network, NetworkType } from '../../model/Network';

import { expect } from 'chai';

/* tslint:disable:no-unused-expression */

describe('DelegateApi', () => {
  const network = Network.getDefault(NetworkType.Devnet);
  const http = new Http(network);
  const api = new DelegateApi(http);
  const address = 'DLteVA8j6B5DLpFp2Z3XSw1ENGXMjtFQsf';

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
      publicKey: '021e6d971e5885a3147ddf1e45bf5c8d0887ad9fc659e24bdf95c2c9607e7e3fe8'
    }).forEach((response) => {
      expect(response).to.have.property('success', true);
    });
  });

  it('should return instance of ForgedDetails from forgedData', () => {
    return api.forgedData({
      publicKey: '021e6d971e5885a3147ddf1e45bf5c8d0887ad9fc659e24bdf95c2c9607e7e3fe8'
    }).forEach((response) => {
      expect(response).to.be.property('success', true);
    });
  });

});
