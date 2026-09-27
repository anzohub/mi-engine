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
- `ui/web-components`: framework-agnostic UI primitives exposed through standard
  Web Component APIs;
- `ui/shared/<framework>`: genuinely cross-product framework-specific UI;
- `ui/<product>/<framework>`: reusable UI coupled to a specific product or
  product domain;
- `apps/studio/angular`: Angular application shell, composition, routing,
  bootstrap, and top-level application concerns;
- `apps/web`: public-facing project portal and product-facing application
  composition.

`apps/playground` and `examples/` are not feature owners. The playground is an
application-level environment for experimentation, smoke testing, and technical
validation. `examples/` contains stable, user-facing demonstrations that
consume existing public package APIs.

Do not place reusable engine or UI functionality directly inside an application,
the playground, or an example merely because it is currently the first
consumer.

## When to Justify a New Package

A feature does not automatically require an independent package. Extract or
create a new package only when all of the following criteria are met:

1. **Clear Boundary**: The capability has a well-defined architectural
   boundary and does not belong conceptually in an existing package.
2. **Real Ownership**: The responsibility is self-contained with minimal,
   unidirectional dependencies.
3. **Sufficient Independence**: There is enough code, distinct lifecycle, or
   reuse across multiple consumers to justify separate testing, versioning, or
   reuse.

Apply the scaling rule:

> Create boundaries because responsibilities and dependencies require them;
> group packages physically when that organization provides meaningful
> repository structure without creating artificial dependencies.

## 2. Decide Whether the Feature Is Runtime, Editor, or UI

Features that affect runtime behavior and features that provide authoring
experience should be separated.

A useful first distinction is:

```text
Runtime behavior
    ↓
runtime / renderer / assets / core

Authoring behavior
    ↓
editor

Portable generic UI
    ↓
ui/web-components

Cross-product framework UI
    ↓
ui/shared/<framework>

Product-specific UI
    ↓
ui/<product>/<framework>

Application composition
    ↓
apps/<app>

Development validation
    ↓
apps/playground

Stable demonstrations
    ↓
examples/
```

A feature may span more than one layer, but each part should remain in the
package that owns its responsibility.

The playground and examples are consumers of those packages, not architectural
owners of the underlying functionality.

The public Web application is also an application-level consumer. It should
compose reusable packages rather than absorb reusable engine or UI
responsibilities.

## 3. Keep Runtime and Editor Separated

A runtime feature must operate without Studio, Angular, or the DOM. An editor
feature may consume runtime public APIs, but runtime code must never import
editor or Studio code.

If a capability spans both runtime and authoring:

- Implement the runtime contract and systems first in the appropriate engine
  package.
- Add editor-facing state, selection, commands, tools, or inspectors separately
  in `editor`.
- Add Studio-specific presentation in `ui/studio/angular`.
- Keep application wiring in `apps/studio/angular`.
- Keep editor state, commands, and selection models strictly decoupled from
  runtime world state.

For validation, use `apps/playground` when a focused executable experiment or
smoke test is useful.

For a stable user-facing demonstration, create or promote a focused example
under `examples/`.

An example should consume the public APIs of the owning packages rather than
reimplementing their functionality.

For example, an editor inspector should present and manipulate public editor
or runtime contracts rather than moving engine state into an Angular component.

The public Web application should not become a shortcut for placing reusable
engine behavior outside its owning package.

## 4. Decide Whether UI Is Portable, Shared, Product-Specific, or

Application-Specific

When a feature requires UI, determine its ownership boundary.

### Portable UI

Use `ui/web-components` when the component can be understood and reused without
Studio, a product domain, or a framework-specific contract.

Examples include generic controls such as:

- buttons
- inputs
- dialogs
- popovers
- tooltips
- tabs
- comboboxes
- numeric inputs
- color inputs

The public contract should use Web Component APIs rather than Angular-specific
APIs.

Lit may be used as the implementation layer, but it must not become the public
contract.

### Shared Framework UI

Use `ui/shared/<framework>` only when the component or interaction is genuinely
shared across multiple products.

Examples might include a shared product shell, account control, or common
navigation pattern used by multiple products.

Do not create shared UI merely because two components currently look similar.

The shared package must not depend on product-specific packages.

### Product UI

Use `ui/<product>/<framework>` when the component is coupled to a specific
product or product domain but may be reused by multiple applications for that
product.

Examples for Studio include:

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
    → ui/studio/angular
```

Complexity alone does not determine the layer.

### Application UI

Use `apps/<app>` when the component or behavior is specific to one application
and is not intended to be reused as part of a product UI package.

For example:

```text
application-specific
    → apps/launcher/angular/
```

Do not move application-specific UI into `ui/shared` or a product UI package
merely because reuse might be possible later.

The decision hierarchy is:

```text
generic + framework-agnostic
    → ui/web-components

