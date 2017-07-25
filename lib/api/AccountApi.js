"use strict";
/**
 * @module api
 */
/** Account related API calls. */
Object.defineProperty(exports, "__esModule", { value: true });
var model = require("../model/Account");
var AccountApi = (function () {
    function AccountApi(http) {
        this.http = http;
    }
    /**
     * Returns account information of an address.
     */
    AccountApi.prototype.get = function (params) {
        return this.http.get('/accounts', params, model.AccountResponse);
    };
    /**
     * Get the balance of an account.
     */
    AccountApi.prototype.balance = function (params) {
        return this.http.get('/accounts/getBalance', params, model.AccountResponse);
    };
    /**
     * Get the public key of an account. If the account does not exist the API call will return an error.
     */
    AccountApi.prototype.publicKey = function (params) {
        return this.http.get('/accounts/getPublicKey', params, model.AccountResponse);
    };
    /**
     * Get votes by account address.
     */
    AccountApi.prototype.votes = function (params) {
        return this.http.get('/accounts/delegates', params, model.AccountVotesResponse);
    };
    return AccountApi;
}());
exports.default = AccountApi;
//# sourceMappingURL=AccountApi.js.map