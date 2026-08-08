# Documentation inventory

This document classifies the current documents in the docs folder by purpose, usage, and update priority.

## 1. Main architecture and decision documents

| Document | Purpose | Priority | Status |
| --- | --- | --- | --- |
| [docs/architecture/adr/ADR-0001-nextjs-fullstack-mvp.md](docs/architecture/adr/ADR-0001-nextjs-fullstack-mvp.md) | Defines the base architecture decision for the project. | High | Complete |
| [docs/architecture/adr/ADR-0003-payment-provider-abstraction.md](docs/architecture/adr/ADR-0003-payment-provider-abstraction.md) | Defines the payment abstraction and its isolation from providers. | High | Complete, but must remain aligned with the adopted terminology. |
| [docs/architecture/adr/ADR-0004-payment-workflow.md](docs/architecture/adr/ADR-0004-payment-workflow.md) | Defines the payment workflow, module responsibilities, and business rules. | High | Complete |
| [docs/architecture/adr/ADR-0005-platform-ports.md](docs/architecture/adr/ADR-0005-platform-ports.md) | Defines the separation between business ports and platform ports. | High | Complete |
| [docs/architecture/dependency-rules.md](docs/architecture/dependency-rules.md) | Establishes dependency and architecture rules. | High | Complete |
| [docs/architecture/domain-modeling-guidelines.md](docs/architecture/domain-modeling-guidelines.md) | Defines domain modeling principles. | High | Complete |
| [docs/architecture/orders.md](docs/architecture/orders.md) | Documents the Orders module, its model, and rules. | High | Complete |
| [docs/architecture/testing-strategy.md](docs/architecture/testing-strategy.md) | Establishes the testing strategy and documentation validation. | Medium | Complete |

## 2. Operational and business documents

| Document | Purpose | Priority | Status |
| --- | --- | --- | --- |
| [docs/monitoring.md](docs/monitoring.md) | Describes metrics, alerts, observability, and monitoring for the payment flow. | High | Requires terminology alignment and review. |
| [docs/backlog.md](docs/backlog.md) | Contains historical material and backlog from previous decisions. | Medium | Needs review to separate backlog from formal decisions. |
| [docs/backlog/architecture-refactor-backlog.md](docs/backlog/architecture-refactor-backlog.md) | Lists refactor tasks and improvements. | Medium | Complementary |
| [docs/test.md](docs/test.md) | Documents testing strategy examples or testing notes. | Medium | May need restructuring to align with [docs/architecture/testing-strategy.md](docs/architecture/testing-strategy.md). |

## 3. Empty or incomplete documents

| Document | Problem | Priority | Recommendation |
| --- | --- | --- | --- |
| [docs/README.md](docs/README.md) | Previously empty. | High | Turn it into an entry guide with links to architecture, ADRs, and monitoring. |
| [docs/architecture/overview.md](docs/architecture/overview.md) | Previously empty. | High | Draft it as an architecture summary and document map. |
| [docs/architecture/project-structure.md](docs/architecture/project-structure.md) | Previously empty. | High | Describe folder structure and its relation to modules and layers. |
| [docs/api/README.md](docs/api/README.md) | Previously empty. | Medium | Draft it as an entry point to the project's API surface. |
| [docs/guides/contributing.md](docs/guides/contributing.md) | Previously empty. | Medium | Add contribution guidance and documentation review flow. |
| [docs/guides/development-workflow.md](docs/guides/development-workflow.md) | Previously empty. | Medium | Add development workflow, testing, and documentation validation guidance. |

## 4. Recommended priorities

### High priority

1. [docs/monitoring.md](docs/monitoring.md)
2. [docs/README.md](docs/README.md)
3. [docs/architecture/overview.md](docs/architecture/overview.md)
4. [docs/architecture/project-structure.md](docs/architecture/project-structure.md)
5. [docs/architecture/adr/ADR-0003-payment-provider-abstraction.md](docs/architecture/adr/ADR-0003-payment-provider-abstraction.md)

### Medium priority

1. [docs/api/README.md](docs/api/README.md)
2. [docs/guides/contributing.md](docs/guides/contributing.md)
3. [docs/guides/development-workflow.md](docs/guides/development-workflow.md)
4. [docs/architecture/testing-strategy.md](docs/architecture/testing-strategy.md)
5. [docs/backlog.md](docs/backlog.md)

### Low priority

1. [docs/test.md](docs/test.md)
2. [docs/backlog/architecture-refactor-backlog.md](docs/backlog/architecture-refactor-backlog.md)

## 5. Consolidation recommendation

- Keep the ADRs as the source of truth for architectural decisions.
- Use [docs/monitoring.md](docs/monitoring.md) as the operational and observability document.
- Keep [docs/architecture/dependency-rules.md](docs/architecture/dependency-rules.md) and [docs/architecture/domain-modeling-guidelines.md](docs/architecture/domain-modeling-guidelines.md) as the base rule documents.
- Use [docs/README.md](docs/README.md) as the main entry point.
- Move historical or backlog material to secondary files or clearly separated sections.
