# Editor

This package contains the framework-agnostic editor and authoring layer.

It provides editor state and behavior without depending on Angular, the DOM, or
the Studio application.

## Responsibilities

Typical editor concerns include:

- selection
- commands
- authoring state
- editor-oriented coordination
- undo/redo and related editing behavior when introduced

The editor package describes what the editor does, not how Studio renders the
editor UI.

## Headless Boundary

The editor must remain usable without an Angular application.

```text
Studio UI
    ↓
Editor
    ↓
Runtime / Core
```

A UI component may present editor state, but editor state must not depend on the
component.

## Boundaries

Editor:

- must not depend on Angular
- must not depend on Angular CDK
- must not depend on Studio UI
- must not depend on DOM-specific application infrastructure
- must not contain visual component implementations

## Reuse

The editor should be usable by different authoring applications that consume
the engine.

A future alternative Studio UI implementation should be able to consume the
same editor package without changing the editor domain itself.

## Guidelines

- Keep editor state and commands independent from presentation.
- Expose stable APIs for UI integrations.
- Keep application-specific composition in Studio.
- Avoid putting editor logic inside Angular components merely because the
  component currently owns the interaction.
- Keep editor-specific behavior in this package rather than in UI primitives.
