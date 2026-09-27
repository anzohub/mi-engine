# Architecture Documentation

This directory documents the current architecture, subsystem design, and
structural boundaries of `mi-engine`.

## Current State vs. Architecture Decisions

Documentation in this directory reflects the operational topology and
constraints of the codebase as it exists today:

- **`docs/architecture/`**: Living descriptions of packages, interfaces, and
  structural boundaries.
- **`adr/`**: Immutable records of durable architectural decisions, capturing
  context, alternatives, and trade-offs at specific points in time.

Update documents here as the architecture evolves. If a significant
architectural pivot or design choice is made, record the rationale in an ADR
rather than rewriting historical records.

## Architectural Principles

- **Graphics / Spatial Capabilities**: 2D, 2.5D, and 3D are composable
  spatial domains, not mutually exclusive engines or profiles. Projects can
  combine 2D and 3D freely.
- **Extensibility through Composition**: Authoring Profiles compose Graphics /
  Spatial Capabilities, Features, Studio Extensions, and
  Workspaces/Configuration. Specializations depend on the engine; the engine
  never depends on a specialization.
- **Workspaces and Profiles**: Workspaces provide focused working surfaces
  within Studio (such as a viewport canvas, timeline, or node graph); an
  Authoring Profile coordinates the workflow and can utilize multiple
  Workspaces.
- **Package Boundaries and Scaling**: Packages are independently bounded by
  their responsibilities, public APIs, and dependency constraints. Packages
  may be grouped physically by architectural family when that improves
  repository organization, without making the grouping directory a package
  itself.
- **Framework Independence**: Foundational engine and editor packages remain
  independent from application frameworks. Framework-specific concerns belong
  at framework-specific UI or application boundaries.
- **Portable UI**: Generic UI primitives are exposed through framework-agnostic
  Web Component APIs and remain independent from application frameworks and
  product-specific UI.
- **Shared UI**: UI that is genuinely shared across multiple products may be
  placed in a framework-specific shared UI package. Shared UI must have clear
  cross-product ownership and must not become a generic `common` layer.
- **Product UI**: UI that belongs to a specific product, such as Studio, may be
  implemented in a product-specific framework package and reused by multiple
  applications for that product.
- **Application UI**: UI that is specific to one application remains in the
  consuming application rather than being added to a reusable UI package.

## Package and UI Structure

The repository separates framework-agnostic engine packages, portable UI,
cross-product UI, and product-specific UI:

```text
packages/
├── assets/
├── core/
├── editor/
├── renderer/
├── runtime/
├── webgpu/
└── ui/
    ├── web-components/
    ├── shared/
    │   └── <framework>/
    └── <product>/
        └── <framework>/
```

For the current repository, the concrete UI structure is:

```text
packages/ui/
├── web-components/
└── studio/
    └── angular/
```

A `shared/` package should only be introduced when a real cross-product UI
responsibility exists.

The UI hierarchy is organizational as well as architectural:

- **`ui/web-components/`**: Framework-agnostic UI primitives exposed through
  standard Web Component APIs.
- **`ui/shared/<framework>/`**: Framework-specific UI genuinely shared by
  multiple products.
- **`ui/<product>/<framework>/`**: Framework-specific UI coupled to a specific
  product or product domain.

Grouping directories such as `ui/`, `ui/shared/`, and `ui/<product>/` do not
themselves represent packages unless they contain their own package
definitions.

The application layer remains separate:

```text
apps/
├── docs/
├── playground/
├── studio/
│   └── angular/
└── web/
```

Applications consume reusable packages and provide application-level bootstrap,
configuration, composition, and lifecycle.

For example:

```text
apps/studio/angular/
        ↓
ui/studio/angular/
        ↓
ui/web-components/
```

Application-specific UI remains in the consuming application.

Stable user-facing demonstrations are maintained separately under:

```text
examples/
├── engine/
├── web-components/
└── angular/
```

Examples consume public package APIs but do not own reusable engine or UI
functionality.

## Topics

- [Package Dependencies](package-dependencies.md): Package topology, consumption
  rules, and boundary constraints.
- [Extensibility and Boundaries](extensibility.md): Current extensibility state,
  dependency direction, and rules for future features and workflows.
