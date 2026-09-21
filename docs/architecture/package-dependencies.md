# Package Dependencies

This document describes the current dependency structure and architectural
boundaries of the `mi-engine` packages.

An arrow `A → B` means that `A` depends on `B`.

## Package Dependency Graph

The graph below shows only package-to-package dependencies. Application
relationships are described separately because they represent higher-level
consumption rather than the complete set of direct `package.json` dependencies.

```mermaid
%%{init: {
  "flowchart": {
    "curve": "linear",
    "nodeSpacing": 50,
    "rankSpacing": 60
  }
}}%%

flowchart TB
    WebGPU["@mi-engine/webgpu"]
    Renderer["@mi-engine/renderer"]
    Editor["@mi-engine/editor"]
    Assets["@mi-engine/assets"]
    Runtime["@mi-engine/runtime"]
    Core["@mi-engine/core"]

    WebGPU --> Renderer
    WebGPU --> Core

    Editor --> Runtime
    Editor --> Core
    Renderer --> Core

    Assets --> Core

    Runtime --> Core
```

## Dependency Rules

- `runtime` depends on `core`.
- `renderer` depends on `core`.
- `assets` depends on `core`.
- `webgpu` depends on `renderer` and `core`.
- `editor` depends on `core` and `runtime`.
- The package source is currently a minimal version surface. Runtime, renderer,
  asset, and editor capabilities will be added behind these existing package
  boundaries as their implementation becomes real.
- `renderer` must not depend on `webgpu`.
- `core` and `runtime` remain independent of Angular, the DOM, and concrete
  rendering implementations.
- Cross-package imports must use public package exports.
- Deep imports into another package's internal source are not allowed.
- Cyclic package dependencies are not allowed.

## Application Relationships

### Studio

`apps/studio` is the Angular application shell. It does not currently declare a
dependency on engine packages or compose an editor workflow. When that
integration is added, it must consume public package exports and keep Angular
and Studio-specific code at the application boundary.

Engine packages must not depend on Angular or on Studio internals.

### Playground

`apps/playground` is reserved for runtime, rendering, experiments, and smoke
testing. Its current entry point is only a placeholder. It must consume public
engine packages and must not depend on Studio internals.
