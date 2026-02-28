# Resume Content

Location:

`_data/resumes/*.yml`

## Activate a Resume

Edit:

`_data/app_config.yml`

```yml
default_resume: my-resume
```

## Structure Example

```yml
basics:
  name:
  email:

summary:

skills:
  - name:
    keywords: []
```

## Rules

Content must be:

- layout agnostic
- theme agnostic
- no HTML

## Future Direction

- YAML schema validation
- generated resumes from structured input
