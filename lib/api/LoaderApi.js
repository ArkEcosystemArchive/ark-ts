"use strict";
/**
 * @module api
 */
/** Loader related API calls. */
Object.defineProperty(exports, "__esModule", { value: true });
var model = require("../model/Loader");
var LoaderApi = (function () {
    function LoaderApi(http) {
        this.http = http;
    }
    /**
     * Get configuration info of peer
     */
    LoaderApi.prototype.autoConfigure = function (fromPeerUrl) {
        if (fromPeerUrl) {
            return this.http.getNative(fromPeerUrl + "/api/loader/autoconfigure", null, model.LoaderAutoConfigure);
        }
        return this.http.get('/loader/autoconfigure', null, model.LoaderAutoConfigure);
    };
    /**
     * Get status blockchain.
     */
    LoaderApi.prototype.loadingStatus = function () {
        return this.http.get('/loader/status', null, model.LoaderStatus);
    };
    /**
     * Get the synchronisation status of the client.
     */
    LoaderApi.prototype.synchronisationStatus = function (fromPeerUrl) {
        if (fromPeerUrl) {
            return this.http.getNative(fromPeerUrl + "/api/loader/status/sync", null, model.LoaderStatusSync);
        }
        return this.http.get('/loader/status/sync', null, model.LoaderStatusSync);
    };
    return LoaderApi;
}());
exports.default = LoaderApi;
//# sourceMappingURL=LoaderApi.js.map