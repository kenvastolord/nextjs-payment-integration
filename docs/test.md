# Testing architecture

```text
nextjs-payment-integration
│
├── e2e/
│   ├── checkout/
│   ├── orders/
│   ├── payments/
│   └── products/
│
├── tests/
│   ├── builders/
│   ├── fixtures/
│   ├── fakes/
│   ├── mocks/
│   ├── spies/
│   ├── helpers/
│   ├── factories/
│   ├── setup/
│   └── utils/
│
└── src/
    └── modules/
```

The idea is to keep:

- `tests/` → shared testing infrastructure.
- `e2e/` → Playwright-only end-to-end tests.
- Unit and integration tests close to the code, as defined by the strategy document.
- Tests alongside the code.

Each layer keeps its own tests.

```text
src/
└── modules/
    └── payments/
        ├── domain/
        │   ├── entities/
        │   ├── services/
        │   └── __tests__/
        │
        ├── application/
        │   ├── use-cases/
        │   └── __tests__/
        │
        ├── infrastructure/
        │   ├── gateways/
        │   └── __tests__/
        │
        └── presentation/
            ├── components/
            └── __tests__/
```

# Unit + Integration

- Vitest
- Testing Library
- jsdom
- `@testing-library/user-event`
- `@testing-library/jest-dom`
- MSW (when needed)
- happy-dom

## E2E

```text
e2e/
├── checkout/
├── orders/
├── payments/
├── products/
├── fixtures/
├── helpers/
├── playwright.config.ts
└── global.setup.ts
```

## Framework

- Playwright

## Shared infrastructure

```text
tests/
├── builders/
│   ├── ProductBuilder.ts
│   ├── OrderBuilder.ts
│   ├── PaymentBuilder.ts
│   └── UserBuilder.ts
│
├── fixtures/
│   ├── products.ts
│   ├── orders.ts
│   └── users.ts
│
├── fakes/
│   ├── InMemoryOrderRepository.ts
│   ├── InMemoryProductRepository.ts
│   ├── FakePaymentGateway.ts
│   ├── FakeClock.ts
│   └── FakeIdGenerator.ts
│
├── mocks/
│
├── spies/
│
├── helpers/
│   ├── render.tsx
│   ├── createDependencies.ts
│   └── testApplication.ts
│
├── factories/
│
└── setup/
    ├── setup-unit.ts
    ├── setup-react.ts
    └── setup-e2e.ts
```

## Configuration

- `vitest.unit.config.ts`
- `vitest.integration.config.ts`
- `playwright.config.ts`

- Unit tests run only Domain and Application layers.
- Integration tests include Infrastructure.
- Playwright remains completely independent.

## Scripts

- `test`
- `test:unit`
- `test:integration`
- `test:e2e`
- `test:watch`
- `test:coverage`
- `test:architecture`
- `test:all`
