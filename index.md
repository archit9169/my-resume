---
layout: app_engine
permalink: /
---

{% assign app = site.data.app_config %}
{% assign resume = site.data.resumes[app.default_resume] %}

{% capture temp_theme %}
<link rel="stylesheet"
      href="{{ '/assets/themes/classic.css' | relative_url }}">
{% endcapture %}

{% include layouts/classic.html %}