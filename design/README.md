# Design Assets & Artifacts

This directory contains the design system artifacts, executable token
contracts, and versioned visual exports for `mi-engine`.

## Design System

The canonical design system is maintained in Penpot.

**Penpot:** [mi-engine Design System](https://design.penpot.app/#/workspace?team-id=d8ac01df-6646-81d2-8008-a8548ad7b30d&file-id=d8ac01df-6646-81d2-8008-a855584be63e&page-id=d8ac01df-6646-81d2-8008-a855584be63f)

The Penpot file contains the visual system, reusable components, patterns,
recipes, accessibility guidance, responsive guidance, iconography, and related
design documentation.

## Source of Truth

Responsibilities are intentionally separated to avoid competing sources of truth:

- **Git**: Executable design token definitions, architectural decisions, and
  normative repository documentation.
- **Penpot**: Visual design system, components, patterns, recipes,
  annotations, and product design.
- **Angular**: Product implementation.
- **QA**: Visual, accessibility, and behavioral verification.

Penpot exports stored in this repository are snapshots or reference artifacts.
They are not edited as the live design source.

## Repository Structure

```text
design/
├── exports/    # Versioned Penpot snapshots and visual/reference exports
├── tokens/     # Executable design token definitions
└── README.md   # Design tooling, ownership, and artifact conventions
```

## Tokens

Executable design token definitions live in:

`design/tokens/`

These files are the repository-side source used by the implementation pipeline.

Penpot may represent and consume the same design decisions visually, but the
repository remains authoritative for executable token definitions.

## Penpot Exports

Files under:

`design/exports/`

are repository-side exports derived from the canonical Penpot workspace.

They may be used for:

- versioned snapshots
- implementation reference
- documentation
- visual regression or reference workflows
- offline inspection when access to Penpot is unavailable

Exports are not edited directly.

A Penpot export represents a snapshot of the live design file at a particular
point in time.

## Versioning

Penpot exports should be created for meaningful milestones rather than every
design change.

Recommended naming:

`mi-engine-vX.Y.Z.penpot`

For example:

`mi-engine-v0.1.0.penpot`

The live design system remains in Penpot; exported files provide repository-side
history and backup artifacts.

## Design Tooling

The active design tool for the project is Penpot.

Penpot is used for the current design workflow.

Design tooling is intentionally kept separate from executable token definitions
and application implementation.

## Related Documentation

Project-level design system architecture, decisions, guidelines, and research
are maintained in the repository documentation and ADRs.

Start here when additional context is required:

- `docs/`
- `adr/`
- `design/tokens/`
