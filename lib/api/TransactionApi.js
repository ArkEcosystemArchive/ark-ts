"use strict";
/**
 * @module api
 */
/** Transaction related API calls. */
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var json_typescript_mapper_1 = require("json-typescript-mapper");
var model = require("../model/Transaction");
var BlockApi_1 = require("./BlockApi");
var Key_1 = require("../core/Key");
var Tx_1 = require("../core/Tx");
var TransactionApi = (function () {
    function TransactionApi(http) {
        this.http = http;
    }
    /**
     * Transaction used to transfer amounts to specific address.
     */
    TransactionApi.prototype.createTransaction = function (params) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            if (!Key_1.PublicKey.validateAddress(params.recipientId, _this.http.network)) {
                observer.error('Wrong recipientId');
            }
            BlockApi_1.default.networkFees(_this.http.network).subscribe(function (blocks) {
                var fees = blocks.fees;
                var data = {
                    amount: params.amount,
                    fee: fees.send,
                    recipientId: params.recipientId,
                    type: model.TransactionType.SendArk,
                    vendorField: params.vendorField,
                };
                var tx = new Tx_1.default(data, _this.http.network, params.passphrase, params.secondPassphrase);
                data = tx.generate();
                var typedTx = json_typescript_mapper_1.deserialize(model.Transaction, json_typescript_mapper_1.serialize(data));
                observer.next(typedTx);
                observer.complete();
            }, function (e) { return observer.error(e); });
        });
    };
    /**
     * Transaction used to vote for a chosen Delegate.
     */
    TransactionApi.prototype.createVote = function (params) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            BlockApi_1.default.networkFees(_this.http.network).subscribe(function (blocks) {
                var fees = blocks.fees;
                var updown = model.VoteType[params.type] === 'Add' ? '+' : '-';
                var data = {
                    asset: {
                        votes: [updown + params.delegatePublicKey],
                    },
                    fee: fees.vote,
                    type: model.TransactionType.Vote,
                    vendorField: 'Delegate vote transaction',
                };
                var tx = new Tx_1.default(data, _this.http.network, params.passphrase, params.secondPassphrase);
                tx.setAddress();
                data = tx.generate();
                var typedTx = json_typescript_mapper_1.deserialize(model.Transaction, json_typescript_mapper_1.serialize(data));
                observer.next(typedTx);
                observer.complete();
            }, function (e) { return observer.error(e); });
        });
    };
    /**
     * Transaction used to register as a Delegate.
     */
    TransactionApi.prototype.createDelegate = function (params) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            if (params.username.length > 20) {
                observer.error('Delegate name is too long, 20 characters maximum');
            }
            BlockApi_1.default.networkFees(_this.http.network).subscribe(function (blocks) {
                var fees = blocks.fees;
                var data = {
                    asset: {
                        username: params.username,
                    },
                    fee: fees.delegate,
                    type: model.TransactionType.CreateDelegate,
                    vendorField: 'Create delegate transaction',
                };
                var tx = new Tx_1.default(data, _this.http.network, params.passphrase, params.secondPassphrase);
                data = tx.generate();
                var typedTx = json_typescript_mapper_1.deserialize(model.Transaction, json_typescript_mapper_1.serialize(data));
                observer.next(typedTx);
                observer.complete();
            }, function (e) { return observer.error(e); });
        });
    };
    /**
     * Transaction used to create second passphrase.
     */
    TransactionApi.prototype.createSignature = function (passphrase, secondPassphrase) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            BlockApi_1.default.networkFees(_this.http.network).subscribe(function (blocks) {
                var fees = blocks.fees;
                var data = {
                    asset: {},
                    fee: fees.secondsignature,
                    type: model.TransactionType.SecondSignature,
                    vendorField: 'Create second signature',
                };
                var tx = new Tx_1.default(data, _this.http.network, passphrase, secondPassphrase);
                tx.setAssetSignature();
                data = tx.generate();
                var typedTx = json_typescript_mapper_1.deserialize(model.Transaction, json_typescript_mapper_1.serialize(data));
                observer.next(typedTx);
                observer.complete();
            }, function (e) { return observer(e); });
        });
    };
    /**
     * Post transaction to broadcast
     */
    TransactionApi.prototype.post = function (transaction) {
        var params = { transactions: [transaction] };
        return this.http.post('/peer/transactions', params, model.TransactionResponse);
    };
    /**
     * Transaction matched by id.
     */
    TransactionApi.prototype.get = function (id) {
        var params = { id: id };
        return this.http.get('/transactions/get', params, model.TransactionResponse);
    };
    /**
     * Get unconfirmed transaction by id.
     */
    TransactionApi.prototype.getUnconfirmed = function (id) {
        var params = { id: id };
        return this.http.get('/transactions/unconfirmed/get', params, model.TransactionResponse);
    };
    /**
     * Transactions list matched by provided parameters.
     */
    TransactionApi.prototype.list = function (params) {
        return this.http.get('/transactions', params, model.TransactionResponse);
    };
    /**
     * Transactions unconfirmed list matched by provided parameters.
     */
    TransactionApi.prototype.listUnconfirmed = function (params) {
        return this.http.get('/transactions/unconfirmed', params, model.TransactionResponse);
    };
    return TransactionApi;
}());
exports.default = TransactionApi;
//# sourceMappingURL=TransactionApi.js.map