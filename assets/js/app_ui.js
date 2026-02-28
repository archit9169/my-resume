document.addEventListener("DOMContentLoaded", () => {

  /* ---------------- PRINT BUTTON ---------------- */

  const printBtn = document.getElementById("printBtn");
  if (printBtn) {
    printBtn.addEventListener("click", () => window.print());
  }

  /* ---------------- PDF DOWNLOAD VISIBILITY ---------------- */

  const pdfLink = document.getElementById("pdfDownload");

  if (!pdfLink) return;

  fetch(pdfLink.href, { method: "HEAD" })
    .then(res => {
      if (res.ok) {
        pdfLink.style.display = "inline-block";
      }
    })
    .catch(() => {
      // keep hidden silently
    });

  /* ---------------- TEMPLATE SWITCH ACTIVE STATE ---------------- */

  const params = new URLSearchParams(window.location.search);
  const templateKey = params.get("template");

  if (templateKey) {

    document
      .querySelectorAll(".template-btn")
      .forEach(btn => {

        if (btn.dataset.template === templateKey) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }

      });

    if (window.APP_TEMPLATES?.[templateKey]) {

      const tpl = window.APP_TEMPLATES[templateKey];

      const themeCss = document.querySelector("link[href*='/assets/themes/']");

      if (themeCss) {
        themeCss.href =
          `${themeCss.href.split('/assets/themes/')[0]}/assets/themes/${tpl.theme}.css`;
      }

    }
  }

});