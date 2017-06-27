import { Client } from './api/Client';
import { Key } from './core/Key';

import * as model from './model/models';

var network = new model.Network().getDefault(model.NetworkType.Mainnet);
var client = new Client(network);

var tx = new model.TransactionSend();
tx.passphrase = 'relax degree chest flip nerve plastic resemble truth zero depth merit robust';
tx.recipientId = 'AaeUXmGKG1GRsCEZrBzsBfBs2sEx4z5ozu';
tx.amount = 10000000;
tx.vendorField = 'ark-tsc';

client.transaction.send(tx).subscribe(transaction => {
  console.log(transaction, client.transaction.verify(transaction));
});