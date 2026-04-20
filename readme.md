# My Resume - Data-First Resume System (Jekyll + YAML)

A system for rendering structured resume data through reusable templates.

Write your resume once in YAML, render it through named templates, and drive the same output to web, print, and PDF-oriented workflows.

Single source -> multiple outputs.

## Getting Started

1. Add your resume data like `_data/resumes/my-resume.yml`.
2. Update the active resume and template inside `_data/app_config.yml`.

```yml
selected_resume: my-resume
selected_template: classic
```

3. Preview `/` for the configured default render, or open `/templates/classic/` to preview a template route directly.
4. If you are deploying through GitHub Pages, enable Pages once for the repository, then push to `main`.

`deploy_site.yml` handles the site build and publish flow.

Export to PDF with browser print / save as PDF, or run `deploy_with_pdf.yml` for the manual PDF artifact workflow.

For the full setup and extension guide for resumes, app config, templates, and theme overrides, see [Getting Started](docs/GETTING_STARTED.md).

## How It Works

The engine reads `_data/app_config.yml` to select the active resume and template, loads structured content from `_data/resumes/`, resolves the routeable template manifest from `_templates/`, and then renders that content through a co-located template pack plus shared system assets.

The same rendered HTML drives the live site, browser print / save as PDF, and the manual PDF artifact workflow. `/` renders the configured defaults, `/templates/<template>/` renders a template route through the same engine, `?template=<template>` redirects to the matching route, and `?theme=<theme>` switches the active view theme for the current template.

For the full walkthrough of the render flow, repository structure, and runtime behavior, see [How It Works](docs/HOW_IT_WORKS.md).

## Future Plans

Roadmap and planned capabilities live in [Future Directions](docs/FUTURE_DIRECTIONS.md).

This includes future resume/template expansion, PDF pipeline evolution, and the longer-term direction for the system.
