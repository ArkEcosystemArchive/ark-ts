import TransactionApi from '../TransactionApi';

import Http from '../../services/Http';

import { Network, NetworkType } from '../../model/Network';
import { Transaction, VoteType } from '../../model/Transaction';

import { expect } from 'chai';

/* tslint:disable:no-unused-expression */

describe('TransactionApi', () => {
  const network = Network.getDefault(NetworkType.Devnet);
  const http = new Http(network);
  const api = new TransactionApi(http);
  const address = 'DLteVA8j6B5DLpFp2Z3XSw1ENGXMjtFQsf';

  it('should be instance of TransactionApi', () => {
    expect(api).to.be.instanceOf(TransactionApi);
  });

  it('should have properties', () => {
    expect(api).to.have.property('createTransaction');
    expect(api).to.have.property('createVote');
    expect(api).to.have.property('createDelegate');
    expect(api).to.have.property('createSignature');
    expect(api).to.have.property('post');
    expect(api).to.have.property('get');
    expect(api).to.have.property('getUnconfirmed');
    expect(api).to.have.property('list');
    expect(api).to.have.property('listUnconfirmed');
  });

  it('should create a instance of Transaction from createTransaction', () => {
    return api.createTransaction({
      amount: 100000000,
      passphrase: 'my secret',
      recipientId: address,
      vendorField: 'Send transaction by ark-tsc',
    }).forEach((transaction) => {
      expect(transaction).to.be.instanceOf(Transaction);
    });
  });

  it('should create a instance of Transaction from createVote', () => {
    return api.createVote({
      delegatePublicKey: '021e6d971e5885a3147ddf1e45bf5c8d0887ad9fc659e24bdf95c2c9607e7e3fe8',
      passphrase: 'my secret',
      type: VoteType.Add,
    }).forEach((transaction) => {
      expect(transaction).to.be.instanceOf(Transaction);
    });
  });

  it('should create a instance of Transaction from createDelegate', () => {
    return api.createDelegate({
      passphrase: 'my secret',
      username: 'lorenzo',
    }).forEach((transaction) => {
      expect(transaction).to.be.instanceOf(Transaction);
    });
  });

  it('should create a instance of Transaction from createSignature', () => {
    return api.createSignature('my secret', 'my second secret passphrase').forEach((transaction) => {
      expect(transaction).to.be.instanceOf(Transaction);
    });
  });

  it('should return success from get', () => {
    return api.get('e40ce11cab82736da1cc91191716f3c1f446ca7b6a9f4f93b7120ef105ba06e8').forEach((response) => {
      expect(response).to.have.property('success', true);
    });
  });

  it('should return false on success field from getUnconfirmed', () => {
    return api.getUnconfirmed(
      'e40ce11cab82736da1cc91191716f3c1f446ca7b6a9f4f93b7120ef105ba06e8',
    ).forEach((response) => {
      expect(response).to.have.property('success', false);
    });
  });

  it('should return success from list', () => {
    return api.list({orderBy: 'timestamp:desc', limit: 10}).forEach((response) => {
      expect(response).to.have.property('success', true);
    });
  });

  it('should return success from listUnconfirmed', () => {
    return api.listUnconfirmed().forEach((response) => {
      expect(response).to.have.property('success', true);
    });
  });

  it('should return false on success field from post send transaction', () => {
    //tslint:disable
    const transaction = {
      amount: 100000000,
      fee: 10000000,
      id: '5b9be5f9b1280d542e856e84758312780fe0061366592e579cbed8639511cac0',
      recipientId: 'DLteVA8j6B5DLpFp2Z3XSw1ENGXMjtFQsf',
      senderPublicKey: '026c75159ccf36ffc639fdfcba7c6e798f90b2767b54b8a99f2eeec534c92a32e9',
      signature: '304402203d971b4e50e27e7fec8fb6d42523b82a70a82af9b9488d8f4aa16cb7936162ea022077e072b21e78cf24b7a9b8b653042dcb218b226f1b18e9a7a8462bc49e48255b',
      timestamp: 9870360,
      type: 0,
      vendorField: 'Send transaction by ark-tsc'
    };

    return api.post(transaction).forEach((response) => {
      expect(response).to.have.property('success', false);
    });
  });

});
