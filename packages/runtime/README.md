# Runtime

This package contains the runtime layer of the engine.

Runtime builds on foundational engine concepts while remaining independent from
the Studio application and its UI framework.

## Responsibilities

Runtime owns runtime-oriented engine behavior that sits above `core` and below
application-specific authoring systems.

Its responsibilities should remain focused on execution rather than
application presentation.

## Dependency Direction

```text
editor
   ↓
runtime
   ↓
core
```

Runtime may expose systems consumed by applications and authoring tools.

## Boundaries

Runtime:

- may depend on `core`
- must not depend on Angular
- must not depend on Studio UI
- must not contain editor-only UI concerns
- must not depend on an application framework

## Reuse

Runtime should be usable by applications other than Studio.

Application composition belongs to the application layer rather than runtime.

## Guidelines

- Keep runtime APIs framework-agnostic.
- Avoid importing editor or Studio UI code into runtime.
- Keep presentation concerns outside this package.
- Keep rendering backend concerns behind renderer abstractions.
