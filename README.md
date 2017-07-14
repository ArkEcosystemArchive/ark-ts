![TSARK Logo](http://i.imgur.com/OJjwPpU.png)

> A wrapper for the ARK API, written with TypeScript.

TSARK is an library client designed to facilitate how you interact with the ARK blockchain.

## Why TypeScript

  * TypeScript is is a superset of JavaScript which mainly offers optional static typing, classes, and interfaces. The learning curve is not that steep.
  * Types are optional, TSARK has compiled to ES6 so you can work with both, ECMAScript or TypeScript.
  * A better development experience, including auto-complete and fully documented.

## Documentation

> [API documentation](#) is hosted on github pages, and is generated from [TypeDoc](https://github.com/TypeStrong/typedoc).

## Installation

TSARK is avaliable from `npm`.

```js
npm i ark-tsc --save
```
## Usage

For the best TypeScript experience, you should either use [Visual Studio Code](http://code.visualstudio.com/), or a [plug-in for your favorite text editor](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support).

### Basic Example

> Get delegate list from Devnet network.

```js
import { Client, Network, NetworkType } from 'ark-tsc';

const devnet = Network.getDefault(NetworkType.Devnet);
const client = new Client(devnet);

client.delegate.list().subscribe((list) => {
  console.log(list);
});
```
For more examples please see documentation or in the tests on each directory.

## Running the tests

```js
npm run test
```

## Contributing

  * Submit bugs and help us verify fixes as they are checked in.
  * Engage with other users and developers on [ARK Slack](https://ark.io/slack/).
  * Join the #development channel on Slack or contact our developer Lúcio (@lorenzo).
  * [Contribute bounties](./CONTRIBUTING.md).

## Credits

**Lúcio Rubens** - [@luciorubeens](https://github.com/luciorubeens);

## License

TSARK is licensed under the MIT License - see the [LICENSE.md](./LICENSE) file for details.
