# Agent Guide

Read this file first on every new thread before changing code, docs, schemas, or workflows in this repository.

This is the canonical tracked rulebook for AI agents. Use it to understand repo-specific structure, doc ownership, naming, parity requirements, and change-management expectations without relying on prior chat history.

## 1. Non-Negotiable Architecture

- Keep rendering deterministic: `app config -> resume -> template -> shared assets + template assets -> HTML`.
- Keep concerns separated:
  - resume = content
  - app config = selection and overrides
  - template layout = structure
  - template style/theme = presentation
  - app bar = global controls layer
- Treat `_templates/<slug>.md` as the routeable template manifest. Template identity comes from the filename slug.
- Keep template-specific files co-located under `_includes/template_packs/<slug>/`.
- Treat `?template=<slug>` as navigation-only.
- Treat `?theme=<slug>` as a client-side view selection for the current template only.
- Do not silently fall back when resume or template configuration is wrong.
- Keep the app bar outside template layouts. Templates do not own print, PDF, or app-shell behavior.

## 2. Documentation Ownership

Use one clear owner for each kind of information:

- `readme.md` = brief landing page only
- `docs/HOW_IT_WORKS.md` = deep explanation of runtime behavior and render flow
- `docs/GETTING_STARTED.md` = deep human guide for building and extending safely
- `docs/specs/APP_CONFIG_SCHEMA.json` = exact app config contract
- `docs/specs/RESUME_SCHEMA.json` = exact resume-data contract
- `docs/specs/TEMPLATE_SCHEMA.yaml` = exact template/layout/theme/hook/token contract
- `docs/FUTURE_DIRECTIONS.md` = roadmap only
- `CONTRIBUTING.md` = human contributor workflow, review, commit style, history cleanup
- `AGENT.md` = agent-facing rules, parity expectations, and doc ownership map

Do not reintroduce extra explainer docs when the existing owners can be improved instead.

## 3. Documentation Preferences

- Preserve authored structure when it adds meaning, especially the richer render-flow walkthrough in `docs/HOW_IT_WORKS.md`.
- Keep README brief, guided, and high-signal.
- Keep `docs/GETTING_STARTED.md` action-first.
- Keep schemas/specs exhaustive, but do not make them the primary onboarding surface.
- Prefer current-truth documentation over speculative architecture.
- Put future-only ideas in `docs/FUTURE_DIRECTIONS.md`, not in current-state docs.
- Avoid duplication that does not add meaning. A short summary with a link is fine; competing full explanations are not.
- Make preservation-first refactors. Do not flatten rich docs into generic summaries.

## 4. Parity Matrix

When one area changes, update the owning docs and specs together.

| Change area | Must update together | Notes |
| --- | --- | --- |
| `_data/app_config.yml` shape or config-selection behavior | `docs/specs/APP_CONFIG_SCHEMA.json`, `docs/GETTING_STARTED.md`, `docs/HOW_IT_WORKS.md` if runtime meaning changed, `readme.md` only if the brief overview changed | Keep selection/override behavior and schema in sync |
| `_data/resumes/*.yml` shape or rendered section expectations | `docs/specs/RESUME_SCHEMA.json`, `docs/GETTING_STARTED.md`, `docs/HOW_IT_WORKS.md` only if runtime meaning changed | Resume docs should stay content-only |
| Template manifest fields, template-pack structure, shared hooks, tokens, or theme behavior | `docs/specs/TEMPLATE_SCHEMA.yaml`, `docs/GETTING_STARTED.md`, `docs/HOW_IT_WORKS.md` if runtime behavior changed | Template/schema parity is mandatory |
| Route behavior, render flow, debug output, or runtime JS behavior | `docs/HOW_IT_WORKS.md`, `readme.md` if the brief behavior summary changed | Keep render-flow docs accurate |
| Roadmap-only ideas not implemented yet | `docs/FUTURE_DIRECTIONS.md` only | Do not leak future behavior into current docs |
| Repo-specific agent workflow/rules | `AGENT.md`, and local `.agent` memory if needed | `AGENT.md` is the tracked source of truth |
| Human contribution process or commit guidance | `CONTRIBUTING.md` | Reference from `AGENT.md` instead of duplicating |

## 5. Write Operation Protocol

Before making any write operation:

