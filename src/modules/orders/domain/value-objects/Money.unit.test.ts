import { describe, expect, it } from 'vitest';

import { Money } from './Money';

describe('Money', () => {
  describe('create', () => {
    it('should create a valid money instance', () => {
      const money = Money.create(1999, 'usd');

      expect(money.getMinorAmount()).toBe(1999);
      expect(money.getCurrency()).toBe('USD');
    });

    it('should throw when amount is not an integer', () => {
      expect(() => Money.create(19.99, 'USD')).toThrow(
        'Amount must be an integer representing minor units.',
      );
    });

    it('should throw when amount is negative', () => {
      expect(() => Money.create(-1, 'USD')).toThrow(
        'Amount cannot be negative.',
      );
    });

    it('should throw when currency is empty', () => {
      expect(() => Money.create(100, '')).toThrow(
        'Currency cannot be empty.',
      );
    });

    it('should throw when currency is not a valid ISO 4217 code', () => {
      expect(() => Money.create(100, 'US')).toThrow(
        'Currency must be a valid ISO 4217 code.',
      );
    });
  });

  describe('zero', () => {
    it('should create a zero amount', () => {
      const money = Money.zero('eur');

      expect(money.getMinorAmount()).toBe(0);
      expect(money.getCurrency()).toBe('EUR');
    });
  });

  describe('equals', () => {
    it('should return true for equal money values', () => {
      const first = Money.create(1000, 'USD');
      const second = Money.create(1000, 'USD');

      expect(first.equals(second)).toBe(true);
    });

    it('should return false for different money values', () => {
      const first = Money.create(1000, 'USD');
      const second = Money.create(1500, 'USD');

      expect(first.equals(second)).toBe(false);
    });
  });

  describe('add', () => {
    it('should add two money values with the same currency', () => {
      const result = Money.create(1000, 'USD').add(
        Money.create(500, 'USD'),
      );

      expect(result.getMinorAmount()).toBe(1500);
      expect(result.getCurrency()).toBe('USD');
    });

    it('should throw when adding different currencies', () => {
      expect(() =>
        Money.create(1000, 'USD').add(
          Money.create(500, 'EUR'),
        ),
      ).toThrow('Cannot operate with different currencies.');
    });
  });

  describe('subtract', () => {
    it('should subtract two money values', () => {
      const result = Money.create(1000, 'USD').subtract(
        Money.create(250, 'USD'),
      );

      expect(result.getMinorAmount()).toBe(750);
    });

    it('should throw when result would be negative', () => {
      expect(() =>
        Money.create(100, 'USD').subtract(
          Money.create(200, 'USD'),
        ),
      ).toThrow('Resulting amount cannot be negative.');
    });

    it('should throw when subtracting different currencies', () => {
      expect(() =>
        Money.create(1000, 'USD').subtract(
          Money.create(500, 'EUR'),
        ),
      ).toThrow('Cannot operate with different currencies.');
    });
  });

  describe('multiply', () => {
    it('should multiply the amount', () => {
      const result = Money.create(500, 'USD').multiply(3);

      expect(result.getMinorAmount()).toBe(1500);
    });

    it('should throw when multiplier is not an integer', () => {
      expect(() =>
        Money.create(500, 'USD').multiply(1.5),
      ).toThrow('Multiplier must be an integer.');
    });

    it('should throw when multiplier is less than or equal to zero', () => {
      expect(() =>
        Money.create(500, 'USD').multiply(0),
      ).toThrow('Multiplier must be greater than zero.');
    });
  });

  describe('toDecimal', () => {
    it('should convert minor units to decimal', () => {
      expect(Money.create(1234, 'USD').toDecimal()).toBe(12.34);
    });
  });

  describe('toString', () => {
    it('should return a formatted string', () => {
      expect(Money.create(1234, 'USD').toString()).toBe('12.34 USD');
    });
  });
});
