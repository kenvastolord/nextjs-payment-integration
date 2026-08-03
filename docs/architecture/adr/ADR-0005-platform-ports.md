# Platform Ports for Cross-Cutting Infrastructure Services

## Status

Accepted

---

## Context

The project follows a modular architecture inspired by Domain-Driven Design and Clean Architecture.

Each business module owns its Domain, Application, Infrastructure and Presentation layers.

Examples include:

- Orders
- Payments
- Products
- Users

Business modules already define their own ports, such as:

- OrderRepository
- ProductRepository
- PaymentGateway

These interfaces belong to their respective bounded contexts because they model business capabilities.

However, the application also depends on technical services that do not belong to any business module.

Examples include:

- IdGenerator
- Clock
- PasswordHasher
- TokenGenerator
- EmailSender
- FileStorage
- EventBus

Previously, the architecture did not define where these cross-cutting ports should live.

---

## Decision

The architecture distinguishes two categories of ports.

### Business Ports

Business Ports belong to a single bounded context.

They express business capabilities required by that module.

Examples:

- OrderRepository
- ProductRepository
- PaymentGateway
- UserRepository

Business Ports remain inside the owning module.

Example:

```text
modules/
└── orders/
    └── domain/
        └── repositories/
            └── OrderRepository.ts
```

---

### Platform Ports

Platform Ports represent technical capabilities required by the application but owned by no business module.

Examples:

- IdGenerator
- Clock
- PasswordHasher
- TokenGenerator
- EmailSender
- FileStorage
- EventBus

Platform Ports live under:

```text
src/
└── ports/
```

Example:

```text
src/
└── ports/
    ├── identity/
    │   └── IdGenerator.ts
    ├── time/
    │   └── Clock.ts
    ├── security/
    └── messaging/
```

---

## Infrastructure

Concrete implementations remain inside Infrastructure.

Example:

```text
src/
└── infrastructure/
    ├── identity/
    │   └── UuidV7Generator.ts
    ├── time/
    │   └── SystemClock.ts
    ├── security/
    └── payment/
```

---

## Composition Root

The Composition Root is responsible for connecting Platform Ports with their concrete implementations.

Example:

```text
IdGenerator
        ▲
        │
UuidV7Generator

Clock
        ▲
        │
SystemClock
```

No Application or Domain component may directly depend on Infrastructure implementations.

---

## Consequences

### Benefits

- Clear ownership of every interface.
- Consistent dependency inversion.
- Prevents technical services from leaking into business modules.
- Establishes a reusable convention for future infrastructure services.

### Trade-offs

- Introduces a new architectural namespace (`src/ports`).
- Documentation must clearly distinguish Platform Ports from Business Ports.
