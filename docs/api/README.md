# API documentation

This project is primarily a Next.js application with its public surface exposed through application routes and module-level contracts rather than a standalone API server.

## Current scope

- Application routes under the app directory
- Module-level application use cases and repository abstractions
- Infrastructure adapters and provider integrations

## Conventions

- Keep API-facing contracts in the application or ports layers rather than in UI components.
- Prefer explicit request and response types.
- Validate inputs close to the boundary where data enters the system.
- Document provider-specific behavior in the relevant module or architecture document.

## Related documentation

- [../architecture/overview.md](../architecture/overview.md)
- [../architecture/adr/ADR-0004-payment-workflow.md](../architecture/adr/ADR-0004-payment-workflow.md)
- [../monitoring.md](../monitoring.md)
