/* =====================================================================
   AFRO BUFFET — Accueil : toggles de familles (indépendants)
   Progressive enhancement : sans JS, toutes les familles restent ouvertes.
   ===================================================================== */
(function () {
  "use strict";

  var families = document.querySelectorAll(".family");

  families.forEach(function (fam) {
    var bar = fam.querySelector(".family__bar");
    var panel = fam.querySelector(".family__panel");
    if (!bar || !panel) return;

    // état initial : replié sauf si data-open="true"
    var open = fam.getAttribute("data-open") === "true";
    setState(fam, bar, open);

    bar.addEventListener("click", function () {
      var isOpen = !fam.classList.contains("is-collapsed");
      setState(fam, bar, !isOpen);   // bascule, indépendant des autres
    });
  });

  function setState(fam, bar, open) {
    fam.classList.toggle("is-collapsed", !open);
    bar.setAttribute("aria-expanded", open ? "true" : "false");
    var use = bar.querySelector(".family__pm use");
    if (use) use.setAttribute("href", open ? "#ic-fermer" : "#ic-ouvrir");
  }
})();
