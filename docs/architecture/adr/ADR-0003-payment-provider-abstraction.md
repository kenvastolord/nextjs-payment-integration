# ADR-0003 - Payment Provider Abstraction

## Status

Accepted

## Date

2026-07-24

## Context

The ecommerce application will initially integrate Stripe as its payment gateway.

Although Stripe is the first provider, the business domain should not be coupled to any third-party payment SDK.

Future business requirements may require supporting additional providers such as:

- PayPal
- Adyen
- Mercado Pago
- Redsys
- Mollie

Changing or adding providers should not require modifications to the application's business logic.

## Decision

The application will define its own payment abstraction through a `PaymentService` interface.

Business use cases will depend only on this abstraction.

Concrete payment providers will be implemented inside the Infrastructure layer.

Example dependency flow:

```
Presentation
        │
        ▼
Application
        │
        ▼
PaymentService
        │
        ▼
Infrastructure
        ├── StripePaymentService
        ├── PayPalPaymentService
        ├── RedsysPaymentService
        └── ...
```

The Application and Domain layers must never import or use provider SDKs directly.

## Dependency Rules

Allowed:

```
Checkout Use Case
        │
        ▼
PaymentService
```

Not allowed:

```
Checkout Use Case
        │
        ▼
Stripe SDK
```

Provider-specific code must remain isolated within the Infrastructure layer.

## Responsibilities

### Domain

Knows only business concepts such as:

- Payment
- Payment Status
- Payment Result

The domain has no knowledge of external payment providers.

### Application

Coordinates payment execution through the `PaymentService` abstraction.

It does not know which provider is being used.

### Infrastructure

Implements the communication with external payment providers.

Examples:

- Stripe SDK
- PayPal SDK
- Redsys API

Only this layer may depend on third-party payment libraries.

## Consequences

### Positive

- Low coupling.
- Provider independence.
- Easier testing.
- Better maintainability.
- Future providers can be added with minimal impact.
- Business logic remains framework and vendor agnostic.

### Negative

- Requires an abstraction layer.
- Slightly more implementation effort during the initial development.

## Alternatives Considered

### Direct Stripe Integration

Example:

```
Checkout Use Case
        │
        ▼
Stripe SDK
```

Rejected.

Reason:

The business logic would become tightly coupled to Stripe, making provider replacement difficult.

### Provider-Specific Business Logic

Rejected.

Reason:

Business rules should not depend on external services or SDKs.

## Future Evolution

Additional providers should only require:

- A new Infrastructure implementation.
- Dependency registration.
- Configuration changes.

No modifications should be necessary in the Domain or Application layers.

The goal is for the application to understand only one concept:

**"Process a payment."**

How that payment is executed is an implementation detail of the Infrastructure layer.
