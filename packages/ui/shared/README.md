# Shared UI

This directory contains UI packages that are genuinely shared across multiple
mi-engine products.

It is an organizational grouping for cross-product UI and is not itself a
package unless it contains its own package definition.

## Purpose

Use this directory for UI that:

- is consumed by multiple products;
- has no ownership by a single product;
- has a clear cross-product responsibility;
- is specific to a framework when placed under a framework-specific directory.

For example:

```text
shared/
└── angular/
```

may contain Angular UI shared by multiple products.

## Ownership

Shared UI exists to represent a genuine ownership boundary between products.

A component should be placed here only when multiple products have a concrete
need for the same behavior and the component does not conceptually belong to
one of those products.

Shared UI must not be used as a fallback location for:

- components that are merely similar;
- components that may be reused in the future;
- application-specific UI;
- product-specific UI;
- generic framework-independent UI.

## Structure

Shared UI may be organized by framework:

```text
shared/
├── angular/
├── react/
└── <other-framework>/
```

Only frameworks with a real shared UI package should be present.

A framework-specific shared package may contain components and interaction
patterns shared across multiple products using that framework.

For example:

```text
packages/ui/shared/angular/
```

may be consumed by:

```text
apps/studio/angular/
apps/launcher/angular/
```

when both applications have a concrete need for the same shared Angular UI.

## Relationship with Other UI Layers

Shared UI sits between portable UI and product-specific UI.

```text
Portable UI
    ↓
ui/web-components

Shared framework UI
    ↓
ui/shared/<framework>

Product-specific UI
    ↓
ui/<product>/<framework>

Application-specific UI
    ↓
apps/<app>
```

Not every feature needs to pass through the shared layer.

## Portable UI

Generic UI that does not depend on a framework should be placed in:

```text
packages/ui/web-components/
```

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

Shared UI may consume these portable primitives but must not make them
framework-specific.

## Product UI

UI that belongs conceptually to one product should remain under that product.

For example:

```text
packages/ui/studio/angular/
```

contains Studio-specific UI such as:

- Inspector
- Scene Tree
- Asset Browser
- Property Grid
- Dock Layout
- Command Palette
- Node Graph

Even when another product happens to reuse a Studio component, that does not
automatically make it shared UI.

Move a component to `shared/` only when its ownership is genuinely
cross-product.

## Application-Specific UI

UI that is specific to one application should remain in the application:

```text
apps/<app>/
```

Do not move application-specific UI into `shared/` merely to reduce local
duplication.

## When to Create Shared UI

Before adding a component to this directory, verify:

1. At least two products have a concrete need for the same UI.
2. The UI has the same conceptual responsibility in those products.
3. No single product should own the component.
4. The shared API is stable enough to support multiple consumers.
5. Sharing the component reduces duplication without introducing artificial
   coupling.

If these conditions are not met, keep the implementation in the appropriate
product or application.

## Dependency Rules

Shared UI may depend on:

- its framework;
- `ui/web-components`;
- framework-agnostic engine packages when required by its responsibility.

Shared UI must not depend on:

- product-specific UI packages;
- application-specific code;
- Studio-specific state;
- Launcher-specific state;
- framework-specific infrastructure from another framework.

For example:

```text
ui/shared/angular
        ↓
ui/web-components
```

is valid.

But:

```text
ui/shared/angular
        ↓
ui/studio/angular
```

is not allowed.

Likewise:

```text
ui/shared/angular
        ↓
apps/studio/angular
```

is not allowed.

## Package Boundaries

`packages/ui/shared/` is an organizational grouping.

A directory such as:

```text
packages/ui/shared/angular/
```

represents an actual package only when it contains its own package definition,
public API, build configuration, and dependency boundary.

The grouping directory itself is not a package.

## Guidelines

- Use `shared/` only for genuine cross-product UI.
- Keep generic framework-agnostic UI in `ui/web-components`.
- Keep product-specific UI under the corresponding product directory.
- Keep application-specific UI inside the consuming application.
- Do not use `shared/` as a generic `common` directory.
- Do not extract shared UI merely because two components currently look similar.
- Keep shared UI independent from product-specific and application-specific
  code.
- Prefer a clear ownership boundary over premature reuse.
