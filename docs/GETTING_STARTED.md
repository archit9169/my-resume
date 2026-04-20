# Getting Started

This document is the deep build-and-extend guide for the resume engine.

Use it when you want to:

- add your own resume
- point the site at that resume
- use an existing template
- create a new template
- add a new theme override

If you want the deeper runtime explanation first, start with [HOW_IT_WORKS.md](HOW_IT_WORKS.md).

For the exact contract surface, use:

- [APP_CONFIG_SCHEMA.json](specs/APP_CONFIG_SCHEMA.json)
- [RESUME_SCHEMA.json](specs/RESUME_SCHEMA.json)
- [TEMPLATE_SCHEMA.yaml](specs/TEMPLATE_SCHEMA.yaml)

## 1. Add a Resume

### 1.1 File / Path

`_data/resumes/*.yml`

### 1.2 Expected Pattern

Keep resume files content-only.

Start from a shape like:

```yml
basics:
  name:
  title:
  email:
  phone:
  location:
  linkedin:

summary:

skills:
  - title:
    items: []

experience:
  - company:
    role:
    duration:
    location:
    project:
    points: []
```

### 1.3 Example

`_data/resumes/cerner-l3.yml`

### 1.4 How to Create or Update Safely

1. Copy the shape of the example resume file.
2. Keep the file content-only.
3. Add or update values without moving layout, theme, or app-bar logic into the YAML.
4. Save the new file under `_data/resumes/`.

For the exact field contract, see [RESUME_SCHEMA.json](specs/RESUME_SCHEMA.json).

### 1.5 What Not to Do

- no layout logic
- no theme logic
- no JavaScript behavior
- no app bar or routing configuration

## 2. Set the Active App Config

### 2.1 File / Path

`_data/app_config.yml`

### 2.2 Expected Pattern

Keep app config focused on active selection, feature flags, and template-level overrides.

```yml
selected_resume: cerner-l3
selected_template: classic

feature_flags:
  pdf_download_enabled: false

templates:
  classic:
    app_bar_enabled: true
    default_theme: null

  basic:
    app_bar_enabled: false
    default_theme: null
```

### 2.3 Example

The current tracked example is:

`_data/app_config.yml`

### 2.4 How to Create or Update Safely

1. Point `selected_resume` at a file that exists under `_data/resumes/`.
2. Point `selected_template` at a template that exists under `_templates/`.
3. Keep `feature_flags` aligned with the current runtime capabilities.
4. Use `templates.<slug>` only for template-level overrides such as `app_bar_enabled` and `default_theme`.

For the exact field contract, see [APP_CONFIG_SCHEMA.json](specs/APP_CONFIG_SCHEMA.json).

### 2.5 What Not to Do

- do not move resume content into app config
- do not define layout structure in app config
- do not define CSS hooks or token values in app config
- do not rely on silent fallback if a referenced file does not exist

## 3. Use an Existing Template

### 3.1 File / Path

`_data/app_config.yml` and `_templates/*.md`

### 3.2 Expected Pattern

If you want to render your resume with an existing template, you usually only change the active selection:

```yml
selected_resume: cerner-l3
selected_template: classic
```

Optional template-specific overrides stay under:

```yml
templates:
  classic:
    app_bar_enabled: true
    default_theme: forest
```

### 3.3 Example

Use the tracked template manifests under `_templates/`, such as:

- `_templates/classic.md`
- `_templates/basic.md`

### 3.4 How to Create or Update Safely

1. Add or update your resume file.
2. Set `selected_resume` in `_data/app_config.yml`.
3. Set `selected_template` to an existing template slug.
4. Optionally set `default_theme` only if that theme slug is exposed by the template manifest.
5. Preview the selected template route and optional theme override.

### 3.5 What Not to Do

- do not point `selected_template` at a slug that has no template manifest
- do not set `default_theme` to a slug the template does not expose
- do not edit template-pack files if you only need to choose an existing template

## 4. Create a New Template

### 4.1 File / Path

- `_templates/<slug>.md`
- `_includes/template_packs/<slug>/layout.html`
- `_includes/template_packs/<slug>/style.css`
- optional `_includes/template_packs/<slug>/themes/*.css`

