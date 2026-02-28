# ⚙️ Request → Rendering Flow
This section describes how a request is transformed into the final rendered output for your resume.

The system follows a deterministic execution path:
```
→ Entry Document
→ Render Engine
→ Rendered Output
→ (Optional) Runtime View Override
```

Inside the Render Engine, execution follows a relatively fixed sequence:
```
→ Load Configuration
→ Load Resume Data
→ Resolve Template
→ Attach System Assets
→ Compose View
→ Final HTML Rendered
```

The flow is deterministic and stateless where changing the default resume variant, the default template, and/or the template via URL or permalink produces a new rendered output without modifying structured content, duplicating layout logic, or duplicating presentation logic.

## 1️⃣ Entry Document
A request enters through a document that forwards control to the Render Engine.

There are multiple valid entry points which guarantees a single, consistent rendering mechanism for all resume variants and templates.

All entry documents ultimately delegate to: `_layouts/app_engine.html`

### 1.1 Base URL
```
URL: /
Page: index.md

Resume: 
    app_config.deafult_resume
    → _data/resumes/<resume>.yml
Template: 
    app_config.default_template
    → _templates/<template>.md
```

### 1.2 Template Permalinks
```
URL: /templates/<template>/
Page: _templates/<template>.md

Resume: 
    app_config.deafult_resume
    → _data/resumes/<resume>.yml
Template: 
    → _templates/<template>.md
```

Each template is also a pre-generated page with its own URL which:
- does not bypass the engine
- uses the same structured resume data
- applies a different template

## 2️⃣ Render Engine
`_layouts/app_engine.html`

This is the only runtime execution layer, and it orchestrates the entire rendering process in a relatively fixed order.

### 2.1 Load Configuration — Resolve Default State
`_data/app_config.yml`

This determines the default:
- resume variant → `default_resume`
- template → `default_template`

### 2.2 Load Structured Resume Data — Content Source
`_data/resumes/<resume>.yml` 
 
Each resume exists as structured YAML with following characteristics:
- role-based variants (Cerner L3, consulting, compact)
- pure structured data
- no layout or styling logic
- multiple variants can coexist and share the same template
- single source of content for the page

### 2.3 Resolve Template — Select Active View
`_templates/<template>.md`

Templates are real, pre-generated pages. A template is an interchangeable view of the same content.

This determines:
- which layout to use → `page_layout`  
- which theme to apply → `page_theme` 

Switching templates results in: `same data → different layout + theme → new HTML output` without changing the content model.

This maintains the separation: `content → structure → presentation`

### 2.4 Attach System Assets — Global Runtime Environment

Loaded once by the engine for all templates:
- `assets/css/base.css` → structural foundation
- `assets/css/print.css` → print & PDF rules
- `assets/css/app_bar.css` → system UI styling
- `assets/js/app_ui.js` → runtime behaviour
- `_includes/app_bar.html` → global controls

#### The Global UI:
- exists outside the resume layout
- is hidden automatically in print
- is independent of theme styling

#### The App Bar provides:
- template switcher
- print trigger
- PDF download

### 2.5 Compose View — Layout + Theme
This produces the final rendered HTML.

#### Layout
`_includes/layouts/<layout>.html`

- transforms structured YAML into semantic HTML
- defines section order and document structure
- remains independent of visual styling

#### Theme
`assets/themes/<theme>.css`

- applies visual design using design tokens
- does not modify structure or content
- remains layout-independent

## 3️⃣ Output Layer — View Rendered Site
The rendered HTML becomes the single source for:

### 🌐 Web View
→ Rendered by Jekyll and served via GitHub Pages.

### 🖨 Print / Save as PDF 
→ Triggered by: `window.print()`

### 📄 Future Build-Generated PDF 
→ The download button will shown only if `/resume.pdf` file exists

Print and Build-Generated PDF use the same HTML with a print stylesheet, ensuring:
- A4-optimized output 
- clean pagination
- app bar and UI controls hidden
- visual parity with the web version

### 4️⃣ Runtime View Override

Runtime switching occurs after the initial render.

Triggered by: `?template=<template>`

Future support: `?resume=<resume>`

This re-invokes the render engine in the browser context without:
- modifying _data/app_config.yml
- regenerateing static pages
- reloading structured content from disk

It resolves a different view using already available data.

This allows: `same data → different template → new rendered output` without altering the system’s default state.