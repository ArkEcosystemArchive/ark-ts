"use strict";
/**
 * @module core
 */
/** HD Wallet. */
Object.defineProperty(exports, "__esModule", { value: true });
var bytebuffer = require("bytebuffer");
var config_1 = require("../config");
var model = require("../model");
var Crypto_1 = require("../utils/Crypto");
var Key_1 = require("./Key");
var MASTER_SECRET = 'Bitcoin seed';
var HIGHEST_BIT = 0x80000000;
var HDNode = (function () {
    function HDNode() {
        // pass
    }
    HDNode.createMasterKey = function (seed, networkType) {
        var networkName = model.NetworkType[networkType].toLowerCase();
        var networkConfig = config_1.default.networks[networkName].bip32;
        if (typeof seed === 'string') {
            seed = new Buffer(seed, 'hex');
        }
        var hmac = Crypto_1.default.hmacSha512(MASTER_SECRET, seed);
        var keyBytes = hmac.slice(0, 32);
        var chainCode = hmac.slice(32);
        var wallet = new HDNode();
        wallet.chainCode = chainCode;
        wallet.childNumber = new Buffer(4);
        wallet.depth = 0;
        wallet.fingerPrint = new Buffer(4);
        wallet.isPrivate = true;
        wallet.key = new Key_1.PrivateKey(keyBytes);
        wallet.version = Crypto_1.default.int32toBuffer(networkConfig['private']);
        wallet.network = networkName;
        return wallet;
    };
    HDNode.unserialize = function (hash, networkType) {
        var networkName = model.NetworkType[networkType].toLowerCase();
        var networkConfig = config_1.default.networks[networkName].bip32;
        var buffer = Crypto_1.default.bs58decode(hash);
        if (buffer.length !== 78) {
            throw new Error('Invalid buffer length');
        }
        var version = buffer.readUInt32BE(0);
        if (version !== networkConfig.public && version !== networkConfig.private) {
            throw new Error('Invalid network version');
        }
        var depth = buffer[4];
        var parentFingerprint = buffer.slice(5, 9);
        if (depth === 0 && parentFingerprint.toString('hex') !== '00000000') {
            throw new Error('Invalid parent fingerprint');
        }
        var index = buffer.readUInt32BE(9);
        if (depth === 0 && index !== 0) {
            throw new Error('Invalid index');
        }
        var chainCode = buffer.slice(13, 45);
        var key;
        if (version === networkConfig.private) {
            if (buffer.readUInt8(45) !== 0x00) {
                throw new Error('Invalid private key');
            }
            key = new Key_1.PrivateKey(buffer.slice(46, 78));
        }
        else {
            var curve = Crypto_1.default.decodeCurvePoint(buffer.slice(45, 78));
            Crypto_1.default.validateCurve(curve);
            key = new Key_1.PrivateKey(null, curve);
        }
        var wallet = new HDNode();
        wallet.depth = depth;
        wallet.childNumber = Crypto_1.default.int32toBuffer(index);
        wallet.fingerPrint = parentFingerprint;
        wallet.key = key;
        wallet.chainCode = chainCode;
        wallet.network = networkName;
        var networkCapitalize = networkName.charAt(0).toUpperCase() + networkName.slice(1);
        wallet.key.getPublicKey().network = model.Network.getDefault(model.NetworkType[networkCapitalize]);
        return wallet;
    };
    HDNode.generateSeed = function () {
        return Crypto_1.default.randomSeed(32);
    };
    HDNode.prototype.childKey = function (index) {
        var networkConfig = config_1.default.networks[this.network].bip32;
        var hardenedChild = index >= HIGHEST_BIT;
        var childIndexBytes = Crypto_1.default.int32toBuffer(index);
        if (!this.isPrivate && hardenedChild) {
            throw new Error('Could not derive hardened child key');
        }
        var data;
        if (this.isPrivate) {
            if (hardenedChild) {
                data = Buffer.concat([new Buffer(1), this.key.hash]);
            }
            else {
                data = this.getPublicHash();
            }
        }
        else {
            data = this.key.getPublicKey().hash;
        }
        data = Buffer.concat([data, childIndexBytes]);
        var hmac = Crypto_1.default.hmacSha512(this.chainCode, data);
        var iL = hmac.slice(0, 32);
        var iR = hmac.slice(32);
        Crypto_1.default.validateKey(iL);
        var childKey = new HDNode();
        childKey.childNumber = childIndexBytes;
        childKey.chainCode = iR;
        childKey.depth = this.depth + 1;
        childKey.isPrivate = this.isPrivate;
        childKey.network = this.network;
        var newKey;
        if (this.isPrivate) {
            childKey.version = Crypto_1.default.int32toBuffer(networkConfig['private']);
            childKey.fingerPrint = this.getFingerPrint();
            var priv = Crypto_1.default.addPrivateKeys(iL, this.key.hash);
            newKey = new Key_1.PrivateKey(priv);
        }
        else {
            childKey.version = Crypto_1.default.int32toBuffer(networkConfig['public']);
            childKey.fingerPrint = Crypto_1.default.hash160(this.getPublicHash());
            var pub = Crypto_1.default.addPublicKeys(iL, this.getPublicHash());
            newKey = new Key_1.PrivateKey(null, pub);
        }
        var networkCapitalize = this.network.charAt(0).toUpperCase() + this.network.slice(1);
        newKey.getPublicKey().setNetwork(model.Network.getDefault(model.NetworkType[networkCapitalize]));
        childKey.key = newKey;
        return childKey;
    };
    HDNode.prototype.serialize = function () {
        var keyBytes;
        if (this.isPrivate) {
            keyBytes = Buffer.concat([new Buffer(1), this.key.hash]);
        }
        else {
            keyBytes = this.getPublicHash();
        }
        var buffer = new bytebuffer(78, true);
        buffer.append(this.version);
        buffer.writeInt8(this.depth);
        buffer.append(this.fingerPrint);
        buffer.append(this.childNumber);
        buffer.append(this.chainCode);
        buffer.append(keyBytes);
        buffer.flip();
        var serializedKey = Crypto_1.default.bs58encode(buffer.toBuffer());
        return serializedKey;
    };
    HDNode.prototype.toPublic = function () {
        var wallet = new HDNode();
        wallet.isPrivate = false;
        wallet.chainCode = this.chainCode;
        wallet.childNumber = this.childNumber;
        wallet.depth = this.depth;
        wallet.fingerPrint = this.fingerPrint;
        wallet.network = this.network;
        wallet.version = this.version;
        wallet.key = this.key;
        return wallet;
    };
    HDNode.prototype.getPublicHash = function () {
        return this.key.getPublicKey().hash;
    };
    HDNode.prototype.getFingerPrint = function () {
        return Crypto_1.default.hash160(this.getPublicHash()).slice(0, 4);
    };
    return HDNode;
}());
exports.HDNode = HDNode;
//# sourceMappingURL=HDNode.js.map