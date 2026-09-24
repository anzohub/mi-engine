# Assets

This package contains asset-related engine functionality.

It provides the asset boundary used by the rest of the engine without coupling
asset concepts to the Studio application's UI.

## Responsibilities

The package owns asset-related runtime and infrastructure concerns.

The exact responsibilities may grow as asset loading, processing, and
authoring workflows become concrete.

## Dependency Direction

```text
assets
   ↓
core
```

Additional dependencies may be introduced when a concrete asset requirement
justifies them.

## Boundaries

Assets:

- may depend on `core`
- must not depend on Angular
- must not depend on Studio UI
- must not contain asset-browser presentation
- must not contain application-specific workspace behavior

## Reuse

Asset infrastructure should be reusable by both runtime applications and
authoring tools.

The presentation of assets belongs outside this package.

## Guidelines

- Keep asset concepts framework-agnostic.
- Separate asset infrastructure from asset-browser UI.
- Avoid leaking Studio application state into asset packages.
- Keep public APIs intentional.