1. Identify which contract area is changing:
   - app config
   - resume data
   - template manifest
   - template-pack structure
   - shared assets
   - route/runtime behavior
   - roadmap only
2. Read the owning prose doc and the owning schema/spec before editing.
3. Use the parity matrix to determine every file that must move together.
4. Make the contract, prose docs, and examples agree in the same pass.
5. Do not leave a partial state where code changed but schema/docs did not.

After making any write operation:

1. Re-check the owning doc boundaries.
2. Re-check the owning schema/spec boundaries.
3. Confirm no future-only behavior leaked into current-state docs.
4. Refresh local `.agent` memory only when tracked repo rules or ownership materially changed.

Do not create a new explainer doc when an existing owner can be improved.

## 6. Doc Maintenance by File

Maintain each tracked doc according to its role:

- `readme.md`
  - brief landing page only
  - keep it guided and high-signal
  - do not turn it into a schema dump or an internal contract inventory
- `docs/HOW_IT_WORKS.md`
  - deep runtime explainer only
  - preserve the richer render-flow structure
  - keep runtime meaning here, not build instructions
- `docs/GETTING_STARTED.md`
  - action-first human construction guide only
  - keep representative examples
  - do not turn it into an exhaustive spec mirror
- `docs/specs/APP_CONFIG_SCHEMA.json`
  - exact app config contract only
- `docs/specs/RESUME_SCHEMA.json`
  - exact resume-data contract only
- `docs/specs/TEMPLATE_SCHEMA.yaml`
  - exhaustive template/layout/theme/hook/token contract only
- `docs/FUTURE_DIRECTIONS.md`
  - roadmap only
  - never document current behavior here
- `CONTRIBUTING.md`
  - human contributor process only
  - commit/review/history guidance only
- `AGENT.md`
  - tracked rulebook for AI agents
  - doc ownership, parity rules, naming, and write-operation behavior

## 7. Naming and Terminology

Use these conventions consistently across code, docs, and specs:

- YAML and Liquid keys use `lower_snake_case`
- CSS hooks and CSS custom properties use `kebab-case`
- template, theme, and resume slugs use `lower-kebab-case`
- runtime/system file names use `lower_snake_case` where possible
- folder names use lowercase
- docs under `docs/` use `ALL_CAPS`
- internal Liquid helper variables start with `_`

Use these public terms by default:

- `resume`
- `template`
- `theme`
- `base theme`
- `app config`
- `app bar`

Avoid casually replacing them with alternate labels such as `preset` or `variant` unless that language becomes an explicit contract.

## 8. Schema and Template Parity

- `docs/specs/TEMPLATE_SCHEMA.yaml` is the exhaustive owner for:
  - template manifest fields
  - required file coupling
  - exposed hooks and `data-slot` regions
  - exposed token surface
  - theme override rules
  - responsibilities and forbidden concerns
- If a layout exposes a new hook or slot, document it in the template schema.
- If shared or template CSS exposes a new token, document it in the template schema with purpose and override guidance.
- If a theme override pattern changes, update the template schema and the construction guide together.
- Keep schema and implementation aligned. Do not let docs describe a hook/token surface the code does not expose.

## 9. Review Priorities

Review for correctness and drift first:

- runtime regressions
- deterministic-render violations
- schema parity drift
- doc ownership drift
- missing updates to linked contracts
- unsupported assumptions or silent fallbacks

When reviewing or changing docs, ask:

1. Is this the right owning file?
2. Did a schema/spec need to change too?
3. Did runtime behavior change, or only authoring guidance?
4. Did current-state docs accidentally absorb future-only detail?

## 10. Edit and Commit Expectations

- Do not silently rewrite unrelated docs while touching one contract area.
- Do not revert user changes you did not make.
- Keep changes explicit and explain architecture impact when behavior changes.
- Use the commit style defined in `CONTRIBUTING.md`.
- If a change is structural, include rationale and architecture impact in the commit body rather than using a vague subject.

## 11. Agent Memory

- Treat `AGENT.md` as the tracked source of truth for future agents.
- Treat local `.agent` memory files as supplemental carry-forward notes, not as the primary rules document.
- If repo rules or ownership change materially, refresh the local memory snapshot so it points back to `AGENT.md` and the current runtime truth.
