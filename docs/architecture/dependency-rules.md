# Dependency Rules

This document defines the dependency rules between the different architectural layers of the application.

Its purpose is to maintain a modular, loosely coupled, and technology-independent architecture that is easy to evolve over time.

---

# Dependency Direction

Dependencies must always point toward the center of the domain.

```text
Presentation
      │
      ▼
Application
      │
      ▼
   Domain
      ▲
      │
Infrastructure
```

- Presentation depends on Application.
- Application depends on Domain.
- Infrastructure implements contracts defined by Domain or Application.
- Domain never depends on any other layer.

---

# Dependency Inversion Principle

The architecture follows the Dependency Inversion Principle (DIP).

High-level modules must never depend on low-level modules.

Instead, both depend on abstractions.

```text
Business Logic
        │
        ▼
   Abstraction
        ▲
        │
Implementation
```

As a result:

- Domain defines business contracts.
- Application may define application-specific ports.
- Infrastructure provides implementations.
- Presentation consumes abstractions exposed by the Application layer.

---

# Presentation Layer

## Responsibilities

- Render the user interface.
- Handle user interactions.
- Invoke application use cases.
- Display loading and error states.

## Allowed Dependencies

- Application
- Shared

## Forbidden Dependencies

- Infrastructure
- Persistence implementations
- External provider implementations
- Third-party SDKs
- Direct database access

---

# Application Layer

## Responsibilities

- Orchestrate business workflows.
- Execute use cases.
- Coordinate domain services.
- Apply application-specific rules.
- Transform data between layers.

## Typical Contents

The Application layer may contain:

- Use Cases
- Commands
- Queries
- DTOs
- Mappers
- Application Services
- Ports (when owned by the Application layer)

## Allowed Dependencies

- Domain

## Forbidden Dependencies

- Presentation
- Infrastructure
- Framework-specific APIs
- Persistence implementations
- External provider implementations

Business rules that belong to the Domain layer must never be implemented here.

---

# Domain Layer

## Responsibilities

- Entities
- Value Objects
- Domain Services
- Repository Interfaces
- Service Interfaces
- Business Rules

The Domain layer must remain completely independent of implementation details.

## Forbidden Dependencies

- UI frameworks
- Backend frameworks
- Infrastructure
- External services
- Persistence implementations
- Browser APIs
- Framework-specific state management
- Storage implementations

The Domain layer should be reusable without modifying a single line of code.

---

# Infrastructure Layer

## Responsibilities

- Repository implementations
- Persistence implementations
- External service integrations
- Provider integrations
- Messaging services
- Email services
- File storage

## Allowed Dependencies

- Domain
- Application (when implementing application ports)
- Third-party libraries

Infrastructure must never be accessed directly from the Presentation layer.

---

# Shared Layer

The Shared layer contains reusable, framework-agnostic building blocks that can be safely used across multiple modules.

Examples include:

- Generic UI components
- Generic hooks
- Helpers
- Utilities
- Validators
- Constants

## Rules

Shared must **not** become a dumping ground.

Only code that is reusable across multiple modules belongs here.

Shared must never contain:

- Business logic
- Module-specific code
- Feature-specific hooks
- Repositories
- Use cases
- Domain entities
- Application services

If a piece of code belongs to a single module, it should remain inside that module.

---

# Module Isolation

Each module represents an independent bounded context.

Examples:

- Products
- Cart
- Checkout
- Payments
- Orders

## Rules

- A module must not access another module's infrastructure directly.
- Communication between modules should occur through the Application layer.
- Business modules should never access another module's Domain directly.
- Modules should remain as independent as possible.
- Modules should expose behavior, not implementation details.

---

# Module Dependencies

Business modules collaborate through business concepts rather than implementation details.

The primary business workflow is:

```text
Products
      │
      ▼
Cart
      │
      ▼
Checkout
      │
      ▼
Orders
      │
      ▼
Payments
```

This workflow represents business collaboration.

It does not imply direct implementation dependencies.

## Rules

- Products must remain independent from all other business modules.
- Cart may collaborate with Products.
- Checkout may coordinate Cart and Orders.
- Orders may collaborate with Payments through business abstractions.
- Payments always operate on an existing Order.
- Payments must never communicate directly with Cart.
- Business modules must never access another module's Infrastructure layer.
- Modules expose behavior, never implementation details.

