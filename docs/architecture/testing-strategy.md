# Testing Strategy

This document defines the testing strategy for the project.

Its purpose is to establish consistent testing practices across all architectural layers while ensuring the application remains maintainable, reliable, and easy to evolve.

Testing is considered part of the architecture, not an afterthought.

---

# Goals

The testing strategy aims to:

- Protect business rules from regressions.
- Validate application workflows.
- Ensure infrastructure integrations work correctly.
- Detect defects early.
- Enable safe refactoring.
- Keep tests fast, deterministic, and maintainable.

---

# Testing Pyramid

The project follows the classic Testing Pyramid.

```text
                 E2E Tests
              ----------------
            Integration Tests
         ------------------------
              Unit Tests
----------------------------------------
```

## Principles

- Most tests should be Unit Tests.
- Integration Tests should validate infrastructure boundaries.
- End-to-End Tests should cover only critical user journeys.

Avoid relying excessively on E2E tests to validate business logic.

---

# Unit Tests

Unit tests validate individual pieces of logic in complete isolation.

## Characteristics

- Fast
- Deterministic
- Independent
- No external services
- No database
- No network requests

Unit tests should execute in milliseconds.

---

# Layer Testing Strategy

## Domain Layer

The Domain layer should have the highest test coverage.

### Test

- Entities
- Value Objects
- Domain Services
- Business Rules
- Domain Exceptions

### Never Test With

- Database
- React
- Next.js
- HTTP
- External APIs
- Payment providers

Domain tests should require little or no mocking.

---

## Application Layer

Application tests validate business workflows.

### Test

- Use Cases
- Commands
- Queries
- Application Services
- DTO validation
- Business orchestration

### Mock

- Repository interfaces
- Payment services
- Email services
- Storage services
- External providers

### Never Test With

- Database
- React
- UI components

Application tests verify behavior, not implementation details.

---

## Infrastructure Layer

Infrastructure tests validate integrations with external systems.

### Test

- Repository implementations
- Database queries
- Payment provider adapters
- Email providers
- Storage providers
- External APIs

Infrastructure tests may use:

- Test databases
- Sandbox environments
- Local containers
- Test doubles when appropriate

Avoid testing third-party libraries themselves.

---

## Presentation Layer

Presentation tests validate user interactions.

### Test

- Component rendering
- User interactions
- Forms
- Navigation behavior
- Error states
- Loading states

### Avoid Testing

- Tailwind classes
- CSS implementation details
- Framework internals

Focus on observable behavior.

---

# Integration Tests

Integration tests verify that multiple components collaborate correctly.

Examples include:

- Application → Repository
- Repository → Database
- Payment Service → Payment Provider
- API Route → Application
- Server Action → Use Case

Integration tests should validate boundaries between architectural layers.

---

# End-to-End Tests

End-to-End tests validate complete business workflows.

Typical examples include:

- Browse products
- Add product to cart
- Complete checkout
- Submit payment
- Create order

Only critical business scenarios should have E2E coverage.

Avoid creating E2E tests for every possible user interaction.

---

# Mocking Guidelines

Mock only external dependencies.

Examples:

- Repository interfaces
- Payment services
- Email services
- File storage
- Third-party APIs

Do not mock:

- Domain Entities
- Value Objects
- Business Rules
- Pure functions

Prefer real implementations whenever practical.

---

# Business Rules

Business rules must always be tested.

Every rule introduced into the Domain layer must have corresponding unit tests.

Examples include:

- A checkout cannot proceed with an empty cart.
- Shipping information is required before payment.
- Payment cannot be processed without a valid checkout.
- Product variants must exist before being added to the cart.
- Order totals cannot be negative.

Business rules are the most valuable part of the application and should receive the highest level of protection.

---

# Test Organization

Tests should live close to the code they validate.

Example:

```text
modules/
└── checkout/
    ├── application/
    │   ├── commands/
    │   └── __tests__/
    ├── domain/
    │   ├── services/
    │   └── __tests__/
    └── presentation/
        ├── components/
        └── __tests__/
```

Keeping tests close to the implementation improves discoverability and maintainability.

---

# Code Coverage

Coverage percentage is not the primary objective.

Priority should be given to testing:

- Business rules
- Critical workflows
- Edge cases
- Failure scenarios

High coverage without meaningful assertions provides little value.

---

# Test Principles

Every test should follow these principles:

- Independent
- Deterministic
- Readable
- Fast
- Focused
- Repeatable

A test should verify one behavior at a time.

---

# Test Naming

Test names should describe the expected behavior, not the implementation.

Prefer behavior-oriented names.

Good examples:

- should_create_order_when_payment_is_successful
- should_reject_checkout_when_cart_is_empty
- should_calculate_total_with_discount

Avoid names such as:

- test1
- checkoutTest
- validateCart

A reader should understand what is being verified without reading the test implementation.

# Architectural Principles

The testing strategy follows the same architectural boundaries defined by the project.

Tests must respect dependency rules.

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

Tests must not violate architectural boundaries simply because they are test code.

---

# Long-Term Goal

The testing strategy should allow developers to:

- Refactor with confidence.
- Introduce new features safely.
- Detect regressions early.
- Preserve business rules over time.
- Maintain a scalable and reliable codebase.

# Test Structure

Tests should follow the Arrange – Act – Assert pattern.

## Arrange

Prepare the test data and dependencies.

## Act

Execute the behavior being tested.

## Assert

Verify the expected outcome.

Each test should contain a single Act section whenever possible.

# Test Doubles

Different types of test doubles serve different purposes.

## Mock

Used to verify interactions between components.

Example:

- Verify that a payment service was called.

## Stub

Provides predefined responses without verifying interactions.

Example:

- Return a predefined product list.

## Fake

A lightweight implementation suitable for testing.

Examples:

- In-memory repository
- In-memory payment service

## Spy

Records interactions while preserving normal behavior.

Example:

- Verify how many times a method was called.

Prefer Fakes whenever practical.

Avoid excessive mocking, especially in Domain tests.

# Test Data

Avoid manually creating complex objects in every test.

Prefer reusable:

- Builders
- Fixtures
- Object Mothers (when appropriate)

Example:

ProductBuilder
.withPrice(100)
.withStock(5)
.build()

This keeps tests concise and reduces duplication.

# Test Independence

Tests must be independent from their execution environment.

Avoid depending on:

- Current date
- Current time
- Time zone
- Locale
- Internet connection
- External APIs
- Existing database state

Tests should produce the same result regardless of where or when they are executed.

# Time Management

Business logic must never depend directly on the system clock.

Time should be provided through an abstraction.

Examples:

- Clock
- DateProvider
- TimeProvider

This allows tests to simulate different dates and times without modifying the system clock.

# Integration Tests

Integration tests verify that multiple components collaborate correctly using real integrations whenever practical.

Examples include:

- Application → Repository
- Repository → Database
- Payment Service → Payment Provider Sandbox
- API Route → Application
- Server Action → Use Case

Prefer testing against real infrastructure such as:

- Test databases
- Local containers
- Sandbox environments

Avoid replacing every dependency with mocks, as this no longer validates the integration itself.

# Designing for Testability

Code should be designed to be testable.

Prefer:

- Dependency Injection
- Small classes
- Pure functions
- Explicit dependencies
- Single Responsibility

Avoid:

- Hidden dependencies
- Static state
- Global mutable state
- Tight coupling

Well-designed software is naturally easier to test.
