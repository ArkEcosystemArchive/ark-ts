"use strict";
/**
 * @module model
 */
/** Block model. */
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
var Block = (function () {
    function Block() {
        this.version = void 0;
        this.blockSignature = void 0;
        this.confirmations = void 0;
        this.generatorId = void 0;
        this.generatorPublicKey = void 0;
        this.generatorId = void 0;
        this.height = void 0;
        this.id = void 0;
        this.numberOfTransactions = void 0;
        this.payloadHash = void 0;
        this.payloadLength = void 0;
        this.previousBlock = void 0;
        this.reward = void 0;
        this.timestamp = void 0;
        this.totalAmount = void 0;
        this.totalFee = void 0;
        this.totalForged = void 0;
    }
    return Block;
}());
__decorate([
    json_typescript_mapper_1.JsonProperty('id'),
    __metadata("design:type", Number)
], Block.prototype, "id", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('version'),
    __metadata("design:type", Number)
], Block.prototype, "version", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('timestamp'),
    __metadata("design:type", Number)
], Block.prototype, "timestamp", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('height'),
    __metadata("design:type", Number)
], Block.prototype, "height", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('previousBlock'),
    __metadata("design:type", Number)
], Block.prototype, "previousBlock", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('numberOfTransactions'),
    __metadata("design:type", Number)
], Block.prototype, "numberOfTransactions", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('totalAmount'),
    __metadata("design:type", Number)
], Block.prototype, "totalAmount", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('totalFee'),
    __metadata("design:type", Number)
], Block.prototype, "totalFee", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('reward'),
    __metadata("design:type", Number)
], Block.prototype, "reward", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('payloadLength'),
    __metadata("design:type", Number)
], Block.prototype, "payloadLength", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('payloadHash'),
    __metadata("design:type", String)
], Block.prototype, "payloadHash", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('generatorPublicKey'),
    __metadata("design:type", String)
], Block.prototype, "generatorPublicKey", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('generatorId'),
    __metadata("design:type", String)
], Block.prototype, "generatorId", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('blockSignature'),
    __metadata("design:type", String)
], Block.prototype, "blockSignature", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('confirmations'),
    __metadata("design:type", Number)
], Block.prototype, "confirmations", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('totalForged'),
    __metadata("design:type", String)
], Block.prototype, "totalForged", void 0);
exports.Block = Block;
var BlockQueryParams = (function () {
    function BlockQueryParams() {
    }
    return BlockQueryParams;
}());
exports.BlockQueryParams = BlockQueryParams;
var BlockResponse = (function () {
    function BlockResponse() {
        this.success = void 0;
        this.blocks = void 0;
        this.block = void 0;
    }
    return BlockResponse;
}());
__decorate([
    json_typescript_mapper_1.JsonProperty('success'),
    __metadata("design:type", Boolean)
], BlockResponse.prototype, "success", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty({ clazz: Block, name: 'blocks' }),
    __metadata("design:type", Array)
], BlockResponse.prototype, "blocks", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty({ clazz: Block, name: 'block' }),
    __metadata("design:type", Block)
], BlockResponse.prototype, "block", void 0);
exports.BlockResponse = BlockResponse;
var BlockFee = (function () {
    function BlockFee() {
        this.success = void 0;
        this.fee = void 0;
    }
    return BlockFee;
}());
__decorate([
    json_typescript_mapper_1.JsonProperty('success'),
    __metadata("design:type", Boolean)
], BlockFee.prototype, "success", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('fee'),
    __metadata("design:type", Number)
], BlockFee.prototype, "fee", void 0);
exports.BlockFee = BlockFee;
var Fees = (function () {
    function Fees() {
        this.send = void 0;
        this.vote = void 0;
        this.secondsignature = void 0;
        this.delegate = void 0;
        this.multisignature = void 0;
    }
    return Fees;
}());
__decorate([
    json_typescript_mapper_1.JsonProperty('send'),
    __metadata("design:type", Number)
], Fees.prototype, "send", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('vote'),
    __metadata("design:type", Number)
], Fees.prototype, "vote", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('secondsignature'),
    __metadata("design:type", Number)
], Fees.prototype, "secondsignature", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('delegate'),
    __metadata("design:type", Number)
], Fees.prototype, "delegate", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('multisignature'),
    __metadata("design:type", Number)
], Fees.prototype, "multisignature", void 0);
exports.Fees = Fees;
var BlockFees = (function () {
    function BlockFees() {
        this.success = void 0;
        this.fees = void 0;
    }
    return BlockFees;
}());
__decorate([
    json_typescript_mapper_1.JsonProperty('success'),
    __metadata("design:type", Boolean)
], BlockFees.prototype, "success", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty({ clazz: Fees, name: 'fees' }),
    __metadata("design:type", Fees)
], BlockFees.prototype, "fees", void 0);
exports.BlockFees = BlockFees;
var BlockHeight = (function () {
    function BlockHeight() {
        this.success = void 0;
        this.height = void 0;
        this.id = void 0;
    }
    return BlockHeight;
}());
__decorate([
    json_typescript_mapper_1.JsonProperty('success'),
    __metadata("design:type", Boolean)
], BlockHeight.prototype, "success", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('height'),
    __metadata("design:type", Number)
], BlockHeight.prototype, "height", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('id'),
    __metadata("design:type", Number)
], BlockHeight.prototype, "id", void 0);
exports.BlockHeight = BlockHeight;
//# sourceMappingURL=Block.js.map