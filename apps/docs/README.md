# Documentation Portal (`apps/docs`)

This directory reserves the workspace boundary for the future `mi-engine`
documentation portal application.

## Architectural Boundaries

- **Status**: The documentation portal is not implemented yet and will be
  developed when the scale of documentation and interactive UX requirements
  justify a dedicated application.
- **Content Source**: The portal will consume and render canonical documentation
  files from the root `docs/` directory. It must never serve as an independent
  or competing source of documentation truth.
- **Workspace Isolation**: This directory does not contain a `package.json` and
  is intentionally excluded from active pnpm workspace package builds until
  implementation begins.

## API Reference Integration

The repository already provides a shared TypeDoc configuration and a root
`pnpm docs:api` command that generates HTML API reference output in `dist/api`.
See the [API reference generation contract](../../docs/reference/README.md#generate-api-reference)
for its scope and source of truth.

When the portal framework is selected, integrate the generated API alongside
the canonical Markdown content without maintaining a second copy of API
declarations. Markdown generation requires an additional TypeDoc plugin;
neither that plugin nor a portal framework is required by the current setup.
