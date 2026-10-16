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

## Architecture as Implemented

The current architecture is best described as a **modular TypeScript monorepo
with package-level boundaries and an explicitly directed dependency graph**.
This describes repository structure and declared dependencies; it does not
claim that the planned engine capabilities are already implemented.

The following facts are verifiable in the workspace manifests and source:

- Engine packages have separate manifests and root exports. Current declared
  dependencies point from `runtime`, `renderer`, and `assets` to `core`, from
  `editor` to `core` and `runtime`, and from `webgpu` to `core` and `renderer`.
- The package entry points currently export version symbols.
- The Angular Studio application exists under `apps/studio/angular`. The
  directories under `packages/ui/` are organizational documentation
  boundaries, not currently declared workspace packages with package
  manifests.
- The repository does not currently demonstrate ports and adapters, a domain
  model, a plugin registry, or a general extension mechanism in its package
  implementations.

### Status of Architectural Characteristics

- **Current:** Modular organization through separate workspace packages and
  declared, one-way package dependencies. The dependency graph and package
  exports provide observable structural boundaries.
- **Applied partially:** Separation of framework-specific application code
  from foundational engine packages is reflected in the current manifests and
  the Angular Studio app location. The dependency direction is a useful
  constraint, but the packages expose little functionality today, so it does
  not yet demonstrate a broadly implemented layered or ports-and-adapters
  design.
- **Not established as current architecture:** Hexagonal architecture,
  comprehensive dependency inversion through ports, DDD, and runtime or Studio
  extension systems. They may be evaluated later when concrete requirements
  justify them; they are not descriptions of the implementation today.

Modularity, layering, ports and adapters, and DDD describe different concerns
and can coexist when their responsibilities are explicit. Modularity concerns
boundaries and ownership; layering concerns responsibility and dependency
direction; ports and adapters isolate external interactions; DDD addresses
complex domain models. The current evidence supports the first, documents
constraints relevant to the second, and does not establish the latter two as
implemented patterns.

The detailed declared package edges and the boundary rules they are intended to
preserve are listed in [Package Dependencies](package-dependencies.md). Common
project terminology belongs in the [Glossary](../reference/glossary.md).

## Domain-Driven Design as a Possible Evolution

Domain-Driven Design (DDD) is an approach to understanding and modeling a
complex problem domain in collaboration with domain experts. It can help when
related business or product rules, invariants, complex operations, and
domain-specific language are difficult to express clearly with simpler models.
The current repository does not provide evidence that this level of domain
complexity is present or that DDD has been adopted.

DDD is not a directory layout and does not require every technique in every
module. If actual domain complexity warrants it, selected concepts could be
introduced where useful:

- **Entity:** an object whose identity matters across changes.
- **Value object:** a value described by its attributes rather than its
  identity.
- **Aggregate:** a consistency boundary for related domain objects and rules.
- **Domain service:** domain behavior that does not naturally belong to one
  entity or value object.
- **Use case:** an application-level operation that coordinates work to
  achieve a user or system goal.
- **Repository:** an abstraction for retrieving and persisting domain objects
  without exposing storage details to the domain model.
- **Domain event:** a record that a meaningful domain fact has occurred.

These are possible tools, not a checklist or a proposal to implement them now.
Any adoption should be based on demonstrated complexity such as related rules,
invariants, complex operations, or concepts whose meanings require an explicit
model.

### Evolution Criteria

- Keep architectural boundaries and important dependencies explicit.
- Allow a module's internal structure to evolve without requiring a global
  reorganization.
- Introduce patterns when they solve a demonstrated problem, not to satisfy a
  preferred template.
- Do not let a possible DDD adoption automatically trigger refactoring of the
  rest of the system.
- Use tests to protect relevant behavior and rules, especially where domain
  invariants are introduced.
- Distinguish in documentation between current decisions, recommendations,
  and future possibilities; record durable decisions in ADRs.

Modular boundaries, ports and adapters, and DDD can be combined if each has a
clear role. The aim is to select only the approaches needed by the project's
actual requirements, not to accumulate patterns.

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
