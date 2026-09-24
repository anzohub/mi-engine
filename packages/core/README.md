# Core

This package contains framework-agnostic foundational types and systems shared
by the rest of the engine.

## Responsibilities

Core owns concepts that are fundamental to the engine and should not require
higher-level application systems.

The package should remain small, stable, and broadly reusable.

## Boundaries

Core:

- must not depend on Angular
- must not depend on Studio
- must not depend on DOM UI infrastructure
- must not depend on a specific rendering backend
- must not contain application-specific editor UI behavior

## Dependency Direction

Core is a foundational dependency.

Higher-level packages may depend on Core, but Core must not depend on them.

```text
runtime ──────┐
renderer ─────┤
assets ───────┼──→ core
editor ───────┘
```

## Reuse

Core should be reusable independently of Studio.

Consumers should depend on its public API rather than internal source paths.

## Guidelines

- Keep foundational contracts small and stable.
- Avoid imports from higher-level packages.
- Do not introduce framework dependencies for convenience.
- Keep public exports intentional.
- Avoid application-specific assumptions.
