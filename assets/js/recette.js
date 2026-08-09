/* =====================================================================
   AFRO BUFFET — Interactions fiche recette (partage + impression)
   Progressive enhancement : la page reste lisible sans ce script.
   ===================================================================== */
(function () {
  "use strict";
  var shareBtn = document.getElementById("btn-share");
  var printBtn = document.getElementById("btn-print");
  var toast = document.getElementById("toast");

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.hidden = false;
    void toast.offsetWidth;
    toast.classList.add("is-visible");
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(function () {
      toast.classList.remove("is-visible");
      window.setTimeout(function () { toast.hidden = true; }, 300);
    }, 2200);
  }

  function legacyCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text; ta.setAttribute("readonly", "");
    ta.style.position = "absolute"; ta.style.left = "-9999px";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); showToast("Lien copié"); }
    catch (e) { showToast("Copiez le lien : " + text); }
    document.body.removeChild(ta);
  }

  if (shareBtn) {
    shareBtn.addEventListener("click", function () {
      var data = { title: document.title, text: "Recette Afro Buffet", url: location.href };
      if (navigator.share) { navigator.share(data).catch(function () {}); return; }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(data.url).then(function () { showToast("Lien copié"); })
          .catch(function () { legacyCopy(data.url); });
      } else { legacyCopy(data.url); }
    });
  }

  if (printBtn) {
    printBtn.addEventListener("click", function () { window.print(); });
  }
})();
