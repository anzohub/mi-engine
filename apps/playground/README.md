# Playground

The playground is a development environment for experimenting with engine
runtime and rendering capabilities.

It is intended for focused executable experiments rather than long-lived
application architecture.

## Purpose

Use the playground to validate concepts such as:

- renderer behavior
- WebGPU experiments
- runtime systems
- asset loading
- graphics experiments

## Boundaries

The playground is an application-level environment.

Experimental code may depend on engine packages, but reusable engine
functionality should not be owned by the playground.

## Guidelines

- Keep experiments small and focused.
- Prefer executable experiments over speculative abstractions.
- Move stable functionality into the appropriate package once its ownership is
  clear.
- Do not use the playground as a replacement for reusable engine packages.
- Keep temporary experiments easy to remove or replace.
