export default class Slot {
    static getTime(): number;
    /**
     * Calculates duration between now and provided timestamp
     */
    static getDurationTime(timestamp: number): number;
    /**
     * Get transaction time from timestamp
     */
    static getTransactionTime(timestamp: number): Date;
    static getSlotNumber(epochTime?: number): number;
    static getSlotTime(slot: number): number;
    static getNextSlot(): number;
    static getLastSlot(nextSlot: number): number;
}
