"use strict";
/**
 * @module api
 */
/** Peer related API calls. */
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/observable/empty");
require("rxjs/add/operator/catch");
var Observable_1 = require("rxjs/Observable");
var model = require("../model");
var LoaderApi_1 = require("./LoaderApi");
var config_1 = require("../config");
var PeerApi = (function () {
    function PeerApi(http) {
        this.http = http;
    }
    /**
     * Get peer by ip and port.
     */
    PeerApi.prototype.get = function (ip, port) {
        var params = { ip: ip, port: port };
        return this.http.get('/peers/get', params, model.PeerResponse);
    };
    /**
     * Get peers list by parameters.
     */
    PeerApi.prototype.list = function (params) {
        return this.http.get('/peers', params, model.PeerResponse);
    };
    /**
     * Find good peer ordered by synchronized blocks.
     */
    PeerApi.prototype.findGoodPeer = function () {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            var networkType = model.NetworkType[_this.http.network.type].toLowerCase();
            var peersList = config_1.default.networks[networkType].peers;
            var blockList = [];
            var loader = new LoaderApi_1.default(_this.http);
            peersList.forEach(function (element, index) {
                loader
                    .synchronisationStatus("http://" + element)
                    .subscribe(function (status) {
                    blockList.push([element, status.blocks]);
                    // when find a good peer or at the end
                    if (status.blocks === 0 || peersList.length - 1 === index) {
                        blockList.sort(function (a, b) { return a[1] < b[1] ? 1 : -1; }); // sort by better to the worst
                        var host = blockList[0][0].split(':');
                        var peer = new model.Peer;
                        peer.ip = host[0];
                        peer.port = host[1];
                        observer.next(peer);
                        observer.complete();
                    }
                }, function (e) { return Observable_1.Observable.empty(); });
            });
        });
    };
    return PeerApi;
}());
exports.default = PeerApi;
//# sourceMappingURL=PeerApi.js.map