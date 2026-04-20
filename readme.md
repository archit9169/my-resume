## My Resume — YAML Driven Rendering System

A config-driven resume platform built on Jekyll.

Single source → multiple outputs  
(YAML → Web → Print → PDF)

### ✨ Core Principles

- Single source of truth → YAML
- Single layout → all output formats
- No binary artifacts in repository
- Runtime-safe on static hosting
- Configurable for multi-resume future

### ✏ Updating Resume Content

Edit:

`_data/resumes/cerner-l3.yml`

Commit & push → site rebuilds automatically.

### 🛠 Local Development

```
bash
bundle exec jekyll serve
```

Open: http://localhost:4000

---

## 📂 Directory Structure

```
my-resume/
│── _config.yml                     ← Jekyll build configuration
│
│── _data/
│   ├── active-resume.yml           ← runtime switchboard (resume/layout/theme)
│   └── resumes/
│       ├── cerner-l3.yml           ← primary resume content
│       ├── consulting.yml          ← future variant
│       └── compact.yml             ← future variant
│
│── _layouts/
│   └── resume-engine.html          ← universal render controller
│
│── _includes/
│   └── resume-layouts/
│       ├── layout-single-column.html           ← current active visual layout
│       └── layout-two-column.html              ← future variant
│
│── assets/
│   ├── css/
│   │   └── base.css                ← typography + layout system
│   │   └── print.css
│   │
│   └── themes/
│       ├── theme-modern.css        ← current active visual theme
│       └── theme-classic.css       ← future variant
│
│── index.md                        ← entry point (routes to engine)
│
└── .github/workflows/
    └── build-resume-pdf.yml        ← PDF generator pipeline

```

## 🧠 Architecture

### 1️⃣ Content Layer

_data/resumes/
- Role-based resume variants (Cerner L3, consulting, compact).
- Pure structured data — no layout logic.

### 2️⃣ Control Layer

_data/active-resume.yml
- Selects active resume, layout, and theme.
- No code changes required to switch output.

### 3️⃣ Render Engine

_layouts/resume-engine.html
- Responsible for:
    - loading active configuration
    - injecting selected content
    - applying selected layout
    - attaching theme and print/pdf stuff
- Acts as the system controller.

### 4️⃣ Layout Layer

_includes/resume-layouts/
- Pure HTML structure.
    - single-column layout
    - two-column layout (future variants)
- No content knowledge.

### 5️⃣ Styling Layer

- Visual styling only.
- Layout-agnostic.

assets/css/base.css
- typography and spacing

assets/themes/
- switchable visual themes

## 🖥 Output Modes

### 🌐 Web View

Rendered by Jekyll → GitHub Pages.

### 🖨 Print / Save as PDF

Triggered by: `window.print()`

Uses: `assets/css/print.css`

Ensures:
- A4 sizing
- clean pagination
- UI controls hidden

### 📄 Future Build-Generated PDF

Will reuse the same HTML + print CSS.
No layout duplication required.

### ⬇ PDF Access (Runtime Safe)

Header provides:
- Download PDF → shown only if file exists
- Print / Save as PDF → always available

The download button:
- auto-detects `/resume.pdf`
- never throws errors on static hosting

---

## Work In Progress
### 🔮 Planned: Resume Deployment Pipeline

Future GitHub Actions flow:

```
build site
→ generate PDF from HTML
→ deploy together
```

No PDF stored in repository.

### 🚀 System Evolution

**v1 — Resume Engine**

- Config-driven rendering
- Data / layout / theme separation
- Multi-variant ready architecture

**v2 — Output System**

- Print stylesheet for A4 export
- Runtime-safe PDF controls
- Web ↔ Print parity

**v3 — Deployment Pipeline (planned)**

- HTML → PDF during build
- Artifact-based Pages deployment
- Zero binary commits

### 🎯 Long-Term Vision

This repository is not just a resume.

It is a:

Config-driven content rendering system  
capable of:

- multiple resume variants
- multiple layouts
- multiple themes
- multiple output formats

from a single structured data source.
