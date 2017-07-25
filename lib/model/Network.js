"use strict";
/**
 * @module model
 */
/** Network model. */
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config");
var NetworkType;
(function (NetworkType) {
    NetworkType[NetworkType["Mainnet"] = 0] = "Mainnet";
    NetworkType[NetworkType["Devnet"] = 1] = "Devnet";
})(NetworkType = exports.NetworkType || (exports.NetworkType = {}));
var Network = (function () {
    function Network() {
        // pass
    }
    /**
     * Get list of all defaults networks.
     */
    Network.getAll = function () {
        var networks = config_1.default.networks;
        var list = [];
        Object.keys(networks).forEach(function (item) {
            var name = networks[item];
            var peers = name.peers, defaultNetwork = __rest(name, ["peers"]); // to remove peers list
            var network = new Network();
            Object.assign(network, defaultNetwork);
            var type = NetworkType[item.charAt(0).toUpperCase() + item.substr(1).toLowerCase()];
            network.type = type;
            list.push(network);
        });
        return list;
    };
    /**
     * Get network from default config file based on type.
     */
    Network.getDefault = function (type) {
        if (type === void 0) { type = NetworkType.Mainnet; }
        var item = NetworkType[type].toLowerCase();
        var networks = config_1.default.networks;
        var name = networks[item];
        var peers = name.peers, defaultNetwork = __rest(name, ["peers"]); // to remove peers list
        var network = new Network();
        Object.assign(network, defaultNetwork);
        network.type = type;
        return network;
    };
    /**
     * Set peer to current network.
     */
    Network.prototype.setPeer = function (peer) {
        this.activePeer = peer;
    };
    /**
     * Get formated peer url.
     */
    Network.prototype.getPeerUrl = function () {
        return "http://" + this.activePeer.ip + ":" + this.activePeer.port;
    };
    return Network;
}());
exports.Network = Network;
//# sourceMappingURL=Network.js.map