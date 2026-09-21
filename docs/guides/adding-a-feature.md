# Adding a Feature

This guide follows the current repository state. The packages are early
foundations, so a new feature should be implemented in small increments and
must not create a new package or generic plugin layer without a real need.

## 1. Choose the Owner and Justify Boundaries

Describe what the feature provides and who consumes it. Choose an existing
package whose architectural responsibility matches the capability:

- `core`: framework-independent primitives, math, utilities, and shared types;
- `runtime`: world state, entity-component-system (ECS), scenes, and execution
  lifecycle;
- `renderer`: backend-agnostic rendering abstractions and contracts;
- `webgpu`: concrete WebGPU rendering backend implementing renderer contracts;
- `assets`: asset loading, decoding, caching, and resource management;
- `editor`: reusable headless editor state, selection models, and commands;
- `apps/studio`: Angular UI shell, layout composition, and authoring
  experience.

### When to Justify a New Package

A feature does not automatically require an independent package. Extract or
create a new package only when all of the following criteria are met:

1. **Clear Boundary**: The capability has a well-defined architectural
   boundary and does not belong conceptually in an existing package.
2. **Real Ownership**: The responsibility is self-contained with minimal,
   unidirectional dependencies.
3. **Sufficient Independence**: There is enough code, distinct lifecycle, or
   reuse across multiple consumers to justify separate versioning and testing.

Apply the scaling rule:

> Create boundaries because responsibilities and dependencies require them;
> group packages physically only when repository scale makes that organization
> useful.

## 2. Keep Runtime and Editor Separated

A runtime feature must operate without Studio, Angular, or the DOM. An editor
feature may consume runtime public APIs, but runtime code must never import
editor or Studio code.

If a capability spans both runtime and authoring:

- Implement the runtime contract and systems first in the appropriate engine
  package.
- Add editor-facing pieces separately in `editor` or `apps/studio`.
- Keep editor state, commands, and selection models strictly decoupled from
  runtime world state.

## 3. Isolate Integrations at the Edge

An integration adapts a concrete technology, file format, backend, or external
platform (such as WebGPU, Rapier, glTF, or Web Audio) to an engine contract.

- Keep concrete third-party dependencies and driver-specific code at the edge in
  an integration-facing leaf package.
- Do not expose vendor-specific types in general engine contracts unless the
  abstraction genuinely demands them.
- For example, WebGPU-specific types belong strictly in `webgpu`; `renderer`
  contracts must remain usable by alternative backends.

## 4. Export Deliberately and Avoid Deep Imports

Add public symbols to the owning package's `src/index.ts` only when consumers
require them.

- Consume packages exclusively via their top-level public package exports.
- Deep imports into another package's internal file paths are strictly
  prohibited.
- Verify that the resulting dependency graph remains acyclic and points
  in one direction toward contracts and foundational layers, never toward a
  higher-level specialization, workflow, or genre.

## 5. Add Minimal Studio Composition Only When Needed

Studio currently has no extension registry, workspace manager, capability
registry, or dynamic extension loader.

When adding authoring capabilities:

- **Studio Extensions**: Contribute authoring concerns such as panels, tools,
  inspectors, commands, diagnostics, menus, context actions, or contributions to
  workspaces. Start with the minimal local composition required for the real
  workflow.
- **Authoring Profiles**: An Authoring Profile composes Graphics / Spatial
  Capabilities, Features, Studio Extensions, and Workspaces/Configuration. It is
  not a parallel engine, a graphics dimension, or a genre class hierarchy. It
  must not own or redefine reusable features.
- **Workspaces**: A Workspace is a context or working surface in Studio (such as
  a scene viewport, timeline, or graph canvas). It is distinct from a Profile; a
  single Profile can utilize multiple Workspaces.
- Extract a reusable editor abstraction only after a second concrete consumer
  or proven boundary demonstrates the need.

## 6. Validate the Boundary and Record Architectural Decisions

Run the repository validation checks after implementation:

```bash
pnpm check
vp run -r test
vp run -r build
```

### When to Add an ADR

Record an Architecture Decision Record (ADR) in `adr/` (following
`adr/README.md`) whenever a change:

- Alters existing package boundaries or introduces a new package;
- Changes dependency relationships between packages or applications;
- Introduces or modifies a public architectural contract.

Update [`docs/architecture/package-dependencies.md`](../architecture/package-dependencies.md)
and [`docs/architecture/extensibility.md`](../architecture/extensibility.md)
to reflect verified boundaries. Document only implemented behavior as current,
and mark proposed profiles or future capabilities as future.
