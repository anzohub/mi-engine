# Renderer

This package defines the rendering layer of the engine.

The renderer provides rendering abstractions and coordination without making the
engine depend directly on a specific graphics backend.

## Responsibilities

- Define renderer-facing abstractions.
- Coordinate rendering with engine/runtime systems where required.
- Provide a backend-independent boundary for graphics implementations.

## Dependency Direction

```text
webgpu
   ↓
renderer
   ↓
core
```

Backend-specific implementation belongs in backend packages such as `webgpu`.

## Boundaries

Renderer:

- may depend on `core`
- must not depend on Angular
- must not depend on Studio UI
- must not hard-code WebGPU-specific implementation into backend-independent
  APIs

## Reuse

The renderer boundary should allow alternative rendering backends to be
introduced without forcing application-level code to depend directly on one
backend.

## Guidelines

- Keep renderer contracts backend-agnostic.
- Keep GPU backend details out of generic renderer APIs.
- Avoid leaking backend-specific types unless the API explicitly belongs to
  that backend.
- Keep application and UI concerns outside this package.
