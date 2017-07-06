import config from '../config';

export class Slot {

  /*
  * Return time slot difference in secods.
  * This timestamp is added to the transaction.
  */
  static getTime(): number {
    const now = (new Date()).getTime();
    const time = config.blockchain.date.getTime();

    return Math.floor((now - time) / 1000);
  }

  /* Calculates duration between now and provided timestamp */
  static getDurationTime(timestamp: number): number {
    const now = (new Date()).getTime();

    return Math.floor((now - timestamp) / 1000);
  }

  /* GetTransactionTime from timestamp */
  static getTransactionTime(timestamp: number): Date {
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
