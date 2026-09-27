# Studio Angular

This is the Angular application entry point for Studio.

It is the consuming application that bootstraps, configures, and composes the
Studio UI with the framework-agnostic engine and editor packages.

## Responsibilities

This application layer owns:

- Angular bootstrap
- routing
- top-level dependency injection
- application configuration
- workspace composition
- feature wiring
- application lifecycle
- application-specific UI composition and configuration

This application may also contain UI or features that are specific to this
application and are not part of the reusable Studio UI package.

## Architecture

```text
┌────────────────────────┐
│  Studio Angular App    │
│  apps/studio/angular/  │
└────────────┬───────────┘
             │
       consumes / composes
             │
┌────────────▼───────────┐
│  Studio UI Angular     │
│  packages/ui/studio/   │
│  angular/              │
└────────────┬───────────┘
             │
             │ optional
             ▼
┌────────────────────────┐
│  Shared Angular UI     │
│  packages/ui/shared/   │
│  angular/              │
└────────────┬───────────┘
             │
             ▼
┌────────────────────────┐
│  UI Web Components     │
│  packages/ui/          │
│  web-components/       │
└────────────────────────┘


┌────────────────────────┐
│  Editor / Runtime      │
│  Renderer / Assets     │
└────────────────────────┘
```

The application composes the framework-specific Studio UI with the
framework-agnostic engine, editor, runtime, renderer, and asset packages.

When appropriate, it may also consume genuinely shared UI packages.

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

Shared framework-specific UI may depend on its framework, but must remain
independent from product-specific UI.

The application and Studio UI may depend on framework-agnostic packages, while
those packages must not depend on Angular.

## UI Integration

Generic UI primitives belong in:

```text
packages/ui/web-components/
```

Cross-product framework-specific UI belongs in:

```text
packages/ui/shared/<framework>/
```

Studio-specific reusable Angular components belong in:

```text
packages/ui/studio/angular/
```

The application consumes and composes these packages as required.

```text
apps/studio/angular/
        ↓
ui/studio/angular
        ↓
ui/shared/angular
        ↓
ui/web-components
```

Not every application needs to consume every layer.

Application-specific UI should remain inside the application.

## Application vs Studio UI

The application layer is responsible for deciding:

- which Studio features are enabled;
- how the Studio is bootstrapped;
- how dependencies are configured;
- which routes and application-level providers are used;
- which reusable Studio UI components are composed;
- which shared UI packages are used;
- which application-specific features are included.

The `studio-ui-angular` package is responsible for implementing reusable
Studio-specific UI and interaction behavior.

Shared UI packages are responsible only for UI with a genuine cross-product
ownership boundary.

Application-specific UI remains in the application.

## Guidelines

- Keep bootstrap and application composition here.
- Keep application-specific configuration and feature wiring here.
- Keep reusable Studio UI in `packages/ui/studio/angular/`.
- Use `packages/ui/shared/<framework>/` only for genuinely cross-product UI.
- Keep generic UI primitives in `packages/ui/web-components/`.
- Keep editor and engine logic in framework-agnostic packages.
- Avoid deep imports into package internals.
- Do not move reusable Studio UI into the application when it belongs in the
  Studio UI package.
- Do not move application-specific UI into reusable UI packages merely for
  convenience.