shared across products + framework-specific
    → ui/shared/<framework>

specific to one product
    → ui/<product>/<framework>

specific to one application
    → apps/<app>
```

## 5. Integrate Framework-Specific Concerns at the Edge

An integration adapts a concrete technology, file format, backend, or external
platform (such as WebGPU, Rapier, glTF, or Web Audio) to an engine contract.

- Keep concrete third-party dependencies and driver-specific code at the edge in
  an integration-facing leaf package.
- Do not expose vendor-specific types in general engine contracts unless the
  abstraction genuinely demands them.
- For example, WebGPU-specific types belong strictly in `webgpu`; `renderer`
  contracts must remain usable by alternative backends.

The same principle applies to UI frameworks.

- Angular dependencies belong in Angular-specific UI packages or Angular
  applications.
- Portable Web Components must not depend on Angular or Angular CDK.
- Angular Forms integration should be implemented through an Angular adapter
  when required.
- Angular CDK may be used by Studio UI or shared Angular UI without becoming a
  dependency of the portable component package.
- Shadow DOM boundaries should be treated as explicit integration boundaries.
- Public Web Component events must use their DOM event contract rather than
  framework-specific event APIs.

The detailed Web Component integration rules belong in the corresponding UI
package README files.

The same application-boundary rule applies to `apps/web`: its framework and
product composition choices must not leak into framework-agnostic engine
packages.

## 6. Export Deliberately and Avoid Deep Imports

Add public symbols to the owning package's public entry point only when
consumers require them.

- Consume packages exclusively via their top-level public package exports.
- Deep imports into another package's internal file paths are strictly
  prohibited.
- Verify that the resulting dependency graph remains acyclic and points
  toward contracts and foundational layers, never toward a higher-level
  specialization, workflow, or genre.

For Web Components, treat the following as part of the public contract:

- element names
- public properties
- public attributes
- events and payload shapes
- slot names
- CSS custom properties

Implementation details such as internal Lit structure should not be exposed as
package API without a deliberate reason.

## 7. Add Minimal Studio Composition Only When Needed

Studio currently has no extension registry, workspace manager, capability
registry, or dynamic extension loader.

When adding authoring capabilities:

- **Studio Extensions**: Contribute authoring concerns such as panels, tools,
  inspectors, commands, diagnostics, menus, context actions, or contributions
  to workspaces. Start with the minimal local composition required for the real
  workflow.
- **Authoring Profiles**: An Authoring Profile composes Graphics / Spatial
  Capabilities, Features, Studio Extensions, and Workspaces/Configuration. It is
  not a parallel engine, a graphics dimension, or a genre class hierarchy. It
  must not own or redefine reusable features.
- **Workspaces**: A Workspace is a context or working surface in Studio (such as
  a scene viewport, timeline, or graph canvas). It is distinct from a Profile;
  a single Profile can utilize multiple Workspaces.
- **Studio UI**: Put reusable Studio-specific presentation in
  `ui/studio/angular`, not directly in `apps/studio/angular`.
- **Shared UI**: Use `ui/shared/<framework>` only for genuinely cross-product
  UI with clear ownership. Do not use it as a generic `common` package.
- **Application Composition**: Use `apps/studio/angular` for bootstrap, routing,
  providers, configuration, and feature wiring.
- **Public Web**: Use `apps/web` for public product-facing presentation and
  application composition. Keep reusable functionality in packages.
- **Playground**: Use `apps/playground` for focused experiments, smoke tests,
  and technical validation. Do not use it as the owner of reusable
  functionality.
- **Examples**: When a validated capability has a stable, meaningful
  user-facing demonstration, place that demonstration in `examples/`. Do not
  duplicate the same demonstration in the playground.
- Extract a reusable editor abstraction only after a second concrete consumer
  or proven boundary demonstrates the need.

## 8. Validate the Boundary and Record Architectural Decisions

Run the repository validation checks after implementation:

```bash
pnpm check
vp run -r test
vp run -r build
```

Use the playground for focused executable validation when appropriate, and
promote stable user-facing demonstrations to `examples/`.

### When to Add an ADR

Record an Architecture Decision Record (ADR) in `adr/` (following
`adr/README.md`) whenever a change:

- Alters existing package boundaries or introduces a new package;
- Changes dependency relationships between packages or applications;
- Introduces or modifies a public architectural contract.

Update:

- [`docs/architecture/package-dependencies.md`](../architecture/package-dependencies.md)
- [`docs/architecture/extensibility.md`](../architecture/extensibility.md)

to reflect verified boundaries.

Document only implemented behavior as current, and mark proposed profiles,
future capabilities, generic extension mechanisms, and unimplemented
applications as future.
