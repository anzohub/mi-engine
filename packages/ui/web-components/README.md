# UI Web Components

This package contains framework-agnostic UI primitives exposed as standard Web
Components.

The public API is based on Web Platform concepts rather than a specific
application framework.

## Purpose

Components from this package are intended to be consumable by:

- vanilla JavaScript applications
- Angular applications
- React applications
- Vue applications
- other environments with Web Component support

Examples include:

- Button
- Input
- Dialog
- Popover
- Tooltip
- Tabs
- Combobox
- Number Input
- Color Input

The exact component set evolves with the project.

## Public Contract

The public contract should be expressed through standard Web Component
mechanisms:

- custom element names
- attributes
- DOM properties
- DOM events
- slots
- CSS custom properties

Lit may be used as the implementation layer.

Lit is an implementation detail and must not become the public architectural
contract of the package.

Consumers should not need to know which implementation library is used to
render a component.

## Framework Independence

This package must not depend on:

- Angular
- Angular CDK
- Studio-specific state
- editor-specific domain models
- application routing
- application-level dependency injection

Framework-specific adapters belong outside this package.

## Lit

Lit may provide the implementation layer for:

- reactive properties
- declarative templates
- lifecycle management
- component rendering
- scoped styling

The resulting component remains a standard Web Component.

Consumers should interact with the Web Component API rather than
implementation-specific Lit APIs.

## Angular Integration

Angular may consume the Custom Elements from this package.

The portable package therefore remains independent from Angular while the
Angular application owns framework-specific integration.

### Angular CDK

Angular CDK is not part of this package's implementation boundary.

CDK behavior may operate around Web Component hosts where appropriate, but
integration details belong in the Angular layer.

Do not add Angular CDK as a dependency to portable components merely to support
an Angular-specific use case.

### Angular Forms

Native Web Components are not automatically equivalent to Angular form
controls.

When a Web Component needs deep Angular Forms integration, use an Angular
adapter or directive such as a `ControlValueAccessor`.

The portable component itself must remain framework-agnostic.

## Shadow DOM

Components may use Shadow DOM when encapsulation and component isolation are
beneficial.

Shadow DOM introduces explicit integration boundaries:

- external DOM queries do not automatically traverse component internals
- focus management may need to remain inside the component
- keyboard interaction should be handled internally when it belongs to the
  component
- intrinsic ARIA behavior should remain inside the component
- Angular/CDK integrations should generally operate at the custom element host
  boundary
- direct access to shadow internals should be treated as an explicit
  integration case

Not every component must use Shadow DOM.

The decision should be made per component based on the component's needs rather
than as a universal rule.

## Events

Public custom events should use standard DOM event semantics.

Events that need to cross a Shadow DOM boundary may require:

```text
bubbles: true
composed: true
```

Event names and payloads are part of the public component contract and should be
documented.

Do not rely on Lit-specific event behavior as part of the public API.

## Slots and Content Projection

Portable components should use Web Component slots for content composition.

Angular-specific template composition and Angular content projection remain
concerns of the Angular layer.

The portable API should not be designed around Angular template semantics.

## Theming

Shared design tokens should be exposed through CSS custom properties where
appropriate.

CSS custom properties provide a useful theming boundary across Shadow DOM.

Avoid making portable components depend exclusively on ancestor selectors that
exist outside their shadow root.

## Accessibility

Portable components own their intrinsic interaction and accessibility behavior.

Where relevant, this includes:

- keyboard interaction
- focus management
- ARIA semantics
- disabled state
- interactive state transitions

Application-level accessibility composition may still be handled by Angular
CDK or other application infrastructure.

## Public API Stability

Changes to the following should be treated as public API changes:

- element names
- public properties
- public attributes
- event names
- event payload shapes
- slot names
- CSS custom properties

Implementation details such as internal Lit structure or internal shadow DOM
markup are not part of the public contract unless explicitly exposed.

## Guidelines

- Keep the public API framework-agnostic.
- Prefer Web Platform concepts in public contracts.
- Keep Lit implementation details internal.
- Document properties, attributes, events, slots, and CSS custom properties.
- Avoid Angular-specific dependencies.
- Keep component behavior self-contained.
- Use framework-specific adapters where necessary.
- Treat Shadow DOM boundaries explicitly.
- Do not expose internal implementation details as public API without a
  deliberate reason.
