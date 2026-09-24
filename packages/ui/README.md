# UI

This directory contains the UI packages of mi-engine.

The UI architecture is divided into portable Web Components and
application-specific Studio UI.

## Structure

```text
ui/
├── web-components/
└── studio/
    └── angular/
```

## Portable UI

`web-components/` contains framework-agnostic UI primitives exposed through
standard Web Component APIs.

Examples include:

- Button
- Input
- Dialog
- Popover
- Tooltip
- Tabs
- Combobox
- Number Input
- Color Input

## Studio UI

`studio/` contains UI that is coupled to the Studio product or editor domain.

Examples include:

- Inspector
- Scene Tree
- Asset Browser
- Property Grid
- Dock Layout
- Command Palette
- Node Graph

## Boundary

The portable layer must not depend on Angular.

The Studio layer may depend on Angular and Angular-specific infrastructure.

```text
Studio Application
        ↓
Studio UI Angular
        ↓
UI Web Components
        ↓
Web Platform
```

Complexity alone does not determine which layer a component belongs to.

Domain coupling is the deciding factor:

```text
complex + generic
        ↓
portable UI

complex + Studio/editor-specific
        ↓
Studio UI
```

## Package Boundaries

`packages/ui/` is an organizational grouping.

The leaf packages under this directory remain independently defined through
their own `package.json` files and public APIs.

## Guidelines

- Keep generic UI portable.
- Keep domain-specific UI in Studio UI.
- Prefer Web Platform contracts for portable components.
- Keep framework-specific integrations at framework-specific boundaries.
- Share design tokens across UI layers.
- Do not duplicate generic primitives inside Studio UI.
