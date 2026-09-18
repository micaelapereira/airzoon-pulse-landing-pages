/* ==========================================================================
   airZoon Pulse — Offer Page — dev-only preview bar behavior
   Same generic pattern as the Campaign Pages project's shared/preview-bar.js:
   any preview-bar button group keyed on a shared data-* attribute toggles
   that attribute on .splash-page-container and updates aria-pressed within
   its own group — a variant can add a new toggle group (e.g. a future
   archetype's own state) without touching this file.
   Also wires the two copy-to-clipboard buttons shared by every variant
   (offer code + airZoon coupon code) and the variant switcher <select>.
   ========================================================================== */

(function(){
  var TOGGLE_ATTRS = ["offer-type", "flow-state", "connect", "coupon", "offer-status", "incentive-style", "connect-style"];

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

  /* The code offer is redeemed in person — a real visitor never returns to
     this page in an "after claiming" state, so that combination is blocked
     in the preview instead of showing a screen nobody will ever see. */
  function wireCodeAfterGuard(container){
    var offerButtons = document.querySelectorAll(".preview-bar [data-offer-type]");
    var afterButton = document.querySelector('.preview-bar [data-flow-state="after"]');
    var beforeButton = document.querySelector('.preview-bar [data-flow-state="before"]');
    if (!afterButton || !beforeButton) return;

    function sync(){
      var isCode = container && container.getAttribute("data-offer-type") === "code";
      afterButton.disabled = isCode;
      if (isCode && afterButton.getAttribute("aria-pressed") === "true") {
        beforeButton.click();
      }
    }

    offerButtons.forEach(function(btn){
      btn.addEventListener("click", sync);
    });
    sync();
  }

  function init(){
    var container = document.querySelector(".splash-page-container");

    TOGGLE_ATTRS.forEach(function(attr){
      wireToggleGroup(container, attr);
    });

    wireCodeAfterGuard(container);

    var nav = document.getElementById("variant-nav");
    if (nav) {
      nav.addEventListener("change", function(e){
        window.location.href = e.target.value;
      });
    }

    wireCopyButtons("[data-copy-code]", "¡Código copiado!");
    wireCopyButtons("[data-copy-coupon]", "¡Copiado!");
    wireLanguageSwitcher();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
