import { Key } from './core/Key';
import { Network, NetworkType } from './model/Network';

var keys = Key.getKeys('ark typescripted', new Network().getDefault(NetworkType.Devnet));
var address = Key.getAddress(keys.publicKey);

var hash = new Buffer(32);
var signature = Key.sign(hash, keys);
var verify = Key.verify(signature, hash, keys.publicKey);

console.log(verify);