# Web

The Web application is the public-facing portal for mi-engine.

It is intended to present the project, explain its capabilities, showcase
examples and demos, and provide entry points into the project's tools and
resources.

## Status

This application is planned but is not currently implemented.

Its future implementation technology is intentionally left open.

## Purpose

The Web application is expected to:

- present mi-engine and its capabilities;
- provide product and project information;
- showcase examples, demos, and use cases;
- direct users to Studio;
- direct users to Docs and other project resources;
- provide a public entry point to the mi-engine ecosystem.

## Boundaries

The Web application is a product-facing application.

It may consume public engine or UI packages when concrete use cases justify
doing so, but it must not become the owner of reusable engine functionality.

The application should remain independent from the internal implementation of
Studio.

## Relationship with Other Applications

```text
Web
 ├── introduces the project and its products
 ├── directs users to Studio
 ├── directs users to Docs
 └── presents examples and ecosystem resources
```

The Web application and Studio are separate applications with different
responsibilities.

## Implementation

The framework and tooling for this application have not yet been selected.

Do not introduce framework-specific directory structure or dependencies until
the implementation requirements justify that choice.

## Guidelines

- Keep product-facing content and application composition here.
- Keep canonical documentation in `docs/`.
- Keep reusable UI in `packages/ui/`.
- Keep engine functionality in `packages/`.
- Avoid coupling the public Web application to Studio internals.
- Treat the application's implementation technology as an open decision until
  concrete requirements are known.
