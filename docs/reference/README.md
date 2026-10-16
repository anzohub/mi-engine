# Reference

This directory serves as the repository boundary for stable reference material
across `mi-engine`.

## Scope

- **Public API Contracts**: Formal interfaces and signatures for published
  packages.
- **Data Schemas**: Asset definitions, project manifest formats, and
  serialization contracts.
- **CLI Specifications**: Command-line interface syntax, parameters, and flags.
- **Generated Documentation**: Automated API references derived from codebase
  source declarations.

Generated reference documentation is produced by automated toolchain tasks and
must not be edited manually.

## Where Reference Material Belongs

Document an API declaration with JSDoc next to its source when its contract is
local to that declaration. A separate Markdown reference is useful when the
contract spans multiple declarations or packages, is shared by independent
consumers, or defines a format, schema, or compatibility rule that needs one
stable place to consult. For example, a project-manifest format consumed by
both an editor and other tools would need its fields, validation rules, and
version-compatibility behavior specified together.

Do not create a separate page for every API or duplicate source documentation
without a clear need. Keep source-level documentation authoritative for local
API details; generate API reference output from source declarations where the
tooling supports it. Use this directory for cross-cutting contracts and
specifications that benefit from a standalone reference. The [project
glossary](glossary.md) is the shared lookup for validated terminology.

## Available References

- [Glossary](glossary.md): Shared terminology and guidance for maintaining
  validated project definitions.
