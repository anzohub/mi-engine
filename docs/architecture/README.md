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
  within Studio (such as a viewport canvas, timeline, or node graph); an Authoring
  Profile coordinates the workflow and can utilize multiple Workspaces.
- **Boundaries and Scaling**: Packages maintain a flat structure in `packages/*`.
  Create boundaries because responsibilities and dependencies require them;
  group packages physically only when repository scale makes that organization
  useful.

## Topics

- [Package Dependencies](package-dependencies.md): Package topology, consumption
  rules, and boundary constraints.
- [Extensibility and Boundaries](extensibility.md): Current extensibility state,
  dependency direction, and rules for future features and workflows.
