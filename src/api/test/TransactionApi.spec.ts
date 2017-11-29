import TransactionApi from '../TransactionApi';
import PeerApi from '../PeerApi';

import Http from '../../services/Http';

import { Network, NetworkType } from '../../model/Network';
import { Transaction, VoteType } from '../../model/Transaction';

import { expect } from 'chai';
import { PrivateKey } from '../../index';

/* tslint:disable:no-unused-expression */
const network = Network.getDefault(NetworkType.Devnet);
const http = new Http(network);

let api: TransactionApi;

describe('TransactionApi', () => {
  const address = 'DLteVA8j6B5DLpFp2Z3XSw1ENGXMjtFQsf';

  before(async () => {
    const peerApi = new PeerApi(http);
    const goodPeer = await peerApi.findGoodPeer().take(1).toPromise();

    network.activePeer = goodPeer;
    api = new TransactionApi(new Http(network));
  });

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

  describe('signature check', () => {

    it('should correctly sign a tx with PrivateKey', () => {
      const key = PrivateKey.fromWIF('SCxryiz5hhkfJ4bZ7RGVzkdLqyvU7UfNFaT1ak9Gg9PSeqCAWy3h');

      return api.createTransaction({
        amount: 10,
        passphrase: key,
        recipientId: 'DRKaLgq8jKYQEdN2EJ7aGEh8hMDvMzd3CW',
        timestamp: 1,
      }).forEach((transaction) => {
        // tslint:disable
        expect(transaction.signature).to.be.deep.eq('3045022100a3bc590b6b80b69070799ffb7fb08ecaff209f834c72a0f28c815d46eb3123b6022029c22350c72d4e42c4f39654629cd3b8d5ac377afdb338457a57bead65e83055');
        expect(transaction.id).to.be.deep.eq('2b9debcedd717ccfe68e0786c7c3ee244ccec3181c85c709196315643350d61d');
        // tslint:enable
      });
    });

    it('should correctly sign a send tx', () => {
      return api.createTransaction({
        amount: 10,
        passphrase: 'mysecret',
        recipientId: 'DRKaLgq8jKYQEdN2EJ7aGEh8hMDvMzd3CW',
        timestamp: 1,
      }).forEach((transaction) => {
        // tslint:disable
        expect(transaction.signature).to.be.deep.eq('3045022100a3bc590b6b80b69070799ffb7fb08ecaff209f834c72a0f28c815d46eb3123b6022029c22350c72d4e42c4f39654629cd3b8d5ac377afdb338457a57bead65e83055');
        expect(transaction.id).to.be.deep.eq('2b9debcedd717ccfe68e0786c7c3ee244ccec3181c85c709196315643350d61d');
        // tslint:enable
      });
    });

    it('should correctly sign a tx with vendorField', () => {
      return api.createTransaction({
        amount: 10,
        passphrase: 'mysecret',
        recipientId: 'DRKaLgq8jKYQEdN2EJ7aGEh8hMDvMzd3CW',
        timestamp: 1,
        vendorField: 'hi from vekexasia',
      }).forEach((transaction) => {
        // tslint:disable
        expect(transaction.signature).to.be.deep.eq('3044022035a591c9b8eb42732f1a87f6c535265fdc8015afd5105f1cf31012daeb3fffd50220705ac531bafc15d74ee263223c6346937c5fe31407c100cd732e8fd7780c8072');
        expect(transaction.id).to.be.deep.eq('6bd6d69320efcf04d442b53034e07d3127905c353412d4a2c2215a115ca4795f');
        // tslint:enable
      });
    });

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

  it('should create an instance of transaction with given parameters', () => {
    return api.createTransaction({
      amount: 100000000,
      passphrase: 'my secret',
      recipientId: address,
      vendorField: 'Send transaction by ark-tsc',
    }).forEach((transaction) => {
      expect(transaction).to.be.instanceOf(Transaction);
      expect(transaction.amount).to.be.eq(100000000);
      expect(transaction.recipientId).to.be.eq(address);
      expect(transaction.vendorField).to.be.eq('Send transaction by ark-tsc');
      expect(transaction.type).to.be.eq(0);

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
      publicKey: '03dcd9356b9f4e13a70fed664753e86ddbaf3d362ea8b35b6a9f4325ceda52ca7e',
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
