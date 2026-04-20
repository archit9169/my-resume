## System Overview

This system renders structured resume data into multiple visual and output formats using a unified, config-driven pipeline.

It is built around a data-first model where content, presentation, and output are independent layers.

## How It Works

### 1. Resume Variants

Each resume exists as structured YAML: _data/resumes/<resume>.yml

Multiple variants can coexist and share the same templates.

### 2. Default Selection

The base URL renders: default_resume + default_template as defined in: _data/app_config.yml

### 3. Template Rendering

Templates are interchangeable views of the same content.

Each template defines:

- layout
- theme 

Switching templates does not modify the resume content.

### 4. Runtime Template Switching

No rebuild required.

### 5. Output Pipeline

The rendered HTML is the single source for:
- web output  
- print layout  
- PDF export
    - A4 optimized
    - visually identical to the web layout

