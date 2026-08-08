# Contributing guide

## Before you start

- Read the architecture documents and the ADRs before making structural changes.
- Keep changes scoped to one concern whenever possible.
- Follow the existing module boundaries and dependency rules.

## Development workflow

1. Create a branch for the change.
2. Implement the smallest change that solves the problem.
3. Add or update tests for the affected behavior.
4. Update documentation when the behavior, workflow, or architecture changes.
5. Run the relevant test suites before opening a pull request.

## Pull request checklist

- The change is aligned with the established architecture.
- Tests cover the main behavior change.
- Documentation is updated when needed.
- The diff is focused and easy to review.

## Documentation expectations

When a change affects the payment flow, module responsibilities, or infrastructure boundaries, the related documentation should be updated as well.

Keep documentation aligned with the current architecture and use the same terminology as the ADRs and architecture guides. If a change introduces a new rule or decision, document it in the appropriate architecture or workflow document.
