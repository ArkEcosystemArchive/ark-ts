"use strict";
/**
 * @module model
 */
/** Loader model. */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var json_typescript_mapper_1 = require("json-typescript-mapper");
var LoaderStatus = (function () {
    function LoaderStatus() {
        this.success = void 0;
        this.loaded = void 0;
        this.now = void 0;
        this.blocksCount = void 0;
    }
    return LoaderStatus;
}());
__decorate([
    json_typescript_mapper_1.JsonProperty('success'),
    __metadata("design:type", Boolean)
], LoaderStatus.prototype, "success", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('loaded'),
    __metadata("design:type", Boolean)
], LoaderStatus.prototype, "loaded", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('now'),
    __metadata("design:type", Number)
], LoaderStatus.prototype, "now", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('blocksCount'),
    __metadata("design:type", Number)
], LoaderStatus.prototype, "blocksCount", void 0);
exports.LoaderStatus = LoaderStatus;
var LoaderStatusSync = (function () {
    function LoaderStatusSync() {
        this.success = void 0;
        this.syncing = void 0;
        this.blocks = void 0;
        this.height = void 0;
        this.id = void 0;
    }
    return LoaderStatusSync;
}());
__decorate([
    json_typescript_mapper_1.JsonProperty('success'),
    __metadata("design:type", Boolean)
], LoaderStatusSync.prototype, "success", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('syncing'),
    __metadata("design:type", Boolean)
], LoaderStatusSync.prototype, "syncing", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('blocks'),
    __metadata("design:type", Number)
], LoaderStatusSync.prototype, "blocks", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('height'),
    __metadata("design:type", Number)
], LoaderStatusSync.prototype, "height", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('id'),
    __metadata("design:type", String)
], LoaderStatusSync.prototype, "id", void 0);
exports.LoaderStatusSync = LoaderStatusSync;
var LoaderNetworkResponse = (function () {
    function LoaderNetworkResponse() {
        this.nethash = void 0;
        this.token = void 0;
        this.symbol = void 0;
        this.explorer = void 0;
        this.version = void 0;
    }
    return LoaderNetworkResponse;
}());
__decorate([
    json_typescript_mapper_1.JsonProperty('nethash'),
    __metadata("design:type", String)
], LoaderNetworkResponse.prototype, "nethash", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('token'),
    __metadata("design:type", String)
], LoaderNetworkResponse.prototype, "token", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('symbol'),
    __metadata("design:type", String)
], LoaderNetworkResponse.prototype, "symbol", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('explorer'),
    __metadata("design:type", String)
], LoaderNetworkResponse.prototype, "explorer", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('version'),
    __metadata("design:type", String)
], LoaderNetworkResponse.prototype, "version", void 0);
exports.LoaderNetworkResponse = LoaderNetworkResponse;
var LoaderAutoConfigure = (function () {
    function LoaderAutoConfigure() {
        this.success = void 0;
        this.network = void 0;
    }
    return LoaderAutoConfigure;
}());
__decorate([
    json_typescript_mapper_1.JsonProperty('success'),
    __metadata("design:type", Boolean)
], LoaderAutoConfigure.prototype, "success", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty({ clazz: LoaderNetworkResponse, name: 'network' }),
    __metadata("design:type", LoaderNetworkResponse)
], LoaderAutoConfigure.prototype, "network", void 0);
exports.LoaderAutoConfigure = LoaderAutoConfigure;
//# sourceMappingURL=Loader.js.map