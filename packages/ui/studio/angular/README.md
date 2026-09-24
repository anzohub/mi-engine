# Studio UI for Angular

This package contains the Angular-specific UI implementation used by Studio.

It is the framework-specific presentation and interaction layer between the
framework-agnostic engine/editor packages and the Angular application.

## Responsibilities

Typical responsibilities include:

- Studio-specific components
- editor-facing views
- Angular composition
- Angular Forms integration
- Angular CDK integration
- application-specific accessibility behavior
- Angular Signals and state integration where appropriate

Examples include:

- Inspector
- Scene Tree
- Asset Browser
- Property Grid
- Dock Layout
- Command Palette
- Node Graph

## Dependencies

This package may consume:

- `editor`
- `runtime`
- `renderer`
- `assets`
- `ui/web-components`

It may also depend on Angular and Angular CDK because it belongs to the
framework-specific application layer.

The concrete package names and dependency versions are defined by the package's
`package.json`.

## Relationship with Web Components

Generic UI primitives should preferably come from the portable Web Component
package.

Studio UI composes those primitives with application and editor behavior.

```text
Angular Studio App
        ↓
Studio UI Angular
        ↓
UI Web Components
```

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

Angular code should treat the custom element as a component boundary rather
than assuming that Angular DOM queries can freely access its internal DOM.

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

This package may depend on Angular-specific infrastructure.

The reverse is not allowed:

```text
ui/web-components
        ✕
        → Angular
```

Likewise, engine packages such as `core`, `runtime`, and `editor` must not
depend on this package.

## Guidelines

- Keep Studio-specific composition here.
- Prefer portable primitives for generic controls.
- Keep editor domain logic outside Angular components where practical.
- Use Angular CDK where it provides application-level interaction utilities.
- Use adapters for deep framework integration.
- Do not leak Angular APIs into the portable UI contract.
- Do not make Web Components depend on Angular for convenience.
