# Contributor Reference

This document provides detailed technical guidance for repository maintenance and internal development workflows, complementing the root `CONTRIBUTING.md`.

## Engineering Practices

- **Strict Package Isolation**: Always verify imports respect package boundaries defined in `docs/architecture/package-dependencies.md`.
- **Public API Discipline**: Expose symbols deliberately through top-level package index exports.
- **Verification Commands**: Ensure all validation scripts (`vp check`, `vp run -r test`, `vp run -r build`) pass before requesting review.
- **Architectural Changes**: Any modification that alters package boundaries or introduces core dependencies requires an ADR in `adr/`.
