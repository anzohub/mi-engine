# Playground

The playground is a development environment for experimenting with engine
runtime and rendering capabilities.

It is intended for focused, executable experiments, smoke tests, and temporary
technical validation rather than long-lived application architecture.

## Purpose

Use the playground to validate concepts such as:

- renderer behavior
- WebGPU experiments
- runtime systems
- asset loading
- graphics experiments
- integration between engine packages
- temporary smoke tests

## Experiment Lifecycle

The playground is intentionally temporary.

Experiments should follow this lifecycle:

```text
Playground
    ↓
Experiment / smoke test
    ↓
Technical validation
    ↓
┌───────────────────────────────────────┐
│ Is reusable engine functionality      │
│ discovered or implemented?            │
└───────────────────────────────────────┘
          │
       yes│
          ↓
     packages/
          │
          ↓
   Reusable functionality


If no reusable engine functionality is
required and the experiment becomes a
stable user-facing demonstration:

          ↓
      examples/
```

Once an experiment is mature and provides a stable, meaningful demonstration,
it should be moved out of the playground and promoted to an appropriate
example.

The playground should not retain a second copy of the same demonstration.

## Boundaries

The playground is an application-level development environment.

Experimental code may depend on engine packages, but reusable engine
functionality should not be owned by the playground.

The playground may also contain temporary application code required to exercise
or validate engine functionality.

## Playground vs Examples

The playground and examples have different purposes:

```text
Playground
    "Does this work?"

Examples
    "This works. This is how you use it."
```

Use the playground for:

- experimentation
- technical investigation
- smoke testing
- unstable APIs
- temporary prototypes

Use `examples/` for:

- stable demonstrations
- documented usage patterns
- user-facing examples
- examples for specific integrations
- framework-specific usage such as Web Components or Angular

Examples should be small and focused, and should demonstrate existing,
stable functionality rather than serve as a place for ongoing engine
development.

## Guidelines

- Keep experiments small and focused.
- Prefer executable experiments over speculative abstractions.
- Move reusable engine functionality into the appropriate package once its
  ownership is clear.
- Move mature, stable demonstrations into `examples/`.
- Do not keep duplicate versions of the same demonstration in both
  `playground/` and `examples/`.
- Do not use the playground as a replacement for reusable engine packages.
- Keep temporary experiments easy to remove or replace.
