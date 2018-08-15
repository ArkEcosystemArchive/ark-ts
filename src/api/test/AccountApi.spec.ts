import AccountApi from '../AccountApi';

import Http from '../../services/Http';

import { Network, NetworkType } from '../../model/Network';

import { expect } from 'chai';

/* tslint:disable:no-unused-expression */

describe('AccountApi', () => {
  const network = Network.getDefault(NetworkType.Devnet);
  const http = new Http(network);
  const api = new AccountApi(http);
  const address = 'DPHk9YyDekLZ5NN6Pz42RbP2KEZrkBmkmy';

  it('should be instance of AccountApi', () => {
    expect(api).to.be.instanceOf(AccountApi);
  });

  it('should have properties', () => {
    expect(api).to.have.property('get');
    expect(api).to.have.property('balance');
    expect(api).to.have.property('publicKey');
    expect(api).to.have.property('votes');
  });

  it('should return success from get', () => {
    return api.get({address}).forEach((response) => {
      expect(response).to.have.property('success', true);
    });
  });

  it('should return success from balance', () => {
    return api.balance({address}).forEach((response) => {
      expect(response).to.have.property('success', true);
    });
  });

  it('should return success from publicKey', () => {
    return api.publicKey({address}).forEach((response) => {
      expect(response).to.have.property('success', true);
    });
  });

  it('should return success from votes', () => {
    return api.votes({address}).forEach((response) => {
      expect(response).to.have.property('success', true);
    });
  });

});
