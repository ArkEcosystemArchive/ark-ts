"use strict";
/**
 * @module model
 */
/** Delegate model. */
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
var Delegate = (function () {
    function Delegate() {
        this.address = void 0;
        this.approval = void 0;
        this.missedBlocks = void 0;
        this.producedBlocks = void 0;
        this.productivity = void 0;
        this.publicKey = void 0;
        this.rate = void 0;
        this.username = void 0;
        this.vote = void 0;
    }
    return Delegate;
}());
__decorate([
    json_typescript_mapper_1.JsonProperty('username'),
    __metadata("design:type", String)
], Delegate.prototype, "username", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('address'),
    __metadata("design:type", String)
], Delegate.prototype, "address", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('publicKey'),
    __metadata("design:type", String)
], Delegate.prototype, "publicKey", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('vote'),
    __metadata("design:type", String)
], Delegate.prototype, "vote", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('producedblocks'),
    __metadata("design:type", Number)
], Delegate.prototype, "producedBlocks", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('missedblocks'),
    __metadata("design:type", Number)
], Delegate.prototype, "missedBlocks", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('rate'),
    __metadata("design:type", Number)
], Delegate.prototype, "rate", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('approval'),
    __metadata("design:type", Number)
], Delegate.prototype, "approval", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('productivity'),
    __metadata("design:type", Number)
], Delegate.prototype, "productivity", void 0);
exports.Delegate = Delegate;
var DelegateResponse = (function () {
    function DelegateResponse() {
        this.success = void 0;
        this.delegates = void 0;
        this.delegate = void 0;
        this.totalCount = void 0;
    }
    return DelegateResponse;
}());
__decorate([
    json_typescript_mapper_1.JsonProperty('success'),
    __metadata("design:type", Boolean)
], DelegateResponse.prototype, "success", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty({ clazz: Delegate, name: 'delegates' }),
    __metadata("design:type", Array)
], DelegateResponse.prototype, "delegates", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty({ clazz: Delegate, name: 'delegate' }),
    __metadata("design:type", Delegate)
], DelegateResponse.prototype, "delegate", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('totalCount'),
    __metadata("design:type", Number)
], DelegateResponse.prototype, "totalCount", void 0);
exports.DelegateResponse = DelegateResponse;
var DelegateQueryParams = (function () {
    function DelegateQueryParams() {
        this.username = void 0;
        this.publicKey = void 0;
        this.offset = void 0;
        this.orderBy = void 0;
        this.limit = void 0;
        this.delegate = void 0;
        this.generatorPublicKey = void 0;
    }
    return DelegateQueryParams;
}());
__decorate([
    json_typescript_mapper_1.JsonProperty('username'),
    __metadata("design:type", String)
], DelegateQueryParams.prototype, "username", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('publicKey'),
    __metadata("design:type", String)
], DelegateQueryParams.prototype, "publicKey", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('offset'),
    __metadata("design:type", Number)
], DelegateQueryParams.prototype, "offset", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('orderBy'),
    __metadata("design:type", String)
], DelegateQueryParams.prototype, "orderBy", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('limit'),
    __metadata("design:type", Number)
], DelegateQueryParams.prototype, "limit", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty({ clazz: Delegate, name: 'delegate' }),
    __metadata("design:type", Delegate)
], DelegateQueryParams.prototype, "delegate", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('generatorPublicKey'),
    __metadata("design:type", String)
], DelegateQueryParams.prototype, "generatorPublicKey", void 0);
exports.DelegateQueryParams = DelegateQueryParams;
var AccountVoter = (function () {
    function AccountVoter() {
        this.username = void 0;
        this.address = void 0;
        this.publicKey = void 0;
        this.balance = void 0;
    }
    return AccountVoter;
}());
exports.AccountVoter = AccountVoter;
var DelegateVoters = (function () {
    function DelegateVoters() {
        this.success = void 0;
        this.accounts = void 0;
    }
    return DelegateVoters;
}());
__decorate([
    json_typescript_mapper_1.JsonProperty('success'),
    __metadata("design:type", Boolean)
], DelegateVoters.prototype, "success", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty({ clazz: AccountVoter, name: 'accounts' }),
    __metadata("design:type", Array)
], DelegateVoters.prototype, "accounts", void 0);
exports.DelegateVoters = DelegateVoters;
var ForgedDetails = (function () {
    function ForgedDetails() {
        this.success = void 0;
        this.fees = void 0;
        this.rewards = void 0;
        this.forged = void 0;
    }
    return ForgedDetails;
}());
__decorate([
    json_typescript_mapper_1.JsonProperty('success'),
    __metadata("design:type", Boolean)
], ForgedDetails.prototype, "success", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('fees'),
    __metadata("design:type", String)
], ForgedDetails.prototype, "fees", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('rewards'),
    __metadata("design:type", String)
], ForgedDetails.prototype, "rewards", void 0);
__decorate([
    json_typescript_mapper_1.JsonProperty('forged'),
    __metadata("design:type", String)
], ForgedDetails.prototype, "forged", void 0);
exports.ForgedDetails = ForgedDetails;
//# sourceMappingURL=Delegate.js.map