# Examples

The `examples/` directory contains small, stable, user-facing examples that
demonstrate how to use and integrate mi-engine.

Examples are intended to show real, supported usage patterns rather than
serve as a development area for ongoing experiments.

## Purpose

Use examples to demonstrate:

- engine capabilities
- runtime and rendering features
- asset loading and usage
- Web Component integrations
- Angular integrations
- other supported framework or platform integrations
- common usage patterns and recipes

Examples should remain focused and easy to understand.

## Examples vs Playground

The playground and examples have different purposes.

```text
Playground
    ↓
Experiment / smoke test
    ↓
Technical validation
    ↓
Mature and stable?
    ↓
Example
```

Use the playground when developing or investigating something:

```text
"Does this work?"
```

Use an example when the functionality is stable and you want to demonstrate
its intended usage:

```text
"This works. This is how you use it."
```

An experiment should not remain duplicated in both locations.

When an experiment becomes a stable, meaningful demonstration, move it from
the playground into the appropriate examples category.

If the experiment produces reusable engine functionality, that functionality
should first be moved into the appropriate package under `packages/`.

## Structure

Examples are organized by how the engine is consumed or by the capability
being demonstrated.

A possible structure is:

```text
examples/
├── engine/
│   ├── basic-scene/
│   ├── lighting/
│   ├── materials/
│   ├── animation/
│   └── asset-loading/
│
├── web-components/
│   ├── basic-scene/
│   ├── model-viewer/
│   ├── interaction/
│   └── ui/
│
├── angular/
│   ├── basic-scene/
│   ├── editor-integration/
│   ├── inspector/
│   └── ui-integration/
│
└── README.md
```

The exact categories may evolve as new supported integrations and usage
patterns are introduced.

## Example Categories

### Engine

Examples that use the framework-agnostic engine APIs directly.

```text
examples/engine/
```

These examples should avoid unnecessary framework dependencies and focus on
engine capabilities.

Examples:

- creating a world
- creating entities
- rendering a scene
- loading assets
- configuring materials
- animation

### Web Components

Examples that demonstrate usage through the portable Web Component layer.

```text
examples/web-components/
```

These examples should demonstrate how the Web Components can be consumed from
standard web applications without coupling them to Angular or another
framework.

Examples:

- embedding an engine scene
- using engine-related custom elements
- configuring attributes and properties
- handling custom element events

### Angular

Examples that demonstrate Angular integration.

```text
examples/angular/
```

These examples may use:

- Angular
- `@mi-engine/studio-ui-angular`
- `@mi-engine/ui-web-components`
- `@mi-engine/editor`
- other framework-specific integrations

They should demonstrate supported Angular usage without becoming a replacement
for the Studio application.

## Example Structure

Each example should be a small, independently understandable application.

For example:

```text
examples/web-components/basic-scene/
├── package.json
├── index.html
├── src/
│   └── main.ts
├── assets/
└── README.md
```

An Angular example may have framework-specific structure:

```text
examples/angular/basic-scene/
├── package.json
├── angular.json
├── tsconfig.json
├── src/
│   ├── main.ts
│   └── app/
│       ├── app.component.ts
│       └── ...
└── README.md
```

The structure should follow the requirements of the technology used by the
example.

## Example Guidelines

- Keep each example focused on one primary concept.
- Prefer real APIs and supported usage patterns.
- Keep examples small enough to understand quickly.
- Avoid introducing abstractions that are only useful inside the example.
- Do not duplicate engine functionality inside an example.
- Do not use examples for unstable experiments or ongoing research.
- Do not move reusable engine functionality into `examples/`.
- Remove or update examples when the API they demonstrate changes.
- Keep framework-specific examples isolated from unrelated integrations.

## Relationship with Packages

Examples consume the packages that implement mi-engine.

```text
examples/
    ↓
packages/
├── core
├── runtime
├── renderer
├── assets
├── editor
├── webgpu
├── ui/web-components
└── ui/studio/angular
```

Examples demonstrate package usage; they do not own the underlying
functionality.

## Relationship with Applications

Examples are applications in the practical sense that they are executable,
but they are not product applications.

For example:

```text
apps/studio/angular/
    → the Studio application

apps/playground/
    → development and experimentation environment

examples/angular/basic-scene/
    → focused demonstration of Angular integration
```

The examples should remain intentionally smaller and more focused than the
main Studio application.

## Promotion from Playground

A typical workflow is:

```text
apps/playground/
        ↓
experiment
        ↓
validate concept
        ↓
stabilize API
        ↓
move reusable functionality to packages/
        ↓
create or promote a focused demonstration
        ↓
examples/
```

Examples are therefore the stable, user-facing result of validated usage
patterns, not the place where those usage patterns are initially developed.
