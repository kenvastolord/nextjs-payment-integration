# Architecture overview

This document provides a high-level view of the project's architectural approach and how the main reference documents relate to each other.

## General approach

The project follows a modular architecture inspired by Domain-Driven Design and Clean Architecture.

The core idea is to separate clearly:

- business logic,
- domain rules,
- infrastructure dependencies,
- and external integration decisions.

## Main layers

### Domain

Contains the business concepts, rules, and constraints of the system. It does not depend on frameworks, databases, or external providers.

### Application

Coordinates use cases and orchestrates business flows using domain abstractions.

### Infrastructure

Implements concrete details such as repositories, payment provider integrations, external services, and persistence mechanisms.

### Presentation

Contains the user interface and the interaction with the end user.

## Guiding principles

- Business rules belong to the domain.
- Upper layers should not depend on concrete implementations.
- External integrations should remain isolated in infrastructure.
- Modules should keep clear boundaries of responsibility.

## Related documents

- [adr/ADR-0003-payment-provider-abstraction.md](adr/ADR-0003-payment-provider-abstraction.md): payment abstraction.
- [adr/ADR-0004-payment-workflow.md](adr/ADR-0004-payment-workflow.md): payment workflow.
- [dependency-rules.md](dependency-rules.md): dependency rules.
- [domain-modeling-guidelines.md](domain-modeling-guidelines.md): modeling guidelines.
- [orders.md](orders.md): definition of the Orders module.

## Recommended reading

To understand the overall architecture, start with the ADRs and then review the dependency and modeling rules.
