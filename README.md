# KAPU

> A KAPU API wrapper, written in TypeScript to interact with KAPU blockchain.

TSKAPU is a library client designed to facilitate how you interact with the ARK blockchain.

## Why TypeScript

  * TypeScript is is a superset of JavaScript which mainly offers optional static typing, classes, and interfaces. The learning curve is not that steep.
  * Types are optional, KAPUTS compiles into ES5 so you can work with both, ECMAScript or TypeScript.
  * A better development experience, including auto-complete and fully documented.

## Documentation

> [TypeDoc](https://github.com/TypeStrong/typedoc).

## Installation

KAPUTS will be avaliable from `npm`.

```bash
yarn add kapu-ts
```

or

```bash
npm i kapu-ts --save
```

## Usage

For the best TypeScript experience, you should either use [Visual Studio Code](http://code.visualstudio.com/), or a [plug-in for your favorite text editor](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support).

### Basic Examples

> Get delegate list from Devnet network.

```js
import { Client, Network, NetworkType } from 'kapu-ts';

const devnet = Network.getDefault(NetworkType.Devnet);
const client = new Client(devnet);

client.delegate.list().subscribe((list) => {
  console.log(list);
});
```

> Get address from passphrase.

```js
import { PrivateKey } from 'kapu-ts/core';

// if no specify a second param, default is mainnet
const key = PrivateKey.fromSeed('my secret passphrase');
console.log(key.getPublicKey().getAddress()); // AaWU6X3pGdtSCK3s9weo9tjth64F3hixgT
```

For more examples please see documentation or look for tests in each directory.

## Running the tests

```bash
npm run test
```

## Contributing

  * If you find any bugs, submit an [issue](../../issues) or open [pull-request](../../pulls), helping us catch and fix them.
  * [Contribute bounties](./CONTRIBUTING.md).

## License

TSARK is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
