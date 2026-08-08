# Project and documentation structure

This document describes the general organization of the project and the relationship between the documentation and the code structure.

## General project structure

The project structure is organized to reflect the modular architecture.

- `src/app`: presentation layer and application routes.
- `src/modules`: main business modules such as products, cart, checkout, payments, and orders.
- `src/infrastructure`: concrete infrastructure implementations.
- `src/ports`: cross-cutting ports and abstractions.
- `src/shared`: reusable components, utilities, and helpers.

## Relationship with documentation

- Architecture documentation describes the business rules and structural decisions.
- The code structure should reflect those decisions.
- Documentation should act as a design reference; the code should remain aligned with it.

## Organization principles

- Each business module should have a clear responsibility.
- Infrastructure implementations should not be mixed with domain logic.
- Abstractions should live in the correct layer or module.
- Architecture documents should be updated when the system structure changes.

## Related documents

- [overview.md](overview.md): architecture overview.
- [dependency-rules.md](dependency-rules.md): dependency rules.
- [orders.md](orders.md): Orders module.
- [adr/ADR-0003-payment-provider-abstraction.md](adr/ADR-0003-payment-provider-abstraction.md): payment abstraction.
