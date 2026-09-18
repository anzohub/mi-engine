# mi engine

A 3D/2D engine and editor for the modern web, built from first principles with TypeScript and WebGPU.

> 🚧 **Early development** — actively being built.

---

## Overview

**mi engine** is a 2D/3D graphics engine and editor designed for the modern web platform using TypeScript and WebGPU. The project is structured as a monorepo powered by Vite+ and pnpm.

## Prerequisites

- **Node**: `26.9.0`
- **pnpm**: `12.4.2`
- A browser with **WebGPU** support enabled

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
