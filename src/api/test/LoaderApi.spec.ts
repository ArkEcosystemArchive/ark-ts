import LoaderApi from '../LoaderApi';

import Http from '../../services/Http';

import { Network, NetworkType } from '../../model/Network';

import { expect } from 'chai';

/* tslint:disable:no-unused-expression */

describe('LoaderApi', () => {
  const network = Network.getDefault(NetworkType.Devnet);
  const http = new Http(network);
  const api = new LoaderApi(http);
  const address = 'DLteVA8j6B5DLpFp2Z3XSw1ENGXMjtFQsf';

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

    return new LoaderApi(newHttp).autoConfigure('http://167.114.29.40:4002').forEach((response) => {
      expect(response).to.have.property('success', true);
    });
  });

  it('should return success from autoConfigure', () => {
    return api.autoConfigure().forEach((response) => {
      expect(response).to.have.property('success', true);
    });
  });

  it('should return success from autoConfigure (manual peer url)', () => {
    return api.autoConfigure('http://167.114.29.40:4002').forEach((response) => {
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
    return api.synchronisationStatus('http://167.114.29.40:4002').forEach((response) => {
      expect(response).to.have.property('success', true);
    });
  });

});
