"use strict";
/**
 * @module core
 */
/** Public and Private Keys. */
Object.defineProperty(exports, "__esModule", { value: true });
var secp256k1 = require("secp256k1");
var wif = require("wif");
var model = require("../model");
var Crypto_1 = require("../utils/Crypto");
var PublicKey = (function () {
    function PublicKey(hash, isCompressed, network) {
        if (isCompressed === void 0) { isCompressed = true; }
        this.hash = hash;
        this.isCompressed = isCompressed;
        this.network = network;
    }
    PublicKey.fromAddress = function (address) {
        var hash = Crypto_1.default.bs58decode(address);
        return new PublicKey(hash);
    };
    PublicKey.fromHex = function (hex) {
        var buf = new Buffer(hex, 'hex');
        return new PublicKey(buf);
    };
    PublicKey.validateAddress = function (address, network) {
        try {
            var decode = this.fromAddress(address);
            return decode.hash[0] === network.version;
        }
        catch (e) {
            return false;
        }
    };
    PublicKey.prototype.getAddress = function () {
        if (!this.network) {
            throw new Error('Network not defined');
        }
        var payload = new Buffer(21);
        var buf = Crypto_1.default.ripemd160(this.hash);
        payload.writeUInt8(this.network.version, 0);
        buf.copy(payload, 1);
        return Crypto_1.default.bs58encode(payload);
    };
    /**
     * Set a network to publicKey
     * Useful to get address from specific version
     */
    PublicKey.prototype.setNetwork = function (network) {
        this.network = network;
    };
    PublicKey.prototype.toHex = function () {
        return this.hash.toString('hex');
    };
    PublicKey.prototype.verifySignature = function (signature, data) {
        var sig = secp256k1.signatureImport(signature);
        return secp256k1.verify(data, sig, this.hash);
    };
    return PublicKey;
}());
exports.PublicKey = PublicKey;
var PrivateKey = (function () {
    function PrivateKey(hash, publicKey) {
        this.hash = hash;
        if (publicKey instanceof Buffer) {
            this.publicKey = new PublicKey(publicKey);
        }
        if (!publicKey && hash) {
            this.publicKey = this.getPublicKey();
        }
    }
    PrivateKey.fromWIF = function (wifString, network) {
        if (network === void 0) { network = model.Network.getDefault(model.NetworkType.Mainnet); }
        if (!network) {
            network = model.Network.getDefault();
        }
        var decoded = wif.decode(wifString);
        var version = decoded.version;
        return new PrivateKey(decoded.privateKey);
    };
    PrivateKey.fromSeed = function (passphrase, network) {
        if (network === void 0) { network = model.Network.getDefault(model.NetworkType.Mainnet); }
        var password;
        if (typeof passphrase === 'string') {
            password = new Buffer(passphrase, 'utf-8');
        }
        else {
            password = passphrase;
        }
        var hash = Crypto_1.default.sha256(password);
        var newKey = new PrivateKey(hash);
        newKey.getPublicKey().setNetwork(network);
        return newKey;
    };
    PrivateKey.prototype.getPublicKey = function () {
        if (this.publicKey) {
            return this.publicKey;
        }
        var compressed = secp256k1.publicKeyCreate(this.hash);
        var pub = secp256k1.publicKeyConvert(compressed, true);
        this.publicKey = new PublicKey(pub);
        return this.publicKey;
    };
    PrivateKey.prototype.sign = function (data) {
        var sig = secp256k1.sign(data, this.hash).signature;
        var exp = secp256k1.signatureExport(sig);
        return exp;
    };
    PrivateKey.prototype.toHex = function () {
        return this.hash.toString('hex');
    };
    PrivateKey.prototype.toWIF = function () {
        return wif.encode(this.publicKey.network.wif, this.hash, this.publicKey.isCompressed);
    };
    return PrivateKey;
}());
exports.PrivateKey = PrivateKey;
//# sourceMappingURL=Key.js.map