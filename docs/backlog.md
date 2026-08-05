# ADR-0002 - Domain-Driven Module Organization

## Status

Accepted

## Date

2026-07-24

## Context

As the application grows, organizing the codebase by technical layers (components, hooks, stores, utils, etc.) becomes increasingly difficult to maintain.

This approach typically produces:

- Large shared folders.
- High coupling.
- Low cohesion.
- Difficult navigation.
- Unclear ownership of business logic.

The project requires an organization that reflects the business domain rather than implementation details.

## Decision

The project will organize its source code by business modules.

Each module represents a functional area of the ecommerce application.

Examples:

- Products
- Cart
- Checkout
- Orders
- Payments
- Users
- Authentication

Each module owns its internal structure.

Example:

```
modules/products

├── actions
├── application
├── domain
├── infrastructure
├── presentation
├── schemas
└── types
```

Shared resources that are independent of any business domain will remain under the `shared` directory.

## Dependency Rules

Modules must respect the following dependency direction:

```
Presentation
        ↓
Application
        ↓
Domain
        ↓
Infrastructure
```

The domain layer must never depend on:

- React
- Next.js
- Zustand
- Prisma
- Stripe
- Browser APIs

Business rules should remain framework independent.

## Shared Components

Only generic, reusable components belong in the `shared` directory.

Examples:

- Button
- Input
- Modal
- Navbar
- Footer

Components with business knowledge belong inside their corresponding module.

Examples:

- ProductCard
- ProductFilter
- ProductGallery
- ShippingForm
- PaymentForm

## Consequences

### Positive

- Higher cohesion.
- Lower coupling.
- Easier navigation.
- Better scalability.
- Clear module ownership.
- Independent feature evolution.

### Negative

- Larger directory tree.
- Slightly higher learning curve for new contributors.

## Alternatives Considered

### Layer-Based Organization

Example:

```
components/
hooks/
stores/
utils/
```

Rejected.

Reason:

Business logic becomes scattered across unrelated directories.

### Feature Folders Without Internal Layers

Rejected.

Reason:

Mixes presentation, business logic, and infrastructure within the same directory.

## Future Evolution

The module organization is expected to remain stable even if the backend is extracted into a separate service.

Business logic should be portable without major structural changes.

Future backend services should preserve the same domain boundaries defined by the modules.

## Price Normalization Strategy

### Problem

The application will eventually consume product data from external e-commerce APIs. Different providers may represent prices using different formats:

- Decimal units (`9.99`)
- Minor units (`999`)
- Strings (`"9.99"`)
- Provider-specific formats

Assuming a single representation inside the Orders module would couple the domain to external API contracts.

### Decision

The domain model (`Products`, `Cart`, `Orders`, and `Payments`) will operate exclusively with a single internal price representation.

Price normalization must occur only once at the infrastructure boundary, before external data enters the domain.

### Backlog

- [ ] Define the application's canonical internal price representation.
- [ ] Document the internal price format used across the domain.
- [ ] Implement price normalization inside the Product API adapter/mapper.
- [ ] Ensure all downstream modules receive already normalized prices.
- [ ] Add unit tests covering price normalization from different provider formats.
- [ ] Document the expected contract for future product providers.
