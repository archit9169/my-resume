## My Resume — Data-First Resume System (Jekyll + YAML)

A system for rendering structured resume data through interchangeable templates.

Write your resume once in YAML → render it with multiple templates → export the same output to web and PDF.

Single source → multiple outputs (YAML → Web → Print → PDF)

## ✨ Core Principles

- **Single Source Content Model**  
  Resume data is independent of layout and format, and the same content powers every template and output.

- **Config-Driven Variant Selection**  
  A central configuration selects the default active resume and template, while allowing multiple resume versions to coexist.

- **Composable Template Architecture**  
  Layout and theme combine to render the same data in different visual designs without altering the content.

- **Web ↔ Print Output Parity**  
  The same HTML produces both the live site and the PDF output.

- **Artifact-Free Static Deployment**  
  Build outputs are generated at deploy time and the system runs fully on GitHub Pages without a backend.

## 🚀 Getting Started

1️⃣ Fork the repository → Enable gitHub pages.

2️⃣ Add your resume like `_data/resumes/my-resume.yml`

3️⃣ Set your default active resume & template in `_data/app_config.yml`

````yaml
default_resume: my-resume
default_template: classic
````

4️⃣ Commit & push → Github site rebuilds automatically.

🖨 Export to PDF → Print and then save as pdf.

## 📚 Documentation

- [Overview](docs/OVERVIEW.md)
- [Architecture](docs/ARCHITECTURE.md)
  - [Request → Rendering Flow](docs/architecture/RENDERING_FLOW.md)
  - [File and Directory Structure](docs/architecture/DIRECTORY_STRUCTURE.md)
- [Templates, Layouts & Themes](docs/TEMPLATES.md)
- [Resume Content](docs/RESUMES.md)

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

**v1 — Data-First Content Model**

- Structured YAML as the single source of truth
- Config-driven default rendering
- Multiple resume variants
- Template-based presentation

**v2 — Unified Output Pipeline**

- Print stylesheet for A4 export
- Web ↔ print layout parity
- Runtime-safe PDF controls

**v3 — Artifact-Free Deployment Pipeline**

- HTML → PDF during build
- Artifact-based GitHub Pages deployment
- Zero binary commits

### 🎯 Long-Term Vision

At its core, this is a **data-first content rendering system** for static hosting, where structured content is authored once and transformed through a unified pipeline.

It is capable of:

- storing multiple resume variants  
- rendering them through multiple templates  
- exporting them to multiple output formats  

from a single structured data source — without changing the content model and without duplicating content or presentation logic.