# How It Works

This document explains how the resume engine works at runtime, what each moving part means, and how the current repository is organized around that flow.

System mental model:

```text
app config
-> selected resume data
-> selected template manifest
-> shared assets + template assets
-> rendered HTML
```

The system stays deterministic by keeping content, selection, structure, presentation, and app-shell behavior separate.

For the build-your-own guide, see [GETTING_STARTED.md](GETTING_STARTED.md).

The exact contract shapes live in:

- [APP_CONFIG_SCHEMA.json](specs/APP_CONFIG_SCHEMA.json)
- [RESUME_SCHEMA.json](specs/RESUME_SCHEMA.json)
- [TEMPLATE_SCHEMA.yaml](specs/TEMPLATE_SCHEMA.yaml)

## 1. Repository Structure

The repository is organized around a small number of responsibilities:

```text
my-resume/
|-- _config.yml
|-- _data/
|   |-- app_config.yml              <- active selection + per-template overrides
|   `-- resumes/
|       `-- *.yml                   <- structured resume data
|-- _layouts/
|   `-- app_engine.html             <- render orchestration
|-- _templates/
|   `-- *.md                        <- routeable template manifests
|-- _includes/
|   |-- app_bar.html                <- global controls include
|   `-- template_packs/
|       `-- <template>/
|           |-- layout.html         <- template structure
|           |-- style.css           <- template base theme
|           `-- themes/
|               `-- *.css           <- optional theme overrides
|-- assets/
|   |-- css/
|   |   |-- common.css              <- shared resume styling/hooks
|   |   `-- app_bar.css             <- app shell + print/PDF styling
|   `-- js/
|       `-- app_bar.js              <- template/theme navigation + print controls
|-- docs/
|   |-- HOW_IT_WORKS.md
|   |-- GETTING_STARTED.md
|   |-- FUTURE_DIRECTIONS.md
|   `-- specs/
|       |-- APP_CONFIG_SCHEMA.json
|       |-- RESUME_SCHEMA.json
|       `-- TEMPLATE_SCHEMA.yaml
|-- index.md
|-- readme.md
|-- AGENT.md
`-- CONTRIBUTING.md
```

## 2. System Rules

- Keep rendering deterministic: `app config -> resume -> template -> shared assets + template assets -> HTML`.
- Keep resume files content-only.
- Let template identity come from the filename slug.
- Keep the base theme implicit and mandatory for every template family.
- Treat `?template=<slug>` as navigation-only.
- Treat `?theme=<slug>` as a client-side view selection inside the current template.
- Surface missing resume or missing template selection as explicit engine errors.

## 3. Request -> Rendering Flow

This section describes how a request is transformed into the final rendered output for the resume.

The system follows a deterministic execution path:

```text
-> Entry Document
-> Render Engine
-> Rendered Output
-> (Optional) Runtime View Override
```

Inside the Render Engine, execution follows a relatively fixed sequence:

```text
-> Load App Config
-> Load Resume Data
-> Resolve Template
-> Attach Shared Assets
-> Compose View
-> Final HTML Rendered
```

The flow is deterministic and stateless: changing the selected resume, changing the selected template, or navigating to a different template route produces a new rendered output without duplicating content or mutating template identity in the browser.

### 3.1 Entry Document
`index.md` and `_templates/*.md`

A request enters through a document that forwards control to the Render Engine.

There are multiple valid entry points, which guarantees a single, consistent rendering mechanism for the default route and every template route.

All entry documents ultimately delegate to: `_layouts/app_engine.html`

### 3.1.1 Base URL

```text
URL: /
Page: index.md

Resume:
    app_config.selected_resume
    -> _data/resumes/<resume>.yml
Template:
    app_config.selected_template
    -> _templates/<template>.md
```

At the base route, the engine uses app config to decide both the resume and the template.

### 3.1.2 Template Route

```text
URL: /templates/<template>/
Page: _templates/<template>.md

Resume:
    app_config.selected_resume
    -> _data/resumes/<resume>.yml
Template:
    -> _templates/<template>.md
```

Each template is also a pre-generated page with its own URL which:

- does not bypass the engine
- uses the same structured resume data
- preserves template-level app config overrides

### 3.2 Render Engine
`_layouts/app_engine.html`

This is the only runtime execution layer, and it orchestrates the entire rendering process in a relatively fixed order.

#### 3.2.1 Load App Config
`_data/app_config.yml`

Jekyll loads files from `_data/` into `site.data`.

In this project, `_data/app_config.yml` is the canonical source for:

- `selected_resume`
- `selected_template`
- `feature_flags`
- per-template overrides under `templates.<slug>`

That means app config is not the content itself and not the presentation itself. It is the selector and override layer that tells the engine what to load first.

For the exact field shape, see [APP_CONFIG_SCHEMA.json](specs/APP_CONFIG_SCHEMA.json).

#### 3.2.2 Load Resume Data
`_data/resumes/<resume>.yml`

A resume is one structured content file under `_data/resumes/`.

