# 📂 Directory Structure

```
my-resume/
│── _config.yml                     ← Jekyll build configuration
│
│── _data/
│   ├── app_config.yml              ← runtime switchboard (resume/template)
│   └── resumes/
│       ├── cerner-l3.yml           ← primary resume content
│       ├── consulting.yml          ← future variant
│       └── compact.yml             ← future variant
│
│── _layouts/
│   └── app_engine.html             ← universal render controller
│
│── _includes/
│   └── layouts/
│       ├── classic.html           ← current active visual layout
│       └── modern.html            ← future variant
│
│── assets/
│   ├── css/
│   │   └── base.css                ← typography + layout system
│   │   └── print.css
│   │   └── app_bar.css
│   │
│   ├── themes/
│   |   ├── classic.css         ← current active visual theme
│   |   └── modern.css          ← future variant
|   |
│   └── js/
│       └── app_ui.css         ← js functions for app bar
|
│── index.md                        ← entry point (routes to engine)
│
└── .github/workflows/
    └── build-resume-pdf.yml        ← PDF generator pipeline
```