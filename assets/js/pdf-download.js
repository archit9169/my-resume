document.addEventListener("DOMContentLoaded", function () {
  const link = document.getElementById("pdfDownload");

  if (!link) return;

  fetch(link.href, { method: "HEAD" })
    .then(res => {
      if (res.ok) {
        link.style.display = "inline-block";
      }
    })
    .catch(() => {
      // keep hidden silently
    });
});