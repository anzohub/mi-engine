# Documentation

This directory contains the canonical documentation for `mi-engine`, tracked and versioned directly in Git alongside the codebase.

## Organization

- **`architecture/`**: Current system architecture, package boundaries, and technical constraints.
- **`handbook/`**: Conceptual explanations, workflows, and guides for learning and using the engine.
- **`guides/`**: Practical recipes and step-by-step procedures for implementing features and workflows.
- **`reference/`**: Public API specifications, data schemas, CLI commands, and generated documentation contracts.
- **`research/`**: Technical spikes, benchmarks, experiments, and exploratory notes.
- **`contributing/`**: Detailed contributor workflows and technical standards complementing the root guidelines.

## Architecture vs. Decisions

To keep documentation maintainable and avoid duplicate sources of truth:

- **`docs/architecture/`** describes the current operational state and design of the system.
- **`adr/`** records durable architectural decisions, their historical context, and evaluated trade-offs.

When designing or modifying system capabilities, keep the current state in `docs/architecture/` and document durable architectural choices in `adr/`.
