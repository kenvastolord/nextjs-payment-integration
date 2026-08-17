import { describe, expect, it } from 'vitest';

import { CustomerSnapshot } from './CustomerSnapshot';

describe('CustomerSnapshot', () => {
  describe('create', () => {
    it('should create a valid customer snapshot', () => {
      const customer = CustomerSnapshot.create(
        ' John ',
        ' Doe ',
        ' JOHN@EXAMPLE.COM ',
        ' customer-1 ',
        ' +34 600 000 000 ',
        ' ACME ',
        ' ES12345678 ',
      );

      expect(customer.getCustomerId()).toBe('customer-1');
      expect(customer.getFirstName()).toBe('John');
      expect(customer.getLastName()).toBe('Doe');
      expect(customer.getEmail()).toBe('john@example.com');
      expect(customer.getPhone()).toBe('+34 600 000 000');
      expect(customer.getCompany()).toBe('ACME');
      expect(customer.getTaxId()).toBe('ES12345678');
    });

    it('should throw when first name is empty', () => {
      expect(() =>
        CustomerSnapshot.create('', 'Doe', 'john@example.com'),
      ).toThrow('First name cannot be empty.');
    });

    it('should throw when last name is empty', () => {
      expect(() =>
        CustomerSnapshot.create('John', '', 'john@example.com'),
      ).toThrow('Last name cannot be empty.');
    });

    it('should throw when email is empty', () => {
      expect(() =>
        CustomerSnapshot.create('John', 'Doe', ''),
      ).toThrow('Email cannot be empty.');
    });
  });

  describe('getFullName', () => {
    it('should return the full name', () => {
      const customer = CustomerSnapshot.create(
        'John',
        'Doe',
        'john@example.com',
      );

      expect(customer.getFullName()).toBe('John Doe');
    });
  });

  describe('equals', () => {
    it('should return true for equal customer snapshots', () => {
      const first = CustomerSnapshot.create(
        'John',
        'Doe',
        'john@example.com',
        'customer-1',
        '+34 600 000 000',
        'ACME',
        'ES12345678',
      );

      const second = CustomerSnapshot.create(
        'John',
        'Doe',
        'john@example.com',
        'customer-1',
        '+34 600 000 000',
        'ACME',
        'ES12345678',
      );

      expect(first.equals(second)).toBe(true);
    });

    it('should return false for different customer snapshots', () => {
      const first = CustomerSnapshot.create(
        'John',
        'Doe',
        'john@example.com',
      );

      const second = CustomerSnapshot.create(
        'Jane',
        'Doe',
        'jane@example.com',
      );

      expect(first.equals(second)).toBe(false);
    });
  });
}
