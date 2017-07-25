"use strict";
/**
 * @module services
 */
/** Http calls from peer url. */
Object.defineProperty(exports, "__esModule", { value: true });
var rx_http_request_1 = require("@akanass/rx-http-request");
require("rxjs/add/operator/map");
var json_typescript_mapper_1 = require("json-typescript-mapper");
/**
 * Convert property from interface to JSON
 */
function formatParams(params) {
    if (!params) {
        return;
    }
    var options = JSON.parse(JSON.stringify(params));
    return { qs: options };
}
/**
 * Convert JSON response to specific interface.
 */
function formatResponse(response, responseType) {
    try {
        var result = void 0;
        var body = typeof response.body === 'string' ? JSON.parse(response.body) : response.body;
        result = json_typescript_mapper_1.deserialize(responseType, body);
        return result;
    }
    catch (e) {
        throw new Error(response.body);
    }
}
var Http = (function () {
    function Http(network) {
        this.network = network;
        this.baseRequest = rx_http_request_1.RxHR.defaults({
            baseUrl: network.getPeerUrl(),
            headers: {
                nethash: network.nethash,
                port: network.activePeer.port,
                version: network.version,
            },
            json: true,
        });
    }
    Http.prototype.getNative = function (url, params, responseType) {
        if (params === void 0) { params = {}; }
        return rx_http_request_1.RxHR.get(url, formatParams(params))
            .map(function (data) { return formatResponse(data, responseType); });
    };
    Http.prototype.get = function (url, params, responseType) {
        if (params === void 0) { params = {}; }
        return this.baseRequest.get("/api" + url, formatParams(params))
            .map(function (data) { return formatResponse(data, responseType); });
    };
    Http.prototype.post = function (url, body, responseType) {
        var options = {
            body: body,
            json: true,
        };
        return this.baseRequest.post(url, options)
            .map(function (data) { return formatResponse(data, responseType); });
    };
    Http.prototype.put = function (url, data) {
        var options = {
            json: data,
        };
        return this.baseRequest.put(url, options);
    };
    return Http;
}());
exports.default = Http;
//# sourceMappingURL=Http.js.map