# Adding a Feature

This guide follows the current repository state. The packages are early
foundations, so a new feature should be implemented in small increments and
should not create a new package or generic plugin layer without a real need.

## 1. Define the Owner

Describe what the feature provides and who consumes it. Use an existing package
when its responsibility matches:

- `core` for framework-independent primitives and shared types;
- `runtime` for worlds, entities, components, systems, scenes, and execution
  state;
- `renderer` for backend-agnostic rendering contracts;
- `webgpu` for the WebGPU implementation of renderer contracts;
- `assets` for loading, caching, and resource management;
- `editor` for reusable editorial state and commands;
- `apps/studio` for Angular composition and the editor experience.

A feature does not automatically require a package. Create one only when it
has a clear owner, an independent dependency boundary, and enough code to
justify separate versioning and testing.

## 2. Choose the Runtime or Editor Side

A runtime feature must work without Studio, Angular, or the DOM. An editor
feature may consume runtime public APIs, but runtime code must never import the
editor or Studio.

If the capability needs both sides, implement the runtime contract first and
add the editor-facing pieces separately. Keep editor state, commands, and
selection state distinct from runtime state.

## 3. Keep Integrations at the Edge

If the feature connects a concrete backend, file format, library, or platform,
keep that adapter in the integration-facing package. Do not add its types to a
general contract unless the abstraction genuinely requires them.

For example, WebGPU-specific objects belong in `webgpu`; renderer contracts must
remain usable by another backend.

## 4. Export Deliberately

Add public symbols to the owning package's `src/index.ts` only when consumers
need them. Use package exports from other packages and avoid deep imports. Check
that the resulting dependency graph remains acyclic and points toward `core`,
not toward an application or workflow.

## 5. Add Studio Composition Only When Needed

Studio currently has no extension registry or authoring-profile API. For a real
editor use case, start with the smallest local composition needed for the panel,
tool, inspector, command, diagnostic, or menu. Extract a reusable editor API
only after a second consumer or a clear boundary demonstrates that it is
needed.

An authoring profile should combine existing capabilities and editor pieces. It
must not become a second engine or encode an entire genre in the Studio shell.

## 6. Validate the Boundary

Run the repository checks after the implementation:

```bash
pnpm check
vp run -r test
vp run -r build
```

For dependency changes, update
[`docs/architecture/package-dependencies.md`](../architecture/package-dependencies.md)
and [`docs/architecture/extensibility.md`](../architecture/extensibility.md).
Create an ADR when the change alters a package boundary or introduces a new
public architectural contract.

Document only behavior that exists. Mark proposed profiles, persistence
schemas, extension APIs, and future capabilities as future until they are
implemented.
