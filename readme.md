# My Resume (Work In Progress)

## Directory Structure

my-resume/
│── _config.yml                      ← Jekyll build configuration
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
│       ├── layout-single-column.html
│       └── layout-two-column.html
│
│── assets/
│   ├── css/
│   │   └── base.css                ← typography + layout system
│   │
│   └── themes/
│       ├── theme-modern.css       ← active visual theme
│       └── theme-classic.css      ← future theme
│
│── index.md                        ← entry point (routes to engine)
│
└── .github/workflows/
    └── build-resume-pdf.yml       ← manual PDF generator

## Architecture Overview:

Content layer:
_data/resumes/
- role-based resume variants (Cerner L3, consulting, compact)

Control layer:
_data/active-resume.yml
- selects active resume, layout, and theme

Render engine:
_layouts/resume-engine.html
- loads active configuration
- injects selected content
- applies selected layout
- attaches theme

Layout strategies:
_includes/resume-layouts/
- single-column
- two-column (future)

Styling system:
assets/css/base.css
- typography and spacing

assets/themes/
- switchable visual themes

Entry point:
index.md → routes through resume engine