The engine loads the selected dataset through:

```liquid
site.data.resumes[_selected_resume]
```

Each resume stays:

- pure structured data
- free of layout or styling logic
- reusable across multiple templates
- the single content source for the rendered page

For the exact resume shape, see [RESUME_SCHEMA.json](specs/RESUME_SCHEMA.json).

#### 3.2.3 Resolve Template
`_templates/<template>.md`

Templates are real Jekyll collection documents. Files under `_templates/` become routeable collection pages, and the filename defines the template slug.

The template manifest determines:

- which template slug is active
- which override themes are exposed
- whether the template is shown in the app bar by default
- which default theme is preferred before URL overrides

At runtime the engine also resolves the matching template pack:

- `_includes/template_packs/<template>/layout.html`
- `_includes/template_packs/<template>/style.css`
- optional `_includes/template_packs/<template>/themes/*.css`

This maintains the separation:

```text
resume data
-> template manifest
-> template pack
-> rendered HTML
```

For the exact manifest, hook, and token contract, see [TEMPLATE_SCHEMA.yaml](specs/TEMPLATE_SCHEMA.yaml).

#### 3.2.4 Attach Shared Assets
`assets/css/common.css`, `assets/css/app_bar.css`, `assets/js/app_bar.js`

Loaded once by the engine for all templates:

- `assets/css/common.css` -> shared resume styling, shared hooks, responsive behavior
- `assets/css/app_bar.css` -> app shell styling and print/PDF rules
- `assets/js/app_bar.js` -> runtime template/theme navigation, print, and optional PDF-link behavior
- `_includes/app_bar.html` -> global controls include

The app bar is global system UI:

- it exists outside the template layout
- it is not part of the resume structure
- it owns runtime controls and print/PDF behavior

It currently provides:

- template switching
- theme switching for the current template
- print
- optional PDF download when enabled and present

#### 3.2.5 Compose View
`_includes/template_packs/<template>/layout.html` and `style.css`

This is where the selected template becomes actual rendered HTML.

The composition looks like:

```text
resume data
-> layout.html
-> assets/css/common.css
-> style.css
-> optional theme override.css
-> rendered HTML
```

Shared assets stay outside template folders.

Template assets stay under `_includes/template_packs/<template>/`.

That keeps the responsibilities stable:

- content -> `_data/resumes/*.yml`
- selection/overrides -> `_data/app_config.yml`
- template identity -> `_templates/*.md`
- structure -> `layout.html`
- base presentation -> `style.css`
- theme overrides -> `themes/*.css`
- app shell + print/PDF behavior -> shared assets

### 3.3 Output Layer -> View Rendered Site

The rendered HTML becomes the single source for:

#### 3.3.1 Web View

Rendered by Jekyll and served through the Pages deployment flow.

#### 3.3.2 Print / Save as PDF

Triggered by:

`window.print()`

#### 3.3.3 Manual PDF Artifact

Triggered by:

`.github/workflows/deploy_with_pdf.yml`

The manual workflow builds the site and exports `resume.pdf` as an artifact. It does not automatically publish that PDF back to the live site.

Print and manual PDF artifact output use the same HTML with shared print rules, preserving parity across web and print-oriented flows.

### 3.4 Runtime View Override
`assets/js/app_bar.js`

Runtime view changes occur after the initial render.

#### 3.4.1 Template Redirect

Triggered by:

`?template=<template>`

```text
URL: /?template=<template>
Handler: assets/js/app_bar.js

Behavior:
    read query parameter
    -> redirect to /templates/<template>/
```

This is navigation-only. It does not switch templates inside the browser.

#### 3.4.2 Theme Override

Triggered by:

`?theme=<theme>`

```text
URL: /templates/<template>/?theme=<theme>
Handler: assets/js/app_bar.js

Behavior:
    read query parameter
    -> keep the current template route
    -> set body[data-theme] for the current template view
```

This is a view-layer selection for the current template only.

Template visibility resolves in this order:

1. app config override under `templates.<slug>.app_bar_enabled`
2. template manifest `app_bar_enabled`

Theme selection resolves in this order:

1. `?theme=<slug>` in the current URL
2. app config override under `templates.<slug>.default_theme`
3. template manifest `default_theme`
4. implicit base theme

That means app config wins when both app config and the template manifest define `app_bar_enabled` or `default_theme`.

## 4. Error Handling and Debug Strategy

The engine does not silently fall back when configuration is wrong.

If the selected resume cannot be resolved, it renders an explicit configuration error.

If the selected template cannot be resolved, it renders an explicit configuration error.

If a template references a missing include path, Jekyll fails the build during authoring.

Every rendered page also includes a debug comment that records the resolved state:

```html
<!--
template: ...
resolved: ...
template_layout_include: ...
template_style_include: ...
selected_resume: ...
selected_theme: ...
page_collection: ...
page_slug: ...
configuration_error: ...
-->
```

This is the first place to inspect when a route or theme does not resolve the way you expect.
