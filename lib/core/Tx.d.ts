/// <reference types="node" />
import * as model from '../model';
export default class Tx {
    transaction: model.Transaction;
    private passphrase;
    private secondPassphrase;
    private privKey;
    private secondPrivKey;
    constructor(transaction: model.Transaction, network: model.Network, passphrase: string, secondPassphrase?: string);
    /**
     * Generate transaction
     * Call all steps to generate a id.
     */
    static fromBytes(hash: string): void;
    /**
     * Generate transaction
     * Call all steps to generate a id.
     */
    generate(): model.Transaction;
    /**
     * Set address by current publicKey.
     * To reference transaction without a recipient.
     */
    setAddress(): void;
    /**
     * Sign transaction.
     */
    sign(): Buffer;
    /**
     * Sign transaction with second passphrase.
     */
    secondSign(): Buffer;
    /**
     * Set asset to create second passphrase in current Tranasction.
     */
    setAssetSignature(): void;
    /**
     * Returns bytearray of the Transaction object to be signed and send to blockchain
     */
    toBytes(skipSignature?: boolean, skipSecondSignature?: boolean): Buffer;
    getHash(skipSignature?: boolean, skipSecondSignature?: boolean): Buffer;
    /**
     * Verify an ECDSA signature from transaction
     */
    verify(): boolean;
    /**
     * Verify an ECDSA second signature from transaction.
     */
    secondVerify(): boolean;
    /**
     * Returns calculated ID of transaction - hashed 256.
     */
    getId(): Buffer;
}
