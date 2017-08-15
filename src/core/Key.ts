import * as secp256k1 from 'secp256k1';
import * as wif from 'wif';

import * as model from '../model';

import Crypto from '../utils/Crypto';

/** Public and private keys. */
export class PublicKey {

  constructor(public hash: Buffer, public isCompressed: boolean = true, public network?: model.Network) {}

  public static fromAddress(address: string): PublicKey {
    const hash = Crypto.bs58decode(address);
    return new PublicKey(hash);
  }

  public static fromHex(hex: string): PublicKey {
    const buf = new Buffer(hex, 'hex');
    return new PublicKey(buf);
  }

  public static validateAddress(address: string, network: model.Network) {
    try {
      const decode = this.fromAddress(address);
      return decode.hash[0] === network.version;
    } catch (e) {
      return false;
    }
  }

  public getAddress(): string {
    if (!this.network) {
      throw new Error('Network not defined');
    }

    const payload = new Buffer(21);
    const buf = Crypto.ripemd160(this.hash);
    payload.writeUInt8(this.network.version, 0);
    buf.copy(payload, 1);

    return Crypto.bs58encode(payload);
  }

  /**
   * Set a network to publicKey
   * Useful to get address from specific version
   */
  public setNetwork(network: model.Network): void {
    this.network = network;
  }

  public toHex() {
    return this.hash.toString('hex');
  }

  public verifySignature(signature: Buffer, data: Buffer) {
    const sig = secp256k1.signatureImport(signature);
    return secp256k1.verify(data, sig, this.hash);
  }

}

export class PrivateKey {

  private publicKey: PublicKey;

  constructor(public hash?: Buffer, publicKey?: PublicKey | Buffer) {
    if (publicKey instanceof Buffer) {
      this.publicKey = new PublicKey(publicKey);
    }

    if (!publicKey && hash) {
      this.publicKey = this.getPublicKey();
    }
  }

  public static fromWIF(
    wifString: string,
    network: model.Network = model.Network.getDefault(model.NetworkType.Mainnet),
  ): PrivateKey {
    if (!network) {
      network = model.Network.getDefault();
    }

    const decoded = wif.decode(wifString);
    const version = decoded.version;

    return new PrivateKey(decoded.privateKey);
  }

  public static fromSeed(
    passphrase: string | Buffer,
    network: model.Network = model.Network.getDefault(model.NetworkType.Mainnet),
  ): PrivateKey {
    let password;

    if (typeof passphrase === 'string') {
      password = new Buffer(passphrase, 'utf-8');
    } else {
      password = <Buffer> passphrase;
    }

    const hash = Crypto.sha256(password);
    const newKey = new PrivateKey(hash);

    newKey.getPublicKey().setNetwork(network);
    return newKey;
  }

  public getPublicKey(): PublicKey {
    if (this.publicKey) {
      return this.publicKey;
    }

    const compressed = secp256k1.publicKeyCreate(this.hash);
    const pub = secp256k1.publicKeyConvert(compressed, true);

    this.publicKey = new PublicKey(pub);
    return this.publicKey;
  }

  public sign(data: Buffer) {
    const sig = secp256k1.sign(data, this.hash).signature;
    const exp = secp256k1.signatureExport(sig);
    return exp;
  }

  public toHex() {
    return this.hash.toString('hex');
  }

  public toWIF() {
    return wif.encode(this.publicKey.network.wif, this.hash, this.publicKey.isCompressed);
  }

}
