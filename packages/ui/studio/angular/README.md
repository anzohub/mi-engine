# Studio UI for Angular

This package contains the Angular-specific UI implementation used by Studio.

It is a reusable Angular Studio UI package consumed by Studio applications and
Studio-related Angular integrations.

## Package Role

This package is a reusable Angular library/package for the Studio product.

It is **not** an Angular application and does not own:

- Angular bootstrap
- application startup
- application routing
- application-level providers
- environment configuration
- application-specific feature wiring

Those responsibilities belong to the consuming application, for example:

```text
apps/studio/angular/
```

The package owns the reusable implementation of the Studio UI itself.

It should not become a shared UI package for unrelated products.

## Responsibilities

Typical responsibilities include:

- Studio-specific components
- editor-facing views
- Angular composition
- Angular Forms integration
- Angular CDK integration
- application-level accessibility behavior
- Angular Signals and state integration where appropriate

Examples include:

- Inspector
- Scene Tree
- Asset Browser
- Property Grid
- Dock Layout
- Command Palette
- Node Graph

These components may contain non-trivial presentation and interaction logic,
but editor domain rules and engine functionality should remain in their owning
framework-agnostic packages.

## Dependencies

This package may consume:

- `editor`
- `runtime`
- `renderer`
- `assets`
- `ui/web-components`
- `ui/shared/angular` when a real shared Angular UI boundary exists

It may depend on Angular and Angular CDK because it is the framework-specific
Studio UI package.

It must not depend on application-specific packages.

The concrete package name and dependency versions are defined by the package's
`package.json`.

## Relationship with the Angular Application

The Angular application consumes this package and is responsible for
bootstrapping and configuring the application.

```text
Angular Studio App
        ↓
Studio UI Angular
        ↓
Shared Angular UI (when applicable)
        ↓
UI Web Components
```

Conceptually:

```text
apps/studio/angular/
        │
        │ consumes
        ▼
@mi-engine/ui-studio-angular
        │
        ├───────────────► @mi-engine/ui-shared-angular
        │
        └───────────────► @mi-engine/ui-web-components
```

The application decides how the Studio UI is configured, bootstrapped, and
composed for that specific application.

This package provides the reusable implementation of the Studio UI.

## Relationship with Web Components

Generic UI primitives should preferably come from the portable Web Component
package.

Studio UI composes those primitives with Studio and editor behavior.

For example:

```text
Studio Inspector
      ↓
Property Field
      ↓
<mi-number-input>
```

The Angular components should consume Web Components through their public
custom-element contract and should not depend on their internal implementation.

## Relationship with Shared UI

Shared Angular UI may be consumed when a UI responsibility is genuinely common
to multiple products.

Shared UI is not a fallback location for Studio-specific components.

For example:

```text
ui/shared/angular/
    → cross-product Angular UI

ui/studio/angular/
    → Studio-specific Angular UI
```

A Studio component should remain in this package when its meaning and ownership
are specific to Studio, even if another application happens to reuse it.

## Angular CDK

Angular CDK remains available in this layer.

It may be used for concerns such as:

- overlays
- drag and drop
- focus management
- accessibility
- interaction utilities

Portable Web Components must not take a dependency on Angular CDK merely to
support these Angular use cases.

When CDK interacts with a Web Component, the preferred boundary is the custom
element host.

## Angular Forms

When a portable Web Component must participate deeply in Angular Forms, use an
Angular adapter or directive implementing the appropriate Angular forms
integration.

For example, a `ControlValueAccessor` can bridge a Web Component API with
Angular Forms without coupling the portable component itself to Angular.

## Shadow DOM

Web Components may encapsulate their internals with Shadow DOM.

Angular code should treat the custom element as a component boundary rather than
assuming that Angular DOM queries can freely access its internal DOM.

Focus, keyboard interaction, and intrinsic accessibility behavior should remain
inside the Web Component when they belong to that component.

Angular/CDK should handle application-level composition around the component.

## Events

Consume Web Component events through their DOM event contract.

Events crossing Shadow DOM boundaries should use appropriate composed and
bubbling semantics.

Do not rely on Lit-specific event implementation details.

## Theming

Studio Angular UI should consume the shared design token system and CSS custom
properties.

Portable Web Components should not require Angular theme providers.

Theming should remain compatible with the portable UI boundary.

## Boundaries

This package may depend on Angular-specific infrastructure and
framework-agnostic engine/editor packages required by its responsibilities.

The reverse is not allowed:

```text
ui/web-components
        ✕
        → Angular

ui/shared/angular
        ✕
        → ui/studio/angular
```

Likewise, engine packages such as `core`, `runtime`, and `editor` must not
depend on this package.

The consuming application may depend on this package:

```text
apps/studio/angular
        ↓
ui/studio/angular
```

but this package must not depend on application-specific code.

## Guidelines

- Keep Studio-specific UI implementation here.
- Keep application-specific UI in the consuming application.
- Use shared Angular UI only for genuine cross-product responsibilities.
- Prefer portable primitives for generic controls.
- Keep editor domain logic outside Angular components where practical.
- Use Angular CDK where it provides application-level interaction utilities.
- Use adapters for deep framework integration.
- Do not leak Angular APIs into the portable UI contract.
- Do not make Web Components depend on Angular for convenience.
- Do not move application bootstrap or application-specific configuration here.
- Do not add application-specific behavior to this package unless it is intended
  to be part of the reusable Studio UI.
- Do not use this package as a generic Angular component library.
