document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const print_button = document.getElementById("print-button");
  if (print_button) {
    print_button.addEventListener("click", () => window.print());
  }

  const pdf_download = document.getElementById("pdf-download");
  if (pdf_download) {
    fetch(pdf_download.href, { method: "HEAD" })
      .then((response) => {
        if (response.ok) {
          pdf_download.style.display = "inline-block";
        }
      })
      .catch(() => {
        // Keep the link hidden when the artifact is not published.
      });
  }

  const params = new URLSearchParams(window.location.search);
  const theme_buttons = Array.from(
    document.querySelectorAll(".theme-btn[data-theme]")
  );
  const available_themes = new Set(
    theme_buttons.map((button) => button.dataset.theme).filter(Boolean)
  );
  const requested_theme = params.get("theme")?.trim();
  const resolved_theme =
    requested_theme && available_themes.has(requested_theme)
      ? requested_theme
      : body.dataset.theme || "base";

  if (body) {
    body.dataset.theme = resolved_theme;
  }

  theme_buttons.forEach((button) => {
    button.classList.toggle("active", button.dataset.theme === resolved_theme);
    button.addEventListener("click", (event) => {
      event.preventDefault();

      const target_theme = button.dataset.theme || "base";
      const url = new URL(window.location.href);
      if (target_theme === "base") {
        url.searchParams.delete("theme");
      } else {
        url.searchParams.set("theme", target_theme);
      }

      body.dataset.theme = target_theme;
      theme_buttons.forEach((candidate) => {
        candidate.classList.toggle("active", candidate === button);
      });
      window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
    });
  });

  const template_key = params.get("template")?.trim();
  if (!template_key) {
    return;
  }

  const template_buttons = Array.from(
    document.querySelectorAll(".template-btn[data-template]")
  );
  const requested_template = template_buttons.find(
    (button) => button.dataset.template === template_key
  );
  if (!requested_template) {
    return;
  }

  const target = new URL(
    requested_template.getAttribute("href"),
    window.location.origin
  );
  if (requested_theme) {
    target.searchParams.set("theme", requested_theme);
  }
  if (window.location.pathname !== target.pathname || window.location.search) {
    window.location.replace(`${target.pathname}${target.search}${window.location.hash}`);
  }
});
