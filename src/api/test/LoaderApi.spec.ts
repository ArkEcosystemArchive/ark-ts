import LoaderApi from '../LoaderApi';

import Http from '../../services/Http';

import { Network, NetworkType } from '../../model/Network';

import { expect } from 'chai';

/* tslint:disable:no-unused-expression */

describe('LoaderApi', () => {
  const network = Network.getDefault(NetworkType.Devnet);
  const http = new Http(network);
  const api = new LoaderApi(http);
  const address = 'DPHk9YyDekLZ5NN6Pz42RbP2KEZrkBmkmy';
  const peerUrl = `http://${network.activePeer.ip}:${network.activePeer.port}`

  it('should be instance of LoaderApi', () => {
    expect(api).to.be.instanceOf(LoaderApi);
  });

  it('should have properties', () => {
    expect(api).to.have.property('loadingStatus');
    expect(api).to.have.property('synchronisationStatus');
    expect(api).to.have.property('autoConfigure');
  });

  it ('should return success from autoConfigure (manual http)', () => {
    const newHttp = new Http();
    return new LoaderApi(newHttp).autoConfigure(peerUrl).forEach((response) => {
      expect(response).to.have.property('success', true);
    });
  });

  it('should return success from autoConfigure', () => {
    return api.autoConfigure().forEach((response) => {
      expect(response).to.have.property('success', true);
    });
  });

  it('should return success from autoConfigure (manual peer url)', () => {
    return api.autoConfigure(peerUrl).forEach((response) => {
      expect(response).to.have.property('success', true);
    });
  });

  it('should return sucess from loadingStatus', () => {
    return api.loadingStatus().forEach((response) => {
      expect(response).to.have.property('success', true);
    });
  });

  it('should return sucess from synchronisationStatus', () => {
    return api.synchronisationStatus().forEach((response) => {
      expect(response).to.have.property('success', true);
    });
  });

  it('should return sucess from synchronisationStatus (manual peer url)', () => {
    return api.synchronisationStatus(peerUrl).forEach((response) => {
      expect(response).to.have.property('success', true);
    });
  });

});