### 4.2 Expected Pattern

Every template uses:

- one routeable manifest file
- one co-located template-pack folder
- one required `layout.html`
- one required `style.css`
- zero or more optional override themes

Template manifest example:

```md
---
themes:
  - forest
app_bar_enabled: true
default_theme: null
---
```

File responsibility boundaries:

- `layout.html` owns structure, section order, wrappers, and semantic hooks
- `assets/css/common.css` owns shared resume styling and shared hook behavior
- `style.css` owns the base theme and template-specific presentation
- `themes/<theme>.css` owns theme overrides for the current template
- `assets/css/app_bar.css` owns app shell styling and print/PDF rules

### 4.3 Example

Start from the hidden reference template:

- `_templates/basic.md`
- `_includes/template_packs/basic/`

### 4.4 How to Create or Update Safely

1. Copy `_templates/basic.md` to `_templates/<new-template>.md`.
2. Copy `_includes/template_packs/basic/` to `_includes/template_packs/<new-template>/`.
3. Rename the slug consistently across the manifest and template-pack folder.
4. Edit `layout.html` for structure and section ordering.
5. Edit `style.css` for the base theme and template-specific presentation.
6. Keep hooks and tokens aligned with [TEMPLATE_SCHEMA.yaml](specs/TEMPLATE_SCHEMA.yaml).
7. Use the hidden `basic` template as the safest starting point because it already matches the current manifest, layout, style, and hook/token contract.

### 4.5 What Not to Do

- do not add extra template identity fields beyond the filename slug
- do not move app bar markup into `layout.html`
- do not put print or PDF behavior into template assets
- do not create a template pack without both `layout.html` and `style.css`

## 5. Add a Theme Override

### 5.1 File / Path

- `_includes/template_packs/<template>/themes/<theme>.css`
- `_templates/<template>.md`

### 5.2 Expected Pattern

Register override themes in the template manifest:

```md
---
themes:
  - forest
  - midnight
app_bar_enabled: true
default_theme: forest
---
```

Then scope the override CSS to the current template and theme:

```css
body[data-template="classic"][data-theme="forest"] {
  --accent-color: #1f5a43;
  --section-title-color: var(--accent-color);
}
```

### 5.3 Example

Start from:

`_includes/template_packs/classic/themes/forest.css`

### 5.4 How to Create or Update Safely

1. Add one CSS file under `_includes/template_packs/<template>/themes/`.
2. Add that slug to `themes` in `_templates/<template>.md`.
3. Override tokens first, then selectors only when tokens are not enough.
4. Optionally set `default_theme` to that slug in the template manifest or app config.

For the full hook/token contract, see [TEMPLATE_SCHEMA.yaml](specs/TEMPLATE_SCHEMA.yaml).

When both app config and the template manifest define `default_theme`, app config wins.

### 5.5 What Not to Do

- do not list the implicit base theme in `themes`
- do not set `default_theme` to a slug that is not registered
- do not style the app bar from a template theme override
- do not use an unscoped selector that bleeds across templates

## 6. Preview and Verify

Use these checks after making changes:

### 6.1 Preview the main routes

- `/` renders the selected app config state
- `/templates/<template>/` renders a template route directly
- `/?template=<template>` redirects to the matching template route
- `/templates/<template>/?theme=<theme>` keeps the current template and switches the view theme

### 6.2 Verify the current contract

Check that:

- the selected resume exists under `_data/resumes/`
- the selected template exists under `_templates/`
- each template has `layout.html` and `style.css`
- override themes live under `_includes/template_packs/<template>/themes/`
- the manifest `themes`, `app_bar_enabled`, and `default_theme` values align with the template pack
- shared assets stay in `assets/css/common.css`, `assets/css/app_bar.css`, and `assets/js/app_bar.js`

### 6.3 Debug failures

If a page renders incorrectly, inspect the engine debug comment in the HTML output to confirm:

- selected resume
- selected template
- selected theme
- template include paths
- configuration error state

For the full runtime walkthrough, see [HOW_IT_WORKS.md](HOW_IT_WORKS.md).
