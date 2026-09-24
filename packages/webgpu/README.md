# WebGPU

This package contains the WebGPU-specific rendering implementation.

It implements the backend required by the renderer abstraction without moving
WebGPU concerns into framework-agnostic engine layers.

## Responsibilities

- WebGPU device and backend integration.
- WebGPU-specific rendering implementation.
- Backend-specific resource and command handling.

## Dependency Direction

```text
webgpu
   ↓
renderer
   ↓
core
```

## Boundaries

WebGPU:

- may depend on `renderer`
- may depend on `core` where required
- must not depend on Angular
- must not depend on Studio UI
- must not own application-level UI behavior

WebGPU-specific implementation details should remain localized to this
package whenever practical.

## Reuse

The package is reusable by applications that require the WebGPU renderer
without requiring Studio.

## Guidelines

- Keep backend-specific implementation localized.
- Avoid exposing WebGPU details through generic renderer contracts without a
  deliberate reason.
- Keep application and UI concerns outside this package.
- Avoid deep imports into renderer internals.
