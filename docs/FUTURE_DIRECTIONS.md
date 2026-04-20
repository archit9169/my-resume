# Future Directions

This document owns roadmap notes and planned capabilities that are useful to preserve but are not part of the current runtime contract.

## 1. Resume Selection UI

The current runtime resolves one active resume through `_data/app_config.yml`.

A future step may add a resume selector in the app bar, with the same kind of visibility and default-selection overrides currently used for templates.

## 2. Stronger Schema-Driven Validation

The repository now has canonical spec ownership under `docs/specs/`:

- `APP_CONFIG_SCHEMA.json`
- `RESUME_SCHEMA.json`
- `TEMPLATE_SCHEMA.yaml`

Validation is not enforced today, but those files can become the future source of truth if validation is added later.

## 3. Template and Theme Evolution

The current model supports:

- one template layout per template slug
- one implicit base theme per template
- zero or more override themes per template

Possible future work:

- stronger cross-template theme portability if the token contract stabilizes further
- richer starter templates
- safer AI-assisted template generation from the hidden `basic` reference template

## 4. PDF Deployment Pipeline

Today, the repository supports:

- browser print from rendered HTML
- a manual PDF artifact workflow

Planned evolution may include a unified build that publishes the site and a generated PDF together without committing binary files to the repository.

## 5. Long-Term Direction

At its core, this project is a data-first resume rendering system for static hosting.

The long-term direction remains:

- write resume content once
- render it through multiple templates
- allow lightweight theme customization through exposed hooks and tokens
- keep web, print, and PDF outputs aligned around the same rendered HTML
