# Architecture Documentation

This directory documents the current architecture, subsystem design, and
structural boundaries of `mi-engine`.

## Current State vs. Architecture Decisions

Documentation in this directory reflects the operational topology and
constraints of the codebase as it exists today:

- **`docs/architecture/`**: Living descriptions of packages, interfaces, and
  structural boundaries.
- **`adr/`**: Immutable records of durable architectural decisions, capturing
  context, alternatives, and trade-offs at specific points in time.

Update documents here as the architecture evolves. If a significant
architectural pivot or design choice is made, record the rationale in an ADR
rather than rewriting historical records.

## Topics

- [Package Dependencies](package-dependencies.md): Package topology, consumption
  rules, and boundary constraints.
