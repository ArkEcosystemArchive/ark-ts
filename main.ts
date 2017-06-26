import { Key } from './core/Key';
import { Network, NetworkType } from './model/Network';

var passphrase = 'abstract ill robust brown tennis uncover pilot elite antique uncle special word';
var wif = 'SFpyHgsgkGRwJg9yLHHrP8XsXe4sQ8LazH6NuujVeUUJBHcNQwhk';

var network = new Network().getDefault(NetworkType.Devnet);
var keys = Key.getKeys(passphrase, network);
var address = Key.getAddress(keys.publicKey);
var wif = Key.toWIF(keys);
console.log(address, wif, keys.publicKey.publicKey.toString('hex'));

var hash = new Buffer(32);
var signature = Key.sign(hash, keys);
var verify = Key.verify(signature, hash, keys.publicKey);

console.log(verify);