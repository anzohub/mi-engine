# mi engine

A 3D/2D engine and editor for the modern web, built from first principles
with TypeScript and WebGPU.

> 🚧 **Early development** — actively being built.

---

## Overview

**mi engine** is a 2D/3D graphics engine and editor for the modern web
platform, built with TypeScript and WebGPU.

The project aims to provide a modular foundation for building interactive
2D/3D applications and editor tooling directly in the browser.

The repository is structured as a monorepo powered by Vite+ and pnpm.

## Prerequisites

- **Node**: `26.9.0`
- **pnpm**: `12.4.2`
- A browser with **WebGPU** support enabled

## Installation

From the repository root, install the workspace dependencies:

```bash
pnpm install
```

## Development

The monorepo uses `vp` (Vite+) to run workspace commands:

- **Check that everything is ready**:

  ```bash
  vp run ready
  ```

- **Run the tests**:

  ```bash
  vp run -r test
  ```

- **Build the monorepo**:

  ```bash
  vp run -r build
  ```

- **Start the Studio editor**:

  ```bash
  vp run --filter @mi-engine/studio start
  ```

## Documentation

Project documentation is organized by purpose:

- [Architecture](./docs/architecture/README.md) — living architecture and
  package topology
- [Guides](./docs/guides/README.md) — practical recipes and task guides
- [Handbook](./docs/handbook/README.md) — concepts, workflows, and learning material
- [Reference](./docs/reference/README.md) — public API contracts, schemas, and
  specifications
- [Research](./docs/research/README.md) — technical investigations and benchmarks
- [Architecture Decision Records](./adr/README.md) — recorded architectural
  decisions
- [Design](./design/README.md) — design system, tokens, and visual exports

## Use of AI

AI use is intentionally limited within the project.

AI may be used for boilerplate generation, mechanical or repetitive tasks,
and other low-risk activities where it does not replace architectural
reasoning, design decisions, implementation understanding, or
project-specific expertise.

Architecture, design, implementation, and verification remain my
responsibility as the project owner and developer.

## Project Structure

```text
├── adr/                 # Architecture Decision Records (ADRs)
├── apps/
│   ├── docs/            # Documentation portal boundary (unlinked)
│   ├── playground/      # Graphics & runtime experimentation
│   └── studio/          # Engine studio editor
├── design/
│   ├── exports/         # Visual exports and reference assets
│   └── tokens/          # Design token artifacts
├── docs/
│   ├── architecture/    # Living architecture and package topology
│   ├── contributing/    # Contributor reference documentation
│   ├── guides/          # Practical recipes and task guides
│   ├── handbook/        # Concepts, workflows, and learning material
│   ├── reference/       # Public API contracts, schemas, and specs
│   └── research/        # Technical investigations and benchmarks
├── packages/
│   ├── assets/          # Asset loaders and caching
│   ├── core/            # Core primitives and types
│   ├── editor/          # Editor state and command model
│   ├── renderer/        # Backend-agnostic rendering abstractions
│   ├── runtime/         # World and ECS runtime state
│   └── webgpu/          # WebGPU backend implementation
├── CONTRIBUTING.md      # Contribution policy and guidelines
├── package.json         # Monorepo root configuration
└── pnpm-workspace.yaml
```

## Contributing

Contribution guidelines are available in
[CONTRIBUTING.md](./CONTRIBUTING.md).

Please review the relevant documentation and architecture decisions before
making changes to the project.

## Design

Design-system assets, executable design tokens, and versioned visual exports
are maintained under [`design/`](./design/README.md).

See the [design documentation](./design/README.md) for the design system,
tooling, source-of-truth responsibilities, and artifact conventions.
