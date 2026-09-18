# Visual Exports

This directory contains versioned Penpot snapshots and repository-side visual
exports derived from the canonical design workspace.

## Purpose

These artifacts provide durable repository-side references for implementation,
documentation, visual regression, and offline inspection without requiring
immediate access to the live Penpot workspace.

## Contents

The directory may contain:

- versioned Penpot file snapshots
- raster or vector exports used by documentation or implementation
- reference visuals required by the project

Examples of versioned Penpot snapshots:

`mi-engine-v0.1.0.penpot`

## Penpot Snapshots

Penpot files stored here are exported snapshots of the live design workspace.

They are intended for:

- backup
- milestone versioning
- traceability
- offline inspection
- recovery

They are not the live design source and should not be edited directly.

The canonical design workspace remains in Penpot.

## Versioning

Create snapshots at meaningful design milestones rather than for every design change.

Use the project version for the filename:

`mi-engine-vX.Y.Z.penpot`

For example:

`mi-engine-v0.1.0.penpot`

## Asset Guidelines

Only committed, purposeful exports should be stored here.

Do not add temporary work, duplicate exports, or placeholder assets.

Generated or disposable artifacts should remain outside the repository unless
they are required for implementation, documentation, testing, or traceability.
