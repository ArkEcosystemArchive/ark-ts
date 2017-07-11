import Crypto from '../Crypto';

import { expect } from 'chai';

/* tslint:disable:no-unused-expression */

describe('Crypto', () => {

  it('should return a 4-byte Buffer from int32', () => {
    const expectBuffer = new Buffer([0x00, 0x00, 0x00, 0x01]);
    expect(Crypto.int32toBuffer(1).equals(expectBuffer)).to.be.true;
  });

  describe('Private keys', () => {
    const privBytes = Crypto.randomSeed(32);
    const secondPrivBytes = Crypto.randomSeed(32);

    it('should be equal to 32-byte', () => {
      expect(privBytes.length).to.be.equal(32);
      expect(secondPrivBytes.length).to.be.equal(32);
    });

    it('should validate key Buffer to be true', () => {
      expect(Crypto.validateKey(privBytes)).to.be.true;
      expect(Crypto.validateKey(secondPrivBytes)).to.be.true;
    });

    describe('Merge keys', () => {
      const merged = Crypto.addPrivateKeys(privBytes, secondPrivBytes);

      it('should be Buffer', () => {
        expect(merged).to.be.instanceOf(Buffer);
      });

      it ('should be equal to 32-byte', () => {
        expect(merged.length).to.be.equal(32);
      });

      it ('should validate merged key Buffer to be true', () => {
        expect(Crypto.validateKey(merged)).to.be.true;
      });
    });

  });

  describe('Public keys', () => {
    const pubBytes = Crypto.randomSeed(33);
    const secondPubBytes = Crypto.randomSeed(33);

    it('should be equal to 33-byte', () => {
      expect(pubBytes.length).to.be.equal(33);
      expect(secondPubBytes.length).to.be.equal(33);
    });

    describe('Merge keys', () => {
      const merged = Crypto.addPublicKeys(pubBytes, secondPubBytes);

      it('should be Buffer', () => {
        expect(merged).to.be.instanceOf(Buffer);
      });

      it ('should be equal to 33-byte', () => {
        expect(merged.length).to.be.equal(33);
      });
    });

  });

});
