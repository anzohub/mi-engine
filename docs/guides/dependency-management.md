# Dependency Management & Tooling Updates

This guide defines how dependencies are managed across the `mi-engine`
monorepo and how framework and tooling updates should be performed while
respecting compatibility constraints.

The repository uses pnpm catalogs to centralize dependency versions while
allowing packages to reference those versions through `catalog:` or named
catalogs such as `catalog:angular`.

## 1. Use pnpm Catalogs for Shared Versions

Dependencies used by multiple packages should normally have their version
defined once in the root `pnpm-workspace.yaml`.

Use the default catalog for dependencies shared across the repository:

```yaml
catalog:
  typescript: "<version>"
  vitest: "<version>"
  rxjs: "<version>"
  tslib: "<version>"
```

Packages should reference those versions through `catalog:`:

```json
{
  "devDependencies": {
    "typescript": "catalog:",
    "vitest": "catalog:"
  }
}
```

This keeps repository-wide tooling versions centralized.

A dependency should only be placed in the shared catalog when the repository
intends to manage that dependency's version centrally.

## 2. Use Named Catalogs for Framework-Specific Version Sets

Use a named catalog when a group of dependencies belongs to a specific
framework or subsystem and should normally be updated as a unit.

For example, Angular dependencies should use an `angular` catalog:

```yaml
catalogs:
  angular:
    "@angular/common": "<version>"
    "@angular/compiler": "<version>"
    "@angular/core": "<version>"
    "@angular/forms": "<version>"
    "@angular/platform-browser": "<version>"
    "@angular/router": "<version>"
    "@angular/build": "<version>"
    "@angular/cli": "<version>"
    "@angular/compiler-cli": "<version>"
```

Angular packages should reference it explicitly:

```json
{
  "dependencies": {
    "@angular/common": "catalog:angular",
    "@angular/compiler": "catalog:angular",
    "@angular/core": "catalog:angular",
    "@angular/forms": "catalog:angular",
    "@angular/platform-browser": "catalog:angular",
    "@angular/router": "catalog:angular"
  },
  "devDependencies": {
    "@angular/build": "catalog:angular",
    "@angular/cli": "catalog:angular",
    "@angular/compiler-cli": "catalog:angular"
  }
}
```

Do not move repository-wide tooling such as TypeScript or Vitest into a
framework-specific catalog merely because that framework also consumes them.

The catalog expresses ownership of the version, while the package manifest
expresses the dependency relationship.

## 3. Keep Compatibility Constraints Explicit

Centralizing versions does not remove compatibility constraints.

Frameworks and build tools define supported version ranges for dependencies
such as TypeScript, Vite, and Vitest. Those constraints must be respected
before changing a shared catalog entry.

Before upgrading a shared dependency:

1. Identify every relevant workspace consumer.
2. Check the supported dependency ranges declared by those consumers.
3. Determine whether a single version satisfies all consumers.
4. Use separate version sets when a dependency cannot safely be shared.

Do not upgrade a repository-wide dependency simply because a newer version is
available.

A catalog is a version-management mechanism, not a compatibility mechanism.

## 4. Treat Shared Tooling as Repository Policy

Dependencies in the default catalog represent repository-wide policy.

Typical examples include:

- TypeScript;
- Vitest;
- RxJS;
- tslib;
- shared linting tools;
- shared formatting tools;
- shared development utilities.

Packages that consume these dependencies should reference the shared catalog
when repository-wide consistency is intended.

Avoid duplicate version declarations unless there is a deliberate compatibility
reason for maintaining multiple versions.

## 5. Use Vite+ as the Package Management Interface

The repository uses pnpm as its underlying package manager.

When Vite+ is available, use its package-management commands for standard
dependency operations:

```bash
vp install
vp add <package>
vp remove <package>
vp update
vp why <package>
```

Vite+ detects the package manager configured by the workspace and delegates
package-management operations to it.

For this repository, that means `vp install` resolves the same pnpm workspace,
catalogs, overrides, and lockfile configuration as the underlying pnpm
installation.

Use pnpm directly when a pnpm-specific command or workspace feature is
required.

For example:

```bash
pnpm install
```

is valid and should be preferred when the task specifically concerns pnpm
behavior.

The important distinction is:

```text
Vite+
  ↓
package-management interface

pnpm
  ↓
underlying package manager
```

