# Extensibility and Boundaries

This document describes the extensibility direction supported by the current
repository. It distinguishes implemented mechanisms from architectural rules
that guide future work.

## Current State

The repository currently contains the package boundaries and TypeScript
workspace configuration, but the engine packages expose only minimal version
symbols. There is no implemented plugin registry, persistence schema, frame
pipeline, command model, inspector API, panel API, or authoring-profile API.
Studio is an Angular shell with no engine package integration yet.

Do not document or build a generic extension system until a concrete Studio or
runtime use case requires one.

## Dependency Direction

The dependency direction is the primary extensibility mechanism today:

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
The `renderer` package is the boundary for backend-agnostic contracts, which
are not implemented yet; `webgpu` is reserved for the concrete WebGPU
integration.

Keep imports on public package entry points. Do not introduce deep imports or
cycles to make a feature convenient.

## Feature, Integration, and Extension

- A **feature** is engine or runtime capability, such as animation, physics,
  audio, or a future 2D or 3D capability. It belongs in an existing package
  until a real responsibility and dependency boundary justify a new package.
- An **integration** adapts a concrete technology, format, backend, or platform
  to an engine contract. Its concrete dependencies must stay outside the
  general contract. `webgpu` is the current example.
- A **Studio extension** contributes authoring concerns such as panels, tools,
  inspectors, commands, diagnostics, menus, or context actions. No extension
  registration API exists yet; future work should begin with the smallest
  composition mechanism needed by an actual workflow.
- An **authoring profile** is a composition of features, extensions, and editor
  configuration. It is not a parallel engine or a superclass for a genre.

Authoring profiles compose reusable capabilities and extensions; they do not
own or redefine those capabilities.

A reusable capability must not be owned by a single workflow merely because
that workflow uses it. For example, a future dialogue feature could be shared
by several profiles without making dialogue part of the runtime core.

## Runtime and Editor

Runtime code must remain usable without Studio, Angular, or the DOM. Editor
code may consume runtime public APIs, but runtime must never import editor code.
Commands represent editorial intent and must not replace runtime systems or
mutate runtime state through hidden editor dependencies.

When a capability needs both sides, keep the runtime components, systems, and
resources in the runtime-facing package and keep inspectors, tools, and panels
in editor or Studio-facing code. Connect them through public contracts rather
than importing application internals.

## Adding Future Extensibility

When a concrete use case appears, prefer this order:

1. Implement the capability in the existing package that owns its responsibility.
2. Keep concrete integrations at the edge and depend on existing contracts.
3. Add a small editor composition point for the actual panel, tool, inspector,
   command, or workflow need.
4. Extract a package only when ownership, dependencies, and independent reuse
   are clear.
5. Add an ADR when the change alters package dependencies or a public boundary.

A profile may combine these pieces, but it should not contain all domain logic
or introduce `GenericEngine -> GameEngine` style inheritance.

## Persistence and Compatibility

Persistence APIs and schemas are not implemented yet. When they are added,
unknown extension-owned data should be preserved rather than discarded, and
schema evolution should be explicit. Extension data must not require core to
know every future workflow.

## Boundary Checklist

Before merging a change, verify:

- core has no framework, backend, DOM, or genre dependency;
- runtime works without editor or Studio;
- renderer does not import a concrete backend;
- integrations implement or consume contracts without changing them for one
  workflow;
- editor state and runtime state remain distinct;
- Studio-specific conditions do not become genre branches in engine packages;
- public exports are intentional and deep imports are avoided;
- documentation describes implemented behavior as current and future composition
  as future.
