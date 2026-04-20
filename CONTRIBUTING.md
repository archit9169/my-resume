# Contributing Guide

This is the canonical human contributor document for review expectations, commit guidance, and history cleanup.

For repo-specific agent rules, doc ownership, naming conventions, and schema-parity expectations, see [AGENT.md](AGENT.md).

## 1. Contributor Guardrails

- Keep rendering deterministic: `app config -> resume -> template -> HTML`.
- Keep `_data`, `_templates`, `_includes`, `assets`, and workflows separated by responsibility.
- Treat `?template=<name>` as navigation-only.
- Treat `?theme=<name>` as a view-layer selection only.
- Do not silently fall back when resume or template configuration is wrong.
- Keep docs and exact contract references aligned when public behavior changes.

## 2. Review Style

- Review for correctness and regressions first.
- Lead with findings, ordered by severity.
- Reference concrete files and lines whenever possible.
- Call out architecture drift, contract violations, and unsupported assumptions.
- If verification is incomplete, say what was not tested and why.

## 3. Commit Directive

The repository style favors descriptive commits with intent, rationale, and architecture context.

### Subject line

- Use a short descriptive subject line.
- Prefer concrete change summaries over vague titles.
- Avoid one-word subjects such as `Fix`.

### Body

Use a body when the change is more than a tiny correction.

The preferred pattern is:

1. One short summary sentence or subtitle.
2. A blank line.
3. Optional section dividers for larger changes.
4. Clear notes about architecture, workflows, or constraints that changed.

### Recommended section labels

- `Updated / Added files`
- `Enhancements`
- `Architecture impact`
- `Documentation`
- `Notes`

Use only the sections that add value. Do not pad a commit body with empty structure.

### Breaking changes

Use an explicit breaking-change block only when a contract, repository layout, route model, or workflow expectation changes in a way that could break existing behavior.

### Examples

Small fix:

```text
Correct template resolution for non-template pages

Use page.collection to distinguish index.md from template documents so
the engine resolves the configured default template instead of relying on
page.name.
```

Larger structural commit:

```text
Refactor the resume engine around template entry documents

Template routing + docs alignment + app bar extraction

--------------------------------
Updated / Added files:
--------------------------------

_layouts/app_engine.html
_includes/app_bar.html
_templates/classic.md
docs/HOW_IT_WORKS.md

--------------------------------
Architecture impact:
--------------------------------

Templates now resolve as real collection documents and the engine owns
all global assets and route-level orchestration.
```

## 4. History Cleanup Guidance

Do not rewrite `main` just to polish old messages.

If history cleanup is desired, do it on a separate branch.

### Goal

Produce a cleaned history on a separate branch without force-pushing `main`.

Recommended branch name:

`codex/history-cleanup`

### Commit Rewrite Map

#### `e557e95` -> reword

Current:

`Initial Jekyll resume engine setup`

Suggested rewrite:

`Bootstrap the Jekyll resume engine`

Why:

- keeps the original intent
- reads more cleanly in history
- matches the descriptive subject style used elsewhere

#### `452516a` -> reword

Current:

`Update resume output system`

Suggested rewrite:

`Add the print pipeline and PDF controls`

Why:

- makes the shipped capability obvious
- better matches the body, which is already strong

#### `5833241` -> reword

Current:

`Update & Refactor`

Suggested rewrite:

`Normalize the HTML shell and asset loading`

Why:

- avoids a vague subject line
- foregrounds the real architecture change

#### `18e3df1` -> split or reword

Current:

`Major Overhaul!:`

Recommended cleanup:

- preferred: split into two commits
- acceptable: reword as one commit if you want to preserve the original grouping

Preferred split:

1. `Refactor the engine into a template-driven structure`
2. `Reorganize the docs around the new render model`

Why:

- the current commit mixes structural code migration with a full docs rewrite
- splitting makes later bisects and reviews much easier

#### `b3bb586` -> split or reword

Current:

`Fix`

Recommended cleanup:

- preferred: split into runtime fix and workflow/tooling fix
- acceptable: reword as a single corrective commit

Preferred split:

1. `Correct template resolution and remove manual template identity`
2. `Add bundle-based site and PDF workflows`

Single-commit fallback:

`Repair template resolution and align CI workflows`

Why:

- `Fix` does not communicate scope, intent, or architecture impact
- this commit actually changed both runtime logic and workflow setup

### Safe Procedure

1. Create a new branch from `main`.
2. Run `git rebase -i --root`.
3. Mark commits as `reword` or `edit` based on the map above.
4. For any commit marked `edit` and intended to split:
   - run `git reset HEAD^`
   - create the smaller replacement commits in the desired order
   - continue the rebase
5. Validate that the final tree matches `main`.
6. Push the cleaned branch as a separate branch only.

### Validation Checklist

- final file tree matches the intended state
- rewritten subjects are specific and descriptive
- sectioned commit bodies are used only where they add value
- breaking-change framing appears only on commits that truly change a contract
- `main` remains untouched unless you explicitly decide otherwise later
