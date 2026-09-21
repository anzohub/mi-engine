# Extensibility and Boundaries

This document describes the extensibility direction supported by the current
repository. It consolidates architectural terminology to keep the engine
modular, scalable, and agnostic with respect to graphical dimensions, genres,
and authoring workflows. It distinguishes implemented mechanisms from
architectural rules that guide future work.

## Current State

The repository currently contains the package boundaries and TypeScript
workspace configuration, but the engine packages expose only minimal version
symbols. There is no implemented plugin registry, persistence schema, frame
pipeline, command model, inspector API, panel API, or authoring-profile API.
Studio is an Angular shell with no engine package integration yet.

Do not document or build a generic extension system until a concrete Studio or
runtime use case requires one.

Currently, no infrastructure should be assumed to exist:

- No plugin registry
- No AuthoringProfile API
- No Workspace manager
- No capability registry
- No dynamic extension loader

## Architecture Terminology

To ensure consistency across documentation and implementation, use these
definitions:

### Graphics / Spatial Capability

- 2D, 2.5D, and 3D are graphic and spatial capabilities or domains.
- They are not Authoring Profiles.
- They must not be considered mutually exclusive at the project level.
- A single project can combine 2D and 3D (for example, a 2D user interface
  rendered over a 3D world, or hybrid 2D/3D gameplay).

### Feature

- A reusable functional capability of the engine or runtime.
- Examples include animation, physics, audio, navigation, dialogue, quests, and
  scene queries.
- A feature does not automatically require an independent package; it resides in
  the package that owns its responsibility until boundaries justify extraction.

### Integration

- An adaptation to a concrete technology, file format, backend, or platform.
- Examples include WebGPU, Rapier, glTF, and Web Audio.
- Concrete dependencies must remain isolated at the edge, behind engine
  contracts.

### Studio Extension

- An extension that contributes authoring and editor capabilities.
- Can provide panels, tools, inspectors, commands, diagnostics, menus, context
  actions, or contributions to workspaces.

### Authoring Profile

- A composition of capabilities, features, extensions, and configuration that
  provides a specialized workflow.
- It is not a parallel engine or a distinct engine fork.
- It is not a graphics dimension.
- It is not a class hierarchy or inheritance tree organized by genre (for
  example, `GenericEngine -> GameEngine -> RPGEngine`).
- It does not own or redefine reusable features.

### Workspace

- A context or working surface within Studio (for example, a viewport canvas, a
  node graph, a timeline editor, or an asset inspector).
- A Workspace is not an Authoring Profile.
- A single Authoring Profile can utilize and coordinate multiple Workspaces.

## Conceptual Composition Model

The relationship between authoring workflows and engine subsystems is
compositional:

```text
Authoring Profile
        ↓
     combines
        ↓
Graphics / Spatial Capabilities
+ Features
+ Studio Extensions
+ Workspaces / Configuration
```

Specializations depend on the engine; the engine never depends on a
specialization.

Avoid inverted dependencies such as:

- `core` → RPG (or any specific genre)
- `runtime` → RPG
- `renderer` → RPG
- `runtime` → Studio
- `core` → Angular or the DOM
- `renderer` → concrete WebGPU

All dependencies must follow a strict unidirectional flow toward contracts and
foundational layers.

## Dependency Direction

The package dependency direction is the primary extensibility mechanism today:

```text
Studio or another application
        |
        v
editor -> runtime -> core
renderer -> core
webgpu -> renderer
assets -> core
```

Future applications and integrations will depend on engine contracts. Core and
runtime must not depend on Angular, the DOM, Studio, WebGPU, or a game genre.
The `renderer` package is the boundary for backend-agnostic contracts; `webgpu`
is reserved for the concrete WebGPU integration.

Keep imports on public package entry points. Do not introduce deep imports or
cycles to make a feature convenient.

## Supported Experience Types and Edge Cases

The architecture and documentation do not impose a single global project type or
game-only paradigm. The composition model supports diverse use cases:

- **3D web application**: Spatial viewer, product preview, or interactive
  experience using 3D capability without game mechanics.
