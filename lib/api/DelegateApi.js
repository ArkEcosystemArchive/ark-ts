"use strict";
/**
 * @module api
 */
/** Delegate related API calls. */
Object.defineProperty(exports, "__esModule", { value: true });
var model = require("../model/Delegate");
var DelegateApi = (function () {
    function DelegateApi(http) {
        this.http = http;
    }
    /**
     * Get delegate by username.
     */
    DelegateApi.prototype.get = function (params) {
        return this.http.get('/delegates/get', params, model.DelegateResponse);
    };
    /**
     * Get delegates list.
     */
    DelegateApi.prototype.list = function (params) {
        return this.http.get('/delegates', params, model.DelegateResponse);
    };
    /**
     * Get voters of delegate.
     */
    DelegateApi.prototype.voters = function (params) {
        /* To find voters directly by model */
        if (params.delegate && params.delegate instanceof model.Delegate) {
            params = { publicKey: params.delegate.publicKey };
        }
        return this.http.get('/delegates/voters', params, model.DelegateVoters);
    };
    /**
     * Get forged data of delegate.
     */
    DelegateApi.prototype.forgedData = function (params) {
        /* To find result directly by model */
        if (params.delegate) {
            params.generatorPublicKey = params.delegate.publicKey;
        }
        if (params.publicKey && !params.generatorPublicKey) {
            params.generatorPublicKey = params.publicKey;
        }
        return this.http.get('/delegates/forging/getForgedByAccount', params, model.ForgedDetails);
    };
    return DelegateApi;
}());
exports.default = DelegateApi;
//# sourceMappingURL=DelegateApi.js.map