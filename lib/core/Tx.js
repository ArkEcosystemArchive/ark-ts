"use strict";
/**
 * @module core
 */
/** Comunicate between transaction and keypair. */
Object.defineProperty(exports, "__esModule", { value: true });
var bytebuffer = require("bytebuffer");
var model = require("../model");
var Key_1 = require("./Key");
var Crypto_1 = require("../utils/Crypto");
var Slot_1 = require("../utils/Slot");
function padBytes(value, buf) {
    var valBuffer = new Buffer(value);
    if (valBuffer.length <= buf.length) {
        valBuffer.copy(buf, 0);
    }
    return buf;
}
var Tx = (function () {
    function Tx(transaction, network, passphrase, secondPassphrase) {
        this.transaction = transaction;
        this.passphrase = passphrase;
        this.secondPassphrase = secondPassphrase;
        this.privKey = Key_1.PrivateKey.fromSeed(passphrase);
        this.privKey.getPublicKey().setNetwork(network);
        if (secondPassphrase) {
            this.secondPrivKey = Key_1.PrivateKey.fromSeed(secondPassphrase);
        }
    }
    /**
     * Generate transaction
     * Call all steps to generate a id.
     */
    Tx.fromBytes = function (hash) {
        var buf = new bytebuffer.fromHex(hash, true, false);
        var type = buf.readByte();
        var timestamp = buf.readInt();
        var senderPublicKey = buf.readBytes(33).toBuffer();
        var recipientBegin = buf.readBytes(21);
        if (type === 0 || type === 3) {
            recipientBegin = buf.readBytes(13).prepend(recipientBegin);
        }
        recipientBegin = recipientBegin.toBuffer();
        var vendorField = buf.readBytes(64).toBuffer();
        var amount = buf.readLong().low;
        var fee = buf.readLong().low;
        var asset;
        switch (type) {
            case model.TransactionType.CreateDelegate:
                asset = buf.readBytes(20);
            case model.TransactionType.Vote:
                asset = buf.readBytes(67);
            case model.TransactionType.SecondSignature:
                asset = buf.readBytes(33);
        }
        // TODO
        // signature
    };
    /**
     * Generate transaction
     * Call all steps to generate a id.
     */
    Tx.prototype.generate = function () {
        var tx = this.transaction;
        tx.timestamp = Slot_1.default.getTime();
        tx.senderPublicKey = this.privKey.getPublicKey().toHex();
        if (!tx.amount) {
            tx.amount = 0;
        }
        tx.signature = this.sign().toString('hex');
        if (this.secondPrivKey && !tx.asset.hasOwnProperty('signature')) {
            tx.secondSenderPublicKey = this.secondPrivKey.getPublicKey().toHex();
            tx.signSignature = this.secondSign().toString('hex');
        }
        tx.id = this.getId().toString('hex');
        this.transaction = tx;
        return tx;
    };
    /**
     * Set address by current publicKey.
     * To reference transaction without a recipient.
     */
    Tx.prototype.setAddress = function () {
        this.transaction.recipientId = this.privKey.getPublicKey().getAddress();
    };
    /**
     * Sign transaction.
     */
    Tx.prototype.sign = function () {
        return this.privKey.sign(this.getHash(true, true));
    };
    /**
     * Sign transaction with second passphrase.
     */
    Tx.prototype.secondSign = function () {
        return this.secondPrivKey.sign(this.getHash(false, false));
    };
    /**
     * Set asset to create second passphrase in current Tranasction.
     */
    Tx.prototype.setAssetSignature = function () {
        this.transaction.asset = {
            signature: this.secondPrivKey.getPublicKey().toHex(),
        };
    };
    /**
     * Returns bytearray of the Transaction object to be signed and send to blockchain
     */
    Tx.prototype.toBytes = function (skipSignature, skipSecondSignature) {
        if (skipSignature === void 0) { skipSignature = false; }
        if (skipSecondSignature === void 0) { skipSecondSignature = false; }
        var tx = this.transaction;
        var buf = new bytebuffer(undefined, true);
        buf.writeByte(tx.type);
        buf.writeInt(tx.timestamp);
        buf.append(tx.senderPublicKey, 'hex');
        if (tx.requesterPublicKey) {
            buf.append(tx.requesterPublicKey, 'hex');
        }
        if (typeof tx.recipientId !== 'undefined') {
            buf.append(Key_1.PublicKey.fromAddress(tx.recipientId).hash);
        }
        else {
            buf.append(new Buffer(21));
        }
        var padVendor = new Buffer(64);
        if (tx.vendorField) {
            padVendor = padBytes(tx.vendorField, padVendor);
        }
        buf.append(padVendor);
        buf.writeLong(tx.amount);
        buf.writeLong(tx.fee);
        if (tx.asset && Object.keys(tx.asset).length > 0) {
            var asset = tx.asset[Object.keys(tx.asset)[0]];
            if (tx.type === model.TransactionType.CreateDelegate) {
                buf.append(padBytes(asset, new Buffer(20)), 'utf-8');
            }
            else {
                buf.append(new Buffer(asset, 'utf-8'));
            }
        }
        if (!skipSignature && tx.signature) {
            buf.append(tx.signature, 'hex');
        }
        if (!skipSecondSignature && tx.signSignature) {
            buf.append(tx.signSignature, 'hex');
        }
        buf.flip();
        var txBytes = buf.toBuffer();
        return txBytes;
    };
    Tx.prototype.getHash = function (skipSignature, skipSecondSignature) {
        if (skipSignature === void 0) { skipSignature = false; }
        if (skipSecondSignature === void 0) { skipSecondSignature = false; }
        return Crypto_1.default.sha256(this.toBytes(skipSignature, skipSecondSignature));
    };
    /**
     * Verify an ECDSA signature from transaction
     */
    Tx.prototype.verify = function () {
        var txBytes = this.getHash(true, true);
        var signBytes = new Buffer(this.transaction.signature, 'hex');
        return this.privKey.getPublicKey().verifySignature(signBytes, txBytes);
    };
    /**
     * Verify an ECDSA second signature from transaction.
     */
    Tx.prototype.secondVerify = function () {
        var txBytes = Crypto_1.default.hash256(this.getHash(false, false));
        var signBytes = new Buffer(this.transaction.signSignature, 'hex');
        var pub = Key_1.PublicKey.fromHex(this.transaction.secondSenderPublicKey);
        return pub.verifySignature(signBytes, txBytes);
    };
    /**
     * Returns calculated ID of transaction - hashed 256.
     */
    Tx.prototype.getId = function () {
        return this.getHash();
    };
    return Tx;
}());
exports.default = Tx;
//# sourceMappingURL=Tx.js.map