## 6. Use Global Overrides Deliberately

pnpm overrides affect dependency resolution across the dependency tree.

They should therefore only be used when the repository intentionally requires
a package or version to be overridden across consumers.

For Vite+ projects, the Vite+ setup may use overrides for Vite and Vitest:

```yaml
overrides:
  "vite@*": "catalog:"
  "vitest@*": "catalog:"
```

These overrides are useful when the project must share the same Vite/Vitest
toolchain used by Vite+.

Do not introduce global overrides merely to silence peer dependency warnings.

Before adding or changing an override, verify:

- which packages it affects;
- which peer dependency ranges those packages declare;
- whether it affects unrelated workspace packages;
- whether the override is required by the current toolchain;
- whether all affected consumers support the resolved version.

A global override must be treated as a repository-wide dependency policy.

## 7. Treat Vite+ as a Coordinated Toolchain

Vite+, Vite, and Vitest should be treated as a coordinated toolchain.

A Vite+ release may change the versions or compatibility requirements of its
underlying build and test tooling.

When updating Vite+:

1. Inspect the target release's toolchain requirements.
2. Check those requirements against every affected workspace consumer.
3. Update the related catalog entries together.
4. Apply the required Vite+ migrations.
5. Reinstall dependencies.
6. Validate the resulting dependency graph.

Do not independently change Vite or Vitest when the Vite+ release expects
specific versions unless the resulting combination has been explicitly
verified.

## 8. Updating Angular

Angular updates should follow Angular's supported update workflow.

First inspect the current environment:

```bash
ng version
```

Then review the target release's compatibility requirements.

The standard Angular update command is:

```bash
ng update @angular/cli @angular/core
```

For a major-version update, specify the target major explicitly:

```bash
ng update @angular/cli@^<major> @angular/core@^<major>
```

Angular migrations are executed as part of the update process when applicable.

### Angular and pnpm Catalogs

When Angular dependencies are declared through a named catalog:

```json
"@angular/core": "catalog:angular"
```

the concrete version is managed in `pnpm-workspace.yaml`.

Do not assume that `ng update` will rewrite a shared catalog in the same way
that it would rewrite a concrete version declared directly in `package.json`.

Before performing an Angular update through a catalog-based workspace:

1. Check the current Angular CLI behavior for pnpm catalogs.
2. Identify which catalog entries must change.
3. Update the catalog deliberately when required.
4. Run the Angular migrations against the intended source and target versions.
5. Review all generated changes before installation and validation.

When migrations need to be executed independently from dependency changes, use
Angular's migration-only mode:

```bash
ng update @angular/core --migrate-only --from <old-version> --to <new-version>
```

Only use migration-only mode when the source and target versions are known and
the dependency change has already been handled separately.

## 9. Updating Vite+ and Its Tooling

Vite+ provides migration tooling for changes that affect the Vite+ workflow or
its integrated test tooling.

When an upgrade requires migration, run:

```bash
vp migrate
```

from the workspace root.

Review the migration output before installing or committing the resulting
changes.

The general workflow is:

```text
Check compatibility
        ↓
Update framework dependencies when required
        ↓
Update Vite+ and related catalog entries
        ↓
Run vp migrate
        ↓
Review migration changes
        ↓
Install dependencies
        ↓
Validate the repository
```

When migrating a workspace from one major version of Vite+ or its integrated
tooling to another, follow the migration instructions for the target release.

For migrations that change Vitest, run the migration before manually forcing
the new dependency version when the target Vite+ documentation requires this.

## 10. Coordinate Angular and Vite+ Updates

Angular and Vite+ may impose different version requirements on the same
dependency.

For example:

```text
Angular
├── TypeScript
├── Vite
└── Vitest

Vite+
├── Vite
└── Vitest
```

A shared catalog does not mean that every consumer can accept every version.

Before changing a shared dependency:

```text
Identify consumers
        ↓
Check supported ranges
        ↓
Find a compatible shared version
        ↓
Choose a shared catalog or separate version sets
        ↓
Apply required migrations
        ↓
Install
        ↓
Validate
```

When a Vite+ upgrade requires a dependency version that the current Angular
toolchain does not support:

1. Check whether a compatible Angular release exists.
2. Upgrade Angular when required.
3. Apply Angular migrations.
4. Update the Vite+ toolchain.
5. Run `vp migrate` when required.
6. Install and validate the complete workspace.

Do not force a newer Vite or Vitest version globally before compatibility has
been established.

## 11. Example: Major Tooling Migration

When a tooling upgrade introduces a new major version of a shared dependency,
do not change the shared catalog immediately.

Instead:

```text
1. Inspect the target toolchain requirements.
2. Identify every workspace consumer.
3. Check framework compatibility.
4. Upgrade the framework when necessary.
5. Apply framework migrations.
6. Update the coordinated tooling versions.
7. Run the required tooling migrations.
8. Install dependencies.
9. Validate the dependency graph.
10. Run checks, tests, and builds.
```

This prevents a repository-wide catalog or override from forcing an unsupported
dependency version onto another workspace consumer.

## 12. Validate the Dependency Graph

After dependency changes have been installed, inspect the resolved dependency
tree.

Useful commands include:

```bash
pnpm why vite
pnpm why vitest
pnpm why typescript
pnpm list vite vitest typescript --depth 10
```

When using Vite+, inspect the resolved toolchain when needed:

```bash
vp toolchain
vp toolchain vitest
```

These commands help identify:

- multiple installed versions;
- unexpected transitive dependencies;
- overridden packages;
- peer dependency relationships;
- packages still depending on older versions.

Distinguish between:

```text
Manifest declaration
    ↓
Catalog reference
    ↓
Package manager resolution
    ↓
Resolved dependency graph
```

Always validate the resolved graph rather than inferring compatibility only
from `package.json` or `pnpm-workspace.yaml`.

## 13. Install Dependencies

After dependency declarations or catalog entries have changed, install the
workspace dependencies.

When using Vite+ as the repository interface:

```bash
vp install
```

When working directly with pnpm:

```bash
pnpm install
```

Both should operate on the same workspace configuration and lockfile when pnpm
is the configured package manager.

For reproducible CI installation, use the appropriate frozen-lockfile mode:

```bash
vp install --frozen-lockfile
```

or:

```bash
pnpm install --frozen-lockfile
```

Do not manually edit the lockfile to hide dependency conflicts.

## 14. Validate the Repository

After dependency updates, run the repository validation checks:

```bash
pnpm check
vp run -r test
vp run -r build
```

For Vite+ workflows, also use the corresponding commands when appropriate:

```bash
vp check
vp test
vp build
```

Resolve peer dependency errors rather than using `--force` unless the
incompatibility is explicitly understood and intentional.

A successful installation is not sufficient evidence that the resulting
toolchain is compatible.

## 15. Keep Lockfiles and Catalogs Consistent

Dependency updates should modify dependency declarations and the lockfile as a
single logical change.

After changing catalog entries:

```bash
vp install
```

or:

```bash
pnpm install
```

must be run so that the lockfile represents the new dependency graph.

Review lockfile changes together with:

- `package.json`;
- `pnpm-workspace.yaml`;
- migration output;
- validation results.

Do not manually edit the lockfile to force a desired version.

## 16. Record Dependency Architecture Decisions

Add an ADR in `adr/` when a dependency change:

- introduces a new shared catalog;
- introduces a new named catalog;
- splits a dependency into multiple version sets;
- adds or removes a repository-wide override;
- changes ownership of a major toolchain dependency;
- requires incompatible framework or tooling versions to coexist;
- changes the relationship between Angular and Vite+;
- introduces a repository-wide dependency policy.

Update the relevant architecture documentation when the dependency graph or
package responsibilities change.

Document implemented dependency behavior as current behavior and keep future
migration plans explicitly marked as future.

## 17. Guiding Principles

- Centralize dependency versions when the repository intends to share them.
- Keep framework-specific dependency sets together when they must move as a
  unit.
- Keep repository-wide tooling such as TypeScript and Vitest in the shared
  catalog unless there is a deliberate compatibility reason not to.
- Never use a shared catalog or global override to bypass compatibility
  constraints.
- Treat Vite+ and its Vite/Vitest toolchain as coordinated dependencies.
- Update the framework before forcing tooling versions that the framework does
  not support.
- Prefer a separate version set over an unsafe repository-wide override when
  consumers require incompatible versions.
- Validate the resolved dependency graph, not only the declared manifests.
- Prefer deliberate compatibility over repository-wide version uniformity.
