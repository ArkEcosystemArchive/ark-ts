"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var api = require("./api");
var Http_1 = require("./services/Http");
var Client = (function () {
    function Client(network) {
        var request = new Http_1.default(network);
        this.account = new api.AccountApi(request);
        this.delegate = new api.DelegateApi(request);
        this.peer = new api.PeerApi(request);
        this.loader = new api.LoaderApi(request);
        this.block = new api.BlockApi(request);
        this.transaction = new api.TransactionApi(request);
    }
    return Client;
}());
exports.default = Client;
//# sourceMappingURL=Ark.js.map