"use strict";
/**
 * @module utils
 */
/** Time to interact with blockchain. */
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config");
var Slot = (function () {
    function Slot() {
    }
    /*
    * Return time slot difference in secods.
    * This timestamp is added to the transaction.
    */
    Slot.getTime = function () {
        var now = (new Date()).getTime();
        var time = config_1.default.blockchain.date.getTime();
        return Math.floor((now - time) / 1000);
    };
    /**
     * Calculates duration between now and provided timestamp
     */
    Slot.getDurationTime = function (timestamp) {
        var now = (new Date()).getTime();
        return Math.floor((now - timestamp) / 1000);
    };
    /**
     * Get transaction time from timestamp
     */
    Slot.getTransactionTime = function (timestamp) {
        var time = Math.floor(config_1.default.blockchain.date.getTime() / 1000) * 1000;
        return new Date(time + timestamp * 1000);
    };
    Slot.getSlotNumber = function (epochTime) {
        if (epochTime === void 0) { epochTime = this.getTime(); }
        return Math.floor(epochTime / config_1.default.blockchain.interval);
    };
    Slot.getSlotTime = function (slot) {
        return slot * config_1.default.blockchain.interval;
    };
    Slot.getNextSlot = function () {
        var slot = this.getSlotNumber();
        return slot + 1;
    };
    Slot.getLastSlot = function (nextSlot) {
        return nextSlot + config_1.default.blockchain.delegates;
    };
    return Slot;
}());
exports.default = Slot;
//# sourceMappingURL=Slot.js.map