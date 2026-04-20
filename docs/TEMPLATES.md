# Templates, Layouts & Themes

Template = layout + theme.

## Create a Template

`_templates/modern.md`

```md
---
layout: app_engine

page_layout: modern
page_theme: modern
---
```

## Layout Rules

Layouts:

- structure only
- no colors
- no tokens
- no app bar

Must wrap content in:

```html
<div class="page">
```

## Theme Rules

Themes:

- define tokens only
- never change layout
- never style app bar

Example:

```css
.page {
  --text: #111;
  --accent: #2563eb;
}
```

## Set Default Template

`_data/app_config.yml`

```yml
default_template: modern
```

## Preview

Each template is available at:

`/templates/<name>/`
