# Development workflow

## Local setup

```bash
pnpm install
pnpm dev
```

The application will be available at http://localhost:3000.

## Typical development loop

1. Start the development server.
2. Make focused changes in the relevant module.
3. Run unit and integration tests for the affected area.
4. Update the relevant documentation if the change modifies behavior or architecture.

## Common commands

```bash
pnpm dev
pnpm build
pnpm lint
pnpm test:unit
pnpm test:integration
pnpm test:e2e
```

## Documentation and architecture changes

If a change affects the payment workflow, domain model, or infrastructure boundaries, update:

- the relevant ADR,
- the module documentation,
- and the operational docs when monitoring or behavior changes are involved.
