# UI

This directory contains the UI packages of mi-engine.

The UI architecture is divided into portable Web Components, cross-product UI,
and product-specific UI.

## Structure

```text
ui/
├── web-components/
├── shared/
│   └── <framework>/
└── <product>/
    └── <framework>/
```

Not every grouping needs to exist from the beginning.

For example, the current repository may contain:

```text
ui/
├── web-components/
└── studio/
    └── angular/
```

A `shared/` package should only be introduced when a real UI responsibility is
shared by multiple products and does not conceptually belong to any single
product.

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

These components must remain independent from Angular, Studio, and
application-specific behavior.

## Shared UI

`shared/` contains UI that is genuinely shared across multiple products or
applications while remaining specific to a particular framework.

For example:

```text
ui/
└── shared/
    └── angular/
```

This layer should only contain UI that has a clear cross-product ownership
boundary.

It must not become a generic `common` directory or a place for components that
are merely convenient to share.

Create a shared UI package only when:

- more than one product has a concrete need for the same UI;
- the UI does not belong conceptually to a single product;
- the shared ownership boundary is clear;
- extracting the UI reduces duplication without creating artificial coupling.

A shared UI package may depend on portable Web Components and its framework,
but it must not depend on product-specific UI packages.

## Product UI

Product-specific UI belongs under the corresponding product directory.

The current Studio UI implementation is:

```text
ui/
└── studio/
    └── angular/
```

`studio/angular/` contains UI that is specific to the Studio product or editor
domain.

A product UI package may be reused by multiple applications that represent or
integrate that product. Reuse does not make it cross-product UI.

Examples include:

- Inspector
- Scene Tree
- Asset Browser
- Property Grid
- Dock Layout
- Command Palette
- Node Graph

For example:

```text
complex + Studio/editor-specific
        ↓
ui/studio/angular/
```

A hypothetical future product-specific UI package could follow the same
structure (this is not an existing product directory):

```text
ui/
└── launcher/
    └── angular/
```

## Application-Specific UI

UI that exists only because of a particular application should remain in the
consuming application.

For example, a hypothetical application-specific directory (not present in
the current repository) could be:

```text
apps/
└── launcher/
    └── angular/
```

may contain UI that is specific to that application and not intended to be
shared with other applications.

Use the following decision order:

```text
Is the UI framework-agnostic and generic?
        ↓
ui/web-components/

Is it shared by multiple products but framework-specific?
        ↓
ui/shared/<framework>/

Is it specific to one product?
        ↓
ui/<product>/<framework>/

Is it specific to one application?
        ↓
apps/<app>/
```

## Boundary

The portable layer must not depend on Angular or Studio.

Shared UI may depend on its framework and portable UI primitives, but must not
depend on product-specific UI packages.

Product-specific UI may depend on its framework, shared UI packages, portable UI
primitives, and the framework-agnostic packages required by its responsibility.

Applications may consume any appropriate reusable UI package, but reusable UI
should not be moved into an application merely because that application is
currently the first consumer.

The dependency direction is:

```text
Application
      ↓
Product UI
      ↓
Shared UI
      ↓
Portable UI
      ↓
Web Platform
```

Not every application or product needs every layer.

Complexity alone does not determine which layer a component belongs to.

Domain ownership and reuse boundary are the deciding factors.

## Package Boundaries

`packages/ui/` is an organizational grouping.

The leaf directories under this grouping are independently defined packages
with their own `package.json`, public APIs, build configuration, and dependency
boundaries.

Grouping directories such as:

```text
packages/ui/
packages/ui/shared/
packages/ui/studio/
packages/ui/<product>/
```

do not themselves represent packages unless they contain their own package
definitions.

For example:

```text
packages/ui/web-components/
    → portable UI package

packages/ui/studio/angular/
    → reusable Angular Studio UI package
```

## Guidelines

- Keep generic UI portable.
- Create shared UI only when multiple products have a real common ownership
  boundary.
- Keep product-specific UI under its product boundary.
- Keep application-specific UI in the consuming application.
- Prefer Web Platform contracts for portable components.
- Keep framework-specific integrations at framework-specific boundaries.
- Share design tokens across UI layers.
- Do not use `shared/` as a generic `common` directory.
- Do not duplicate generic primitives inside product UI.
- Keep editor and engine domain logic outside UI packages where practical.
