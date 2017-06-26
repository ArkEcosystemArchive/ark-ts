import * as createHash from 'create-hash';

export class Crypto {

  static ripemd160(buffer: Buffer):Buffer {
    return createHash('rmd160').update(buffer).digest();
  }

  static sha1(buffer: Buffer):Buffer {
    return createHash('sha1').update(buffer).digest();
  }

  static sha256(buffer: Buffer):Buffer {
    return createHash('sha256').update(buffer).digest();
  }

  static hash160(buffer: Buffer):Buffer {
    return this.ripemd160(this.sha256(buffer));
  }

  static hash256(buffer: Buffer):Buffer {
    return this.sha256(this.sha256(buffer));
  }

}
