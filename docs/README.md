# Project documentation

This folder contains the main project documentation and serves as the entry point for developers, reviewers, and new team members.

## Purpose

The documentation is organized around three basic questions:

- What architecture does the project follow?
- What design rules and decisions must be respected?
- How is the payment flow monitored, tested, and evolved?

## Main structure

### Architecture and decisions

- [architecture/adr/ADR-0001-nextjs-fullstack-mvp.md](architecture/adr/ADR-0001-nextjs-fullstack-mvp.md): base architecture decision.
- [architecture/adr/ADR-0003-payment-provider-abstraction.md](architecture/adr/ADR-0003-payment-provider-abstraction.md): payment abstraction and provider isolation.
- [architecture/adr/ADR-0004-payment-workflow.md](architecture/adr/ADR-0004-payment-workflow.md): payment workflow and module responsibilities.
- [architecture/adr/ADR-0005-platform-ports.md](architecture/adr/ADR-0005-platform-ports.md): cross-cutting infrastructure ports.

### Rules and principles

- [architecture/dependency-rules.md](architecture/dependency-rules.md): dependency rules and layering.
- [architecture/domain-modeling-guidelines.md](architecture/domain-modeling-guidelines.md): domain modeling principles.
- [architecture/orders.md](architecture/orders.md): description of the Orders module.
- [architecture/glossary.md](architecture/glossary.md): glossary of terms and domain states.
- [architecture/documentation-structure.md](architecture/documentation-structure.md): documentation structure and category guidance.

### Operations and monitoring

- [monitoring.md](monitoring.md): metrics, alerts, and observability for the payment flow.
- [architecture/testing-strategy.md](architecture/testing-strategy.md): testing strategy and documentation validation.

## General rule

Documentation should remain aligned with the actual architecture of the project. When a decision or rule changes, the related documents should be updated accordingly.

## Documentation maintenance

To keep the documentation useful over time:

- Keep new content in English and follow the existing terminology.
- Prefer the ADRs and architecture docs as the source of truth for architectural decisions.
- Update the relevant document when behavior, workflow, or module responsibility changes.
- Keep links between related documents current and consistent.

## Recommended documents to read first

1. [architecture/adr/ADR-0003-payment-provider-abstraction.md](architecture/adr/ADR-0003-payment-provider-abstraction.md)
2. [architecture/adr/ADR-0004-payment-workflow.md](architecture/adr/ADR-0004-payment-workflow.md)
3. [architecture/dependency-rules.md](architecture/dependency-rules.md)
4. [monitoring.md](monitoring.md)
