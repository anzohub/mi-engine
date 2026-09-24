# Studio Angular

This is the Angular application entry point for Studio.

It assembles the framework-agnostic engine and editor packages with the
Angular-specific Studio UI.

## Responsibilities

This application layer owns:

- Angular bootstrap
- routing
- top-level dependency injection
- application configuration
- workspace composition
- feature wiring
- application lifecycle

## Architecture

```text
                    ┌────────────────────────┐
                    │  Studio Angular App    │
                    └────────────┬───────────┘
                                 │
                    ┌────────────▼───────────┐
                    │  Studio UI Angular     │
                    └────────────┬───────────┘
                                 │
                    ┌────────────▼───────────┐
                    │  UI Web Components     │
                    └────────────────────────┘


                    ┌────────────────────────┐
                    │  Editor / Runtime      │
                    │  / Renderer / Assets   │
                    └────────────────────────┘
```

The application composes both the framework-specific UI and the
framework-agnostic engine/editor packages.

## Framework Boundary

Angular belongs at the application and Studio UI layers.

The following packages must remain independent from Angular:

- `core`
- `runtime`
- `renderer`
- `webgpu`
- `assets`
- `editor`
- `ui/web-components`

## UI Integration

Generic UI primitives belong in:

```text
packages/ui/web-components/
```

Studio-specific Angular components belong in:

```text
packages/ui/studio/angular/
```

The application composes both layers as required.

## Guidelines

- Keep bootstrap and application composition here.
- Keep reusable Angular UI in `packages/ui/studio/angular/`.
- Keep generic UI primitives in `packages/ui/web-components/`.
- Keep editor and engine logic in framework-agnostic packages.
- Avoid deep imports into package internals.
- Do not move engine logic into Angular components merely because the current
  interaction is initiated from Angular.
