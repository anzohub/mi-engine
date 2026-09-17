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
├── apps/
│   ├── studio/          # Engine studio editor
│   └── playground/      # Graphics & runtime experimentation
├── packages/
│   ├── core/            # Core primitives and types
│   ├── runtime/         # World and ECS runtime state
│   ├── renderer/        # Backend-agnostic rendering abstractions
│   ├── webgpu/          # WebGPU backend implementation
│   ├── assets/          # Asset loaders and caching
│   └── editor/          # Editor state and command model
├── package.json         # Monorepo root configuration
└── pnpm-workspace.yaml
```
