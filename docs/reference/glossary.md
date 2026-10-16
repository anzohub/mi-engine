# Project Glossary

This glossary is the shared reference for terminology used across project
documentation, APIs, code, and technical discussions. Its purpose is to keep
meanings consistent and make important distinctions easy to find.

Consult it when introducing a term, choosing between similar names, reviewing
documentation or API wording, or resolving disagreement about what a project
term means. It is intended to reduce ambiguity, inconsistent naming, and
unnoticed differences between a general technical meaning and a meaning used
specifically in this project.

## How to Maintain It

- Add a term when it is used across boundaries, has a project-specific meaning,
  or is likely to be confused with a related concept. Do not add every ordinary
  technical word.
- Before adding a term, search this glossary and nearby documentation for an
  existing equivalent. Extend an existing entry rather than creating a
  duplicate.
- Use one canonical name per concept. Record useful aliases or distinctions in
  the entry instead of maintaining competing definitions.
- Change a definition when implementation or an accepted decision changes its
  meaning. Update affected references and, for a durable architectural change,
  record the decision in an ADR as appropriate.
- Retire a term when it is no longer used or its concept has been superseded.
  Mark it as deprecated or superseded and point to the replacement when that
  history helps readers; remove obsolete entries when it does not.
- Keep updates close to the code or documentation change that introduces the
  terminology. Review entries when their owning API or decision changes; no
  separate review process is required.

A definition is sufficiently precise when it identifies the concept's meaning
within `mi-engine`, states the context where that meaning applies, and
distinguishes it from plausible neighboring concepts. Definitions should be
grounded in current code or an explicit decision. If meaning is uncertain,
state the uncertainty and link the open question rather than presenting an
assumption as settled terminology.

## Entry Format

Use only the fields that add useful precision:

- **Term:** Canonical name.
- **Definition:** Precise meaning within the project.
- **Context:** Where the term is used and what is in or out of scope.
- **Distinctions:** Similar concepts it should not be confused with.
- **References:** Related documentation, decisions, or public APIs.

## Categories for Future Entries

These categories are navigation placeholders based on the repository's
existing organization, not claims that each capability is implemented. Add
terms only after checking them against the relevant code or an accepted
decision.

### Core and Math

No validated terms yet.

### Runtime and Rendering

No validated terms yet.

### Editor and Authoring

No validated terms yet.

### Assets and Integrations

No validated terms yet.

### Applications and UI

No validated terms yet.

### Architecture and Repository

No validated terms yet.

## Example Only: Entry Format

The entry below illustrates the format using a fact visible in the current
workspace. It is an example, not an approved or official glossary definition.

- **Term:** Package root export (format example only).
- **Definition:** The module path a package exposes for imports through its
  package name, as selected by the `"."` entry in its `exports` map.
- **Context:** TypeScript workspace packages such as `@mi-engine/core`; its
  current manifest maps the root export to `./src/index.ts`.
- **Distinctions:** The root export is not the same as every source file in the
  package. Internal files are not automatically part of its public import API.
- **References:** [`packages/core/package.json`](../../packages/core/package.json)
  and [Package Dependencies](../architecture/package-dependencies.md).
