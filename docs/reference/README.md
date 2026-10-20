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

Document an API declaration with TSDoc next to its source when its contract is
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

TSDoc is the convention for source documentation comments; TypeDoc is the
tool that generates API reference output from TypeScript declarations and
those comments. TypeDoc supports TSDoc but does not enforce strict compliance
with the standard. Follow the [source documentation conventions](../contributing/README.md#source-documentation)
when writing comments.

## Generate API Reference

Run the shared TypeDoc tool from the repository root:

```bash
pnpm docs:api
```

The root `typedoc.json` configuration documents the public exports from
`src/index.ts` in the assets, core, editor, renderer, runtime, and webgpu
packages, using each package's TypeScript configuration. Applications, tests,
and declarations not reachable from those public exports are not API entry
points. Export a declaration from its package entry point when it becomes
part of the public API.

For a new source file in an existing package, write TSDoc comments next to
its declarations and expose the intended public symbols through that
package's `src/index.ts`. TypeDoc follows those exports and reads the comments
at the original declarations; do not duplicate them in the entry point.
Individual source files do not need to be added to `typedoc.json`. Comments
alone do not make an internal declaration public. When adding a new package,
add its directory to the root configuration's `entryPoints` list.

TypeDoc generates HTML in `dist/api`, including `dist/api/index.html`. This
output is ignored by Git and must be regenerated rather than edited manually.
The TypeDoc version is pinned in the shared pnpm catalog and installed as a
root development dependency alongside the shared TypeScript version.

The Markdown files in `docs/` remain the canonical authored documentation.
The future portal in `apps/docs` can integrate the generated API alongside
that content. TypeDoc's default output is HTML, not Markdown; adding Markdown
output requires a plugin and is deferred until the portal is selected. Keep
generated artifacts separate from authored content.

## Available References

- [Glossary](glossary.md): Shared terminology and guidance for maintaining
  validated project definitions.
