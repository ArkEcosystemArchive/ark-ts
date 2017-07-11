import Slot from '../Slot';

import { expect } from 'chai';

/* tslint:disable:no-unused-expression */

describe('Slot', () => {

  it ('getTime should be number', () => {
    expect(Slot.getTime()).to.satisfy(Number.isInteger);
  });

  it ('getDurationTime should be number', () => {
    expect(Slot.getDurationTime(9711613)).to.satisfy(Number.isInteger);
  });

  it ('getTransactionTime should be date', () => {
    expect(Slot.getTransactionTime(9711613)).to.be.instanceOf(Date);
  });

  it ('getSlotNumber should return number, equal to 1', () => {
    const slot = Slot.getSlotNumber(10);
    expect(slot).to.be.a('number').and.equal(1);
  });

  it ('getSlotTime should return number, equal to 156912', () => {
    const slot = Slot.getSlotTime(19614);
    expect(slot).to.be.a('number').and.equal(156912);
  });

  it ('getNextSlot should return number, is not NaN', () => {
    const slot = Slot.getNextSlot();
    expect(slot).to.be.a('number').and.not.NaN;
  });

  it ('getLastSlot should return number, is not NaN', () => {
    const slot = Slot.getLastSlot(Slot.getNextSlot());
    expect(slot).to.be.a('number').and.not.NaN;
  });

});
