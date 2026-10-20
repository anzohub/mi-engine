# Contributor Reference

This document provides detailed technical guidance for repository maintenance
and internal development workflows, complementing the root `CONTRIBUTING.md`.

## Engineering Practices

- **Strict Package Isolation**: Always verify imports respect package
  boundaries defined in `docs/architecture/package-dependencies.md`.
- **Public API Discipline**: Expose symbols deliberately through top-level
  package index exports.
- **Verification Commands**: Ensure all validation scripts (`vp check`,
  `vp run -r test`, `vp run -r build`) pass before requesting review.
- **Architectural Changes**: Any modification that alters package boundaries or
  introduces core dependencies requires an ADR in `adr/`.

## Source Documentation

Use TSDoc comments (`/** ... */`) next to the declarations they describe.
Start with a concise summary of the contract rather than a repetition of the
symbol's name or signature. Add detail where it helps consumers:

- Use `@remarks` for behavior, constraints, and side effects that need more
  explanation than the summary.
- Use `@param name - description` to describe parameters when their meaning
  or constraints need explanation.
- Use `@returns` to clarify results and `@typeParam` for generic parameters
  when needed.
- Keep types in TypeScript declarations rather than repeating them in
  JSDoc-style type annotations inside comments.

Expose approved public symbols with explicit named exports from the package's
`src/index.ts`; use `export type` for types. Avoid wildcard exports that would
publish new implementation details unintentionally. Document symbols at their
original declarations, not again where they are exported. Internal code does
not need to become public just to be documented.

TypeDoc consumes these comments for the generated API reference but does not
enforce strict TSDoc compliance. See the [API reference generation contract](../reference/README.md#generate-api-reference)
for the command, package discovery, and generated output.
