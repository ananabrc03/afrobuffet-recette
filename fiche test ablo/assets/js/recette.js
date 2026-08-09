/* =====================================================================
   AFRO BUFFET — Interactions fiche recette
   Partage (natif + fallback copie), impression.
   Progressive enhancement : la page reste lisible sans ce script.
   ===================================================================== */
(function () {
  "use strict";

  var shareBtn = document.getElementById("btn-share");
  var printBtn = document.getElementById("btn-print");
  var toast = document.getElementById("toast");

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    // force reflow pour rejouer la transition
    void toast.offsetWidth;
    toast.classList.add("is-visible");
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(function () {
      toast.classList.remove("is-visible");
      window.setTimeout(function () { toast.hidden = true; }, 300);
    }, 2200);
  }

  /* ---------- PARTAGE ---------- */
  if (shareBtn) {
    shareBtn.addEventListener("click", function () {
      var shareData = {
        title: document.title,
        text: "Recette Afro Buffet",
        url: window.location.href
      };

      if (navigator.share) {
        navigator.share(shareData).catch(function () { /* annulé : rien */ });
        return;
      }

      // fallback : copie du lien
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareData.url).then(function () {
          showToast("Lien copié");
        }).catch(function () {
          legacyCopy(shareData.url);
        });
      } else {
        legacyCopy(shareData.url);
      }
    });
  }

  function legacyCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "absolute";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); showToast("Lien copié"); }
    catch (e) { showToast("Copiez le lien : " + text); }
    document.body.removeChild(ta);
  }

  /* ---------- IMPRESSION ---------- */
  if (printBtn) {
    printBtn.addEventListener("click", function () {
      window.print();
    });
  }
})();