- **2D web application**: Interactive dashboard, data canvas, or visual tool.
- **3D game**: Real-time rendering, physics, and gameplay systems.
- **2D game**: Sprite/tile rendering, 2D physics, and planar camera workflows.
- **Hybrid 2D/3D game**: 3D world with 2D gameplay logic, billboard sprites,
  or mixed rendering passes.
- **2.5D workflow**: Isometric projection, fixed-angle perspective, or layered
  depth planes.
- **2D UI over a 3D world**: 2D canvas/overlay render pass composited atop a 3D
  scene without treating 2D and 3D as conflicting engine modes.
- **2D RPG / 3D RPG / Hybrid 2D/3D RPG**: Specialization composing grid/spatial
  capabilities, character movement, dialogue, and inventory features.
- **Visual novel**: Narrative workflow composing dialogue, audio, character
  portraits, and script timeline workspaces without a dedicated engine fork.
- **Non-game interactive applications**: Simulations, creative tools, digital
  twins, and educational graphics.
- **Features reused across multiple Profiles**: Shared features (such as
  dialogue, quests, or state graphs) are reused across different profiles (for
  instance, both an RPG profile and a visual novel profile) without being owned
  by or coupled to either profile.

## Extensibility Policy

When introducing new functionality, follow the established repository policy:

1. **Implement in the owning package**: Place the capability in the existing
   package that owns its architectural responsibility.
2. **Keep integrations at the edge**: Isolate third-party libraries and concrete
   backends behind contracts.
3. **Minimal Studio composition**: Add only the minimal local panel, tool, or
   inspector required for a concrete, verified authoring use case.
4. **Extract packages deliberately**: Create a new package only when there is a
   real boundary, clear ownership, and sufficient independence to justify
   separate versioning and testing.
5. **Add an ADR for architectural changes**: Record an Architecture Decision
   Record in `adr/` whenever a dependency, boundary, or public architectural
   contract changes.

## Monorepo Scaling Guidelines

Domain classifications—such as features, integrations, studio extensions, and
authoring—are architectural concepts, not mandatory directories.

The monorepo maintains its flat package organization:

```text
packages/
├── assets/
├── core/
├── editor/
├── renderer/
├── runtime/
└── webgpu/

apps/
├── docs/
├── playground/
└── studio/
```

Do not create intermediate grouping directories (such as `packages/features/`,
`packages/integrations/`, `packages/studio-extensions/`, or
`packages/authoring/`).

Only in the future, if the number of packages grows substantially and a flat
structure becomes difficult to maintain, physical grouping by domain could be
evaluated. That future physical organization must never become an architectural
dependency.

The governing rule:

> Create boundaries because responsibilities and dependencies require them;
> group packages physically only when repository scale makes that organization
> useful.

## Runtime and Editor Separation

Runtime code must remain usable without Studio, Angular, or the DOM. Editor code
may consume runtime public APIs, but runtime must never import editor code.
Commands represent editorial intent and must not replace runtime systems or
mutate runtime state through hidden editor dependencies.

When a capability needs both sides, keep runtime components, systems, and
resources in the runtime-facing package, and keep inspectors, tools, and panels
in editor or Studio-facing code. Connect them through public contracts rather
than importing application internals.

## Persistence and Compatibility

Persistence APIs and schemas are not implemented yet. When they are added,
unknown extension-owned data should be preserved rather than discarded, and
schema evolution should be explicit. Extension data must not require core to
know every future workflow.

## Boundary Checklist

Before merging a change, verify:

- `core` has no framework, backend, DOM, or genre dependency;
- runtime works without editor or Studio;
- renderer does not import a concrete backend;
- integrations implement or consume contracts without changing them for one
  workflow;
- 2D, 2.5D, and 3D are treated as composable capabilities, not mutually exclusive
  engines or profiles;
- Authoring Profiles are compositions, not engines, dimensions, or genre class
  hierarchies;
- Workspaces represent authoring surfaces and are not confused with Profiles;
- features remain reusable and are not owned by a single profile;
- editor state and runtime state remain distinct;
- Studio-specific conditions do not become genre branches in engine packages;
- public exports are intentional and deep imports are avoided;
- documentation describes implemented behavior as current and future composition
  as future.
