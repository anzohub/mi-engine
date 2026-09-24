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
  at the application and framework-specific UI boundaries.
- **Portable UI**: Generic UI primitives are exposed through framework-agnostic
  Web Component APIs. Studio-specific UI may use Angular and Angular-specific
  infrastructure without coupling the portable UI layer to Angular.

## Package and UI Structure

The repository separates framework-agnostic engine packages, portable UI, and
Studio-specific UI:

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
    └── studio/
        └── angular/
```

The UI hierarchy is organizational as well as architectural:

- **`ui/web-components/`**: Framework-agnostic UI primitives exposed through
  standard Web Component APIs.
- **`ui/studio/angular/`**: Angular-specific UI coupled to Studio or the editor
  domain.

The application layer remains separate:

```text
apps/
├── docs/
├── playground/
└── studio/
    └── angular/
```

`apps/studio/angular/` owns application composition, while reusable UI belongs
in the corresponding UI packages.

## Topics

- [Package Dependencies](package-dependencies.md): Package topology, consumption
  rules, and boundary constraints.
- [Extensibility and Boundaries](extensibility.md): Current extensibility state,
  dependency direction, and rules for future features and workflows.
