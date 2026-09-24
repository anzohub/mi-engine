# Studio UI

This directory contains UI packages specific to the Studio application and
editor experience.

It is intentionally separate from the portable Web Component package.

## Scope

Studio UI contains components whose behavior or structure is tightly coupled
to Studio or the editor domain.

Examples include:

- Inspector
- Scene Tree
- Asset Browser
- Property Grid
- Dock Layout
- Command Palette
- Node Graph
- editor-specific interaction surfaces

## Boundary

Studio UI may depend on:

- editor state
- engine/runtime concepts
- application state
- Angular
- Angular CDK
- portable Web Components

Portable Web Components must never depend on Studio UI.

```text
ui/web-components
        ↑
        │
ui/studio/angular
        ↑
        │
apps/studio/angular
```

## Domain Coupling

A component belongs here when its behavior is coupled to Studio or the editor
domain.

Complexity alone is not a reason to place a component here.

For example:

```text
Complex + generic
    → Web Components

Complex + editor-specific
    → Studio UI
```

## Package Boundaries

`packages/ui/studio/` is an organizational grouping.

Framework-specific Studio UI implementations may exist below it as independent
packages.

## Guidelines

- Keep generic controls in `web-components/`.
- Keep editor-specific behavior in Studio UI.
- Keep domain logic in framework-agnostic packages where practical.
- Reuse portable primitives rather than duplicating generic controls.
- Keep framework-specific behavior inside the relevant implementation.
