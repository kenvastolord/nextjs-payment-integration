import { describe, expect, it } from 'vitest';

import { Money } from './Money';
import { OrderTotals } from './OrderTotals';

describe('OrderTotals', () => {
  it('should create valid order totals', () => {
    const totals = OrderTotals.create({
      subtotal: Money.create(10000, 'USD'),
      shipping: Money.create(1000, 'USD'),
      taxes: Money.create(500, 'USD'),
      discount: Money.create(1500, 'USD'),
      total: Money.create(10000, 'USD'),
    });

    expect(totals.getSubtotal().equals(Money.create(10000, 'USD'))).toBe(true);
    expect(totals.getShipping().equals(Money.create(1000, 'USD'))).toBe(true);
    expect(totals.getTaxes().equals(Money.create(500, 'USD'))).toBe(true);
    expect(totals.getDiscount().equals(Money.create(1500, 'USD'))).toBe(true);
    expect(totals.getTotal().equals(Money.create(10000, 'USD'))).toBe(true);
  });

  it('should throw when totals are inconsistent', () => {
    expect(() =>
      OrderTotals.create({
        subtotal: Money.create(10000, 'USD'),
        shipping: Money.create(1000, 'USD'),
        taxes: Money.create(500, 'USD'),
        discount: Money.create(1500, 'USD'),
        total: Money.create(9999, 'USD'),
      }),
    ).toThrow('Order totals are inconsistent.');
  });

  it('should return true when comparing equal order totals', () => {
    const first = OrderTotals.create({
      subtotal: Money.create(10000, 'USD'),
      shipping: Money.create(1000, 'USD'),
      taxes: Money.create(500, 'USD'),
      discount: Money.create(1500, 'USD'),
      total: Money.create(10000, 'USD'),
    });

    const second = OrderTotals.create({
      subtotal: Money.create(10000, 'USD'),
      shipping: Money.create(1000, 'USD'),
      taxes: Money.create(500, 'USD'),
      discount: Money.create(1500, 'USD'),
      total: Money.create(10000, 'USD'),
    });

    expect(first.equals(second)).toBe(true);
  });

  it('should return false when comparing different order totals', () => {
    const first = OrderTotals.create({
      subtotal: Money.create(10000, 'USD'),
      shipping: Money.create(1000, 'USD'),
      taxes: Money.create(500, 'USD'),
      discount: Money.create(1500, 'USD'),
      total: Money.create(10000, 'USD'),
    });

    const second = OrderTotals.create({
      subtotal: Money.create(10000, 'USD'),
      shipping: Money.create(1000, 'USD'),
      taxes: Money.create(500, 'USD'),
      discount: Money.create(1000, 'USD'),
      total: Money.create(10500, 'USD'),
    });

    expect(first.equals(second)).toBe(false);
  });
});
