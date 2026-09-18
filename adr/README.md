# Architecture Decision Records (ADRs)

This directory contains Architecture Decision Records for `mi-engine`. ADRs
capture significant, durable technical decisions along with their context,
trade-offs, and consequences.

## Record Structure

Each ADR follows a structured format:

1. **Title & Status**: Clear title, identifier, date, and status (e.g.,
   Proposed, Accepted, Superseded).
2. **Context**: What problem are we solving? What constraints and requirements exist?
3. **Alternatives**: What alternative approaches were considered?
4. **Trade-offs**: What are the pros and cons of the evaluated options?
5. **Decision**: What did we choose, and what is the technical rationale?
6. **Consequences**: What becomes easier, what becomes harder, and what are the
   operational impacts?

## Immutability & Lifecycle

ADRs are immutable historical records reflecting decisions at a given point in time:

- Historical decisions must not be rewritten to change their original meaning.
- When a previous decision is replaced or substantially modified, create a new
  ADR that explicitly marks the earlier record as superseded.
