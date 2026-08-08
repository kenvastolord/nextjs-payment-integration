# Documentation structure

This document defines the simple, sustainable documentation structure for the project and explains where different kinds of information should live.

## Purpose

The goal is to keep the documentation easy to understand, avoid duplication, and make it clear where contributors should add new content.

## Structure principles

- Keep documentation in English.
- Separate architecture principles from operational guides.
- Use ADRs for architectural decisions.
- Keep workflow and monitoring documents focused on their specific concerns.
- Avoid mixing design rationale with implementation or task backlog content.
- Make the entry point clear for new contributors.

## Documentation categories

### Architecture documents

These describe the architecture, module boundaries, dependency rules, and domain modeling conventions.

Location:
- `docs/architecture/overview.md`
- `docs/architecture/project-structure.md`
- `docs/architecture/dependency-rules.md`
- `docs/architecture/domain-modeling-guidelines.md`
- `docs/architecture/modules.md`
- `docs/architecture/documentation-structure.md`

### Architectural Decision Records (ADRs)

ADRs capture decisions that affect the project structure, module ownership, or core domain behavior.

Location:
- `docs/architecture/adr/*.md`

### Operational and workflow documents

These describe runtime concerns, monitoring, testing, and the actual business workflows.

Location:
- `docs/monitoring.md`
- `docs/test.md`
- `docs/architecture/testing-strategy.md`
- `docs/architecture/glossary.md`

### Contributor and development guides

These explain how to contribute, how to run the project locally, and how to maintain the documentation and tests.

Location:
- `docs/README.md`
- `docs/guides/contributing.md`
- `docs/guides/development-workflow.md`
- `docs/api/README.md`

### Backlog and historical documents

These store non-normative information, historical context, refactor backlog items, and transition notes.

Location:
- `docs/backlog.md`
- `docs/backlog/architecture-refactor-backlog.md`

## What belongs where

### Architecture documents

- System structure and modular boundaries
- Dependency rules and layering
- Domain modeling expectations
- Relationship between code layers and modules
- Where to place new documentation

### ADRs

- Significant decisions with context, options, and consequences
- Provider abstraction decisions
- Workflow decisions
- Module ownership decisions

### Operational documents

- Monitoring and observability guidance
- Testing strategy and validation
- Reconciliation and incident response
- Runtime behavior and business workflow observability

### Guides

- Local development setup
- Contribution workflow
- Testing commands and strategy
- Documentation maintenance rules

### Backlog/history

- Notes from refactor work
- Deferred improvement ideas
- Historical decisions or context that are not part of the current architecture

## Adding new documentation

When adding a new document:

1. Choose the category that best fits the content.
2. Keep the new file short and focused.
3. Link to related documents from the appropriate entry points.
4. Avoid duplicating information already documented elsewhere.
5. If the content describes a decision, consider creating an ADR instead.

## Recommended document flow

1. New contributors start with `docs/README.md`.
2. Read the architecture overview and the documentation structure.
3. Review the relevant ADRs for decisions that affect the area.
4. Use the testing and contributing guides for workflow details.

## Summary

This structure keeps the project documentation simple and maintainable while making it easier to find the source of truth for each kind of content.