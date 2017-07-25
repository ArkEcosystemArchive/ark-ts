"use strict";
/**
 * @module utils
 */
/** Crypto related functions. */
Object.defineProperty(exports, "__esModule", { value: true });
var bigi = require("bigi");
var bs58check = require("bs58check");
var createHash = require("create-hash");
var createHmac = require("create-hmac");
var ecurve = require("ecurve");
var randomBytes = require("randombytes");
var curveParams = ecurve.getCurveByName('secp256k1');
function assert(condition, message) {
    if (message === void 0) { message = 'Assertion failed'; }
    if (!condition) {
        throw new Error(message);
    }
}
var Crypto = (function () {
    function Crypto() {
    }
    Crypto.ripemd160 = function (buffer) {
        return createHash('rmd160').update(buffer).digest();
    };
    Crypto.sha1 = function (buffer) {
        return createHash('sha1').update(buffer).digest();
    };
    Crypto.sha256 = function (buffer) {
        return createHash('sha256').update(buffer).digest();
    };
    Crypto.hash160 = function (buffer) {
        return this.ripemd160(this.sha256(buffer));
    };
    Crypto.hash256 = function (buffer) {
        return this.sha256(this.sha256(buffer));
    };
    Crypto.hmacSha512 = function (key, buffer) {
        return createHmac('sha512', key).update(buffer).digest();
    };
    Crypto.randomSeed = function (size) {
        return randomBytes(size);
    };
    Crypto.bs58encode = function (buffer) {
        return bs58check.encode(buffer);
    };
    Crypto.bs58decode = function (hash) {
        return bs58check.decode(hash);
    };
    Crypto.int32toBuffer = function (size) {
        var buf = new Buffer(4);
        buf.writeInt32BE(size, 0);
        return buf;
    };
    Crypto.decodeCurvePoint = function (buffer) {
        return ecurve.Point.decodeFrom(curveParams, buffer);
    };
    Crypto.validateCurve = function (buffer) {
        return curveParams.validate(buffer);
    };
    Crypto.validateKey = function (key) {
        var buf = bigi.fromBuffer(key);
        assert(Number(buf.signum()) > 0, 'Private key must be greather than 0');
        assert(Number(buf.compareTo(curveParams.n)) <= 0, 'Private key must be less than the curve order');
        assert(key.length === 32, 'Private key must be equals to 32 byte');
        return true;
    };
    Crypto.addPrivateKeys = function (key, priKey) {
        var keyBigi = bigi.fromBuffer(key);
        var privKeyBigi = bigi.fromBuffer(priKey);
        return keyBigi.add(privKeyBigi).mod(curveParams.n).toBuffer(32);
    };
    Crypto.addPublicKeys = function (key, pubKey) {
        var keyBigi = bigi.fromBuffer(key);
        var pubKeyBigi = bigi.fromBuffer(pubKey);
        var keyPoint = curveParams.G.multiply(keyBigi);
        var pubKeyPoint = curveParams.G.multiply(pubKeyBigi);
        var expanded = keyPoint.add(pubKeyPoint);
        return expanded.getEncoded(true);
    };
    return Crypto;
}());
exports.default = Crypto;
//# sourceMappingURL=Crypto.js.map