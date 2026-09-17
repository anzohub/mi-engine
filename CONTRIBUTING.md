# Contributing to mi-engine

Thank you for your interest in `mi-engine`.

## Project Status & Contribution Policy

`mi-engine` is an early-stage learning project exploring 3D/2D engine design from first principles with TypeScript and WebGPU. Because the core architecture is still actively being formed and rapidly iterated, the roadmap is not currently open to arbitrary external contributions or unsolicited feature additions.

Issues and discussions about architectural concepts, bug reports, and design discussions are welcome.

## Prerequisites & Toolchain

The monorepo uses strictly pinned toolchains:

- **Node.js**: `26.9.0`
- **pnpm**: `12.4.2`
- **Vite+ (`vp`)**: `0.3.2`

Before developing, ensure the correct Node and pnpm versions are active, then install dependencies:

```bash
pnpm install
```

## Validation & Quality Checks

Run the required validation commands to verify your changes:

- **Full lint, format, and type check**:
  ```bash
  vp check
  ```
- **Execute test suites across packages**:
  ```bash
  vp run -r test
  ```
- **Build all workspace packages**:
  ```bash
  vp run -r build
  ```
- **Run all pre-commit checks**:
  ```bash
  vp run ready
  ```

All checks must pass before opening a pull request.

## Commit Message Guidelines

This repository follows [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Introduces a new feature or capability.
- `fix:` Fixes a bug or regression.
- `docs:` Changes to documentation or README files.
- `refactor:` Code restructuring that does not alter external behavior.
- `test:` Adding or updating tests.
- `chore:` Maintenance tasks, dependency updates, and toolchain configurations.

## Architecture & Decisions

- **Current Architecture**: Consult `docs/architecture/package-dependencies.md` for package boundaries and consumption rules.
- **Architectural Decision Records**: Significant structural changes, changes to package boundaries, or introducing new core primitives require an ADR in `adr/` (see `adr/README.md`).
- **Detailed Contributor Guidelines**: See `docs/contributing/README.md` for internal practices.
