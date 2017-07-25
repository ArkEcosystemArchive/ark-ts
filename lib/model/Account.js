"use strict";
/**
 * @module model
 */
/** Account model. */
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
var Delegate_1 = require("./Delegate");
var Account = (function () {
    function Account() {
        this.address = void 0;
        this.unconfirmedBalance = void 0;
        this.balance = void 0;
        this.publicKey = void 0;
        this.unconfirmedSignature = void 0;
        this.secondSignature = void 0;
        this.secondPublicKey = void 0;
        this.multiSignatures = void 0;
        this.uMultiSignatures = void 0;
    }
    return Account;
}());
__decorate([
    json_typescript_mapper_1.JsonProperty('address'),
    __metadata("design:type", String)
], Account.prototype, "address", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('unconfirmedBalance'),
    __metadata("design:type", String)
], Account.prototype, "unconfirmedBalance", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('balance'),
    __metadata("design:type", String)
], Account.prototype, "balance", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('publicKey'),
    __metadata("design:type", String)
], Account.prototype, "publicKey", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('unconfirmedSignature'),
    __metadata("design:type", Number)
], Account.prototype, "unconfirmedSignature", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('secondSignature'),
    __metadata("design:type", Number)
], Account.prototype, "secondSignature", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty({ clazz: Object, name: 'secondSignature' }),
    __metadata("design:type", Object)
], Account.prototype, "secondPublicKey", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty({ clazz: Object, name: 'multiSignatures' }),
    __metadata("design:type", Array)
], Account.prototype, "multiSignatures", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty({ clazz: Object, name: 'u_multisignatures' }),
    __metadata("design:type", Array)
], Account.prototype, "uMultiSignatures", void 0);
exports.Account = Account;
var AccountResponse = (function () {
    function AccountResponse() {
        this.success = void 0;
        this.account = void 0;
        this.publicKey = void 0;
    }
    return AccountResponse;
}());
__decorate([
    json_typescript_mapper_1.JsonProperty('success'),
    __metadata("design:type", Boolean)
], AccountResponse.prototype, "success", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty({ clazz: Account, name: 'account' }),
    __metadata("design:type", Account)
], AccountResponse.prototype, "account", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('publicKey'),
    __metadata("design:type", String)
], AccountResponse.prototype, "publicKey", void 0);
exports.AccountResponse = AccountResponse;
var AccountVotesResponse = (function () {
    function AccountVotesResponse() {
        this.success = void 0;
        this.delegates = void 0;
    }
    return AccountVotesResponse;
}());
__decorate([
    json_typescript_mapper_1.JsonProperty('success'),
    __metadata("design:type", Boolean)
], AccountVotesResponse.prototype, "success", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty({ clazz: Delegate_1.Delegate, name: 'delegates' }),
    __metadata("design:type", Array)
], AccountVotesResponse.prototype, "delegates", void 0);
exports.AccountVotesResponse = AccountVotesResponse;
var AccountQueryParams = (function () {
    function AccountQueryParams() {
    }
    return AccountQueryParams;
}());
exports.AccountQueryParams = AccountQueryParams;
//# sourceMappingURL=Account.js.map