/**
 * @module utils
 */
/** Time to interact with blockchain. */

import config from '../config';

export default class Slot {

  /*
  * Return time slot difference in secods.
  * This timestamp is added to the transaction.
  */
  public static getTime(): number {
    const now = (new Date()).getTime();
    const time = config.blockchain.date.getTime();

    return Math.floor((now - time) / 1000);
  }

  /**
   * Calculates duration between now and provided timestamp
   */
  public static getDurationTime(timestamp: number): number {
    const now = (new Date()).getTime();

    return Math.floor((now - timestamp) / 1000);
  }

  /**
   * Get transaction time from timestamp
   */
  public static getTransactionTime(timestamp: number): Date {
    const time = config.blockchain.date.getTime() + timestamp;

    return new Date(time);
  }

  static getSlotNumber(epochTime: number = this.getTime()): number {
    return Math.floor(epochTime / config.blockchain.interval);
  }

  static getSlotTime(slot: number): number {
    return slot * config.blockchain.interval;
  }

  static getNextSlot(): number {
    const slot = this.getSlotNumber();

    return slot + 1;
  }

  static getLastSlot(nextSlot: number): number {
    return nextSlot + config.blockchain.delegates;
  }

}
