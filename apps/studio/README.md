# Studio

Studio is the main authoring application for mi-engine.

This directory contains the application entry points used to assemble the
Studio product.

## Structure

```text
studio/
└── angular/
```

The current Studio implementation uses Angular.

## Responsibilities

The application layer owns application composition concerns such as:

- application bootstrap
- routing
- top-level providers
- application configuration
- workspace composition
- feature wiring
- application lifecycle

Reusable engine functionality belongs in `packages/`.

Reusable UI belongs in `packages/ui/`.

## Boundaries

The Studio application may consume:

- framework-agnostic engine packages
- portable UI primitives
- Studio-specific UI packages

Application concerns must not leak into foundational engine packages.

## Guidelines

- Keep application composition inside the app.
- Keep reusable UI outside the app.
- Keep engine and editor logic in framework-agnostic packages.
- Avoid introducing reusable libraries directly inside the application.
- Avoid deep imports into package internals.