---

# Data Transfer Objects (DTOs)

DTOs belong to the Application layer.

Their purpose is to exchange data between architectural layers without exposing Domain entities.

## Rules

- DTOs are not Domain entities.
- DTOs should not contain business logic.
- Presentation should consume DTOs instead of Domain entities whenever possible.
- Infrastructure should map persistence models into Domain entities before they reach the Application layer.

---

# Mapping Rules

Object transformations should be centralized through dedicated mappers.

Typical flow:

```text
Persistence Model
        │
        ▼
 Domain Entity
        │
        ▼
Application DTO
        │
        ▼
 Presentation Model
```

## Rules

- Avoid scattered object transformations.
- Keep mapping logic inside dedicated mapper classes or functions.
- Business logic must never be implemented inside mappers.

---

# External Providers

Business modules must never depend directly on external providers.

Instead, they should communicate through abstractions defined by the Domain or Application layers.

```text
Business Module
       │
       ▼
Service Interface
       ▲
       │
Provider Implementation
```

Provider implementations belong to the Infrastructure layer.

This approach allows external services to be replaced without affecting business logic.

Examples include:

- Payment providers
- Authentication providers
- Email providers
- Cloud storage providers
- Messaging providers
- Notification providers

---

# Payment Gateway

The application communicates with payment providers through the `PaymentGateway` abstraction.

The PaymentGateway represents a business capability rather than a provider-specific API.

Business modules never communicate directly with external payment providers.

```text
Payments
        │
        ▼
PaymentGateway
        ▲
        │
StripeGateway

PayPalGateway

MercadoPagoGateway
```

Replacing one provider with another should require changes only within the Infrastructure layer and dependency registration.

---

# Provider Model Isolation

Provider-specific models must never leave the Infrastructure layer.

Examples include:

- Checkout Session
- Payment Intent
- Client Secret
- Preference
- Provider Events
- Webhook Payload

These models must be translated into business models before crossing architectural boundaries.

Neither the Domain nor the Application layer should depend on provider-specific terminology.

---

# Exception Handling

Exceptions should be handled according to their architectural layer.

## Domain

- Domain exceptions
- Business rule violations

## Application

- Use case failures
- Validation failures
- Application workflow exceptions

## Infrastructure

- Provider-specific exceptions
- Persistence exceptions
- External service failures

## Presentation

- User-friendly error messages
- HTTP responses
- UI state management

Exceptions should never leak implementation details across layers.

---

# Naming Conventions

To maintain consistency across the project, each architectural element has a well-defined responsibility.

| Element      | Responsibility                                   |
| ------------ | ------------------------------------------------ |
| View         | Represents a complete screen or page composition |
| Component    | Represents a reusable UI block                   |
| Hook         | Encapsulates presentation logic or UI state      |
| Use Case     | Executes a business workflow                     |
| Service      | Coordinates business operations                  |
| Entity       | Represents a business concept                    |
| Value Object | Represents an immutable business value           |
| DTO          | Transfers data between layers                    |
| Mapper       | Converts data between models                     |
| Repository   | Abstracts persistence operations                 |

---

# Import Rules

## Correct

```text
Presentation
    ↓
Application
    ↓
Domain

Infrastructure
    ↓
Application (Ports)
    ↓
Domain
```

## Incorrect

```text
Presentation → Infrastructure

Presentation → Persistence Implementations

Presentation → External Providers

Application → Infrastructure

Application → External Providers

Domain → UI Frameworks

Domain → Backend Frameworks

Domain → Infrastructure

Domain → External Services
```

---

# Business Capability Over Provider Capability

The application models business capabilities instead of provider APIs.

Examples of business capabilities include:

- StartPayment
- CancelPayment
- RefundPayment
- GetPaymentStatus

Examples of provider-specific operations include:

- CreateCheckoutSession
- CreatePaymentIntent
- CreatePreference

Business terminology belongs to the Domain.

Provider terminology belongs to Infrastructure.

---

# Architectural Goal

The architecture should remain independent from specific technologies whenever possible.

Business rules should outlive frameworks, databases, SDKs, and external providers, allowing implementation details to evolve without affecting the core application.

Each layer should evolve independently while minimizing coupling, maximizing maintainability, scalability, testability, and long-term flexibility.
