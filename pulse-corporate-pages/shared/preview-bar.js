/* ==========================================================================
   airZoon Pulse — Corporate Page — dev-only preview bar behavior
   Same generic pattern as the sibling archetypes' shared/preview-bar.js:
   any preview-bar button group keyed on a shared data-* attribute toggles
   that attribute on .splash-page-container and updates aria-pressed within
   its own group. No flow-state/offer-status groups here — this archetype
   is a static announcement (see shared/pulse-components.css), not a claim
   flow, so there's no before/after/expired to toggle. "offer-type" is
   reused as-is from tokens.css for the CTA choice (Guardar fecha /
   Escribir por WhatsApp) instead of inventing new CSS for the same
   two-mutually-exclusive-panels mechanism Oferta already has.
   Also wires the airZoon coupon copy-to-clipboard button and the variant
   switcher <select>.
   ========================================================================== */

(function(){
  var TOGGLE_ATTRS = ["offer-type", "connect", "incentive-style", "connect-style"];

  function wireToggleGroup(container, attr){
    var selector = ".preview-bar [data-" + attr + "]";
    var buttons = document.querySelectorAll(selector);
    buttons.forEach(function(btn){
      btn.addEventListener("click", function(){
        buttons.forEach(function(b){ b.setAttribute("aria-pressed", "false"); });
        btn.setAttribute("aria-pressed", "true");
        if (container) {
          container.setAttribute("data-" + attr, btn.getAttribute("data-" + attr));
        }
      });
    });
  }

  function wireCopyButtons(selector, feedbackText){
    document.querySelectorAll(selector).forEach(function(btn){
      btn.addEventListener("click", function(){
        var code = btn.getAttribute("data-copy-code") || btn.getAttribute("data-copy-coupon");
        if (navigator.clipboard && code) {
          navigator.clipboard.writeText(code).catch(function(){});
        }
        var sub = btn.querySelector(".cta-sub");
        if (sub) {
          var prevText = sub.textContent;
          sub.textContent = feedbackText;
          setTimeout(function(){ sub.textContent = prevText; }, 1600);
        } else {
          var prevLabel = btn.textContent;
          btn.textContent = feedbackText;
          setTimeout(function(){ btn.textContent = prevLabel; }, 1600);
        }
      });
    });
  }

  /* Real page chrome, not preview scaffolding — identical markup/behavior in
     every variant (flag trigger + dropdown), so it lives here once instead
     of being copied into each file's own inline <script>. */
  function wireLanguageSwitcher(){
    var trigger = document.getElementById("lang-trigger");
    var dropdown = document.getElementById("lang-dropdown");
    if (!trigger || !dropdown) return;

    trigger.addEventListener("click", function(e){
      e.stopPropagation();
      var isOpen = !dropdown.hasAttribute("hidden");
      if (isOpen) {
        dropdown.setAttribute("hidden", "");
        trigger.setAttribute("aria-expanded", "false");
      } else {
        dropdown.removeAttribute("hidden");
        trigger.setAttribute("aria-expanded", "true");
      }
    });

    dropdown.querySelectorAll(".az-lang-option").forEach(function(opt){
      opt.addEventListener("click", function(){
        dropdown.querySelectorAll(".az-lang-option").forEach(function(o){ o.setAttribute("aria-selected", "false"); });
        opt.setAttribute("aria-selected", "true");
        var flag = opt.querySelector(".flag");
        if (flag) trigger.textContent = flag.textContent;
        dropdown.setAttribute("hidden", "");
        trigger.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", function(){
      dropdown.setAttribute("hidden", "");
      trigger.setAttribute("aria-expanded", "false");
    });
  }

  function init(){
    var container = document.querySelector(".splash-page-container");

    TOGGLE_ATTRS.forEach(function(attr){
      wireToggleGroup(container, attr);
    });

    var nav = document.getElementById("variant-nav");
    if (nav) {
      nav.addEventListener("change", function(e){
        window.location.href = e.target.value;
      });
    }

    wireCopyButtons("[data-copy-coupon]", "¡Copiado!");
    wireLanguageSwitcher();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
