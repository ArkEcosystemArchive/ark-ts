"use strict";
/**
 * @module api
 */
/** Blocks related API calls. */
Object.defineProperty(exports, "__esModule", { value: true });
var model = require("../model/Block");
var Http_1 = require("../services/Http");
var BlockApi = (function () {
    function BlockApi(http) {
        this.http = http;
    }
    /**
     * Get network fees.
     */
    BlockApi.networkFees = function (network) {
        return new Http_1.default(network).get('/blocks/getfees', null, model.BlockFees);
    };
    /**
     * Get block by id.
     */
    BlockApi.prototype.get = function (params) {
        return this.http.get('/blocks/get', params, model.BlockResponse);
    };
    /**
     *  Get all blocks.
     */
    BlockApi.prototype.list = function (params) {
        return this.http.get('/blocks', params, model.BlockResponse);
    };
    /**
     * Get transaction fee for sending "normal" transactions.
     */
    BlockApi.prototype.blockchainFee = function () {
        return this.http.get('/blocks/getFee', null, model.BlockFee);
    };
    /**
     * Get blockchain height.
     */
    BlockApi.prototype.blockchainHeight = function () {
        return this.http.get('/blocks/getHeight', null, model.BlockHeight);
    };
    return BlockApi;
}());
exports.default = BlockApi;
//# sourceMappingURL=BlockApi.js.map