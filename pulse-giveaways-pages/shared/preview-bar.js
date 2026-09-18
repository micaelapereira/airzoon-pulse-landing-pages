/* ==========================================================================
   airZoon Pulse — Giveaway Page — dev-only preview bar behavior
   Same generic pattern as the sibling archetypes' shared/preview-bar.js:
   any preview-bar button group keyed on a shared data-* attribute toggles
   that attribute on .splash-page-container and updates aria-pressed within
   its own group — a variant can add a new toggle group without touching
   this file. No "offer-type" group here (no WhatsApp/Code split on this
   archetype, just one entry form).
   Also wires the airZoon coupon copy-to-clipboard button, the entry-form
   submit, and the variant switcher <select>.
   ========================================================================== */

(function(){
  var TOGGLE_ATTRS = ["flow-state", "connect", "coupon", "offer-status", "incentive-style"];

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

  /* Entry form submit — no real backend in this mockup, so submitting just
     flips the preview to the "after" state and syncs the preview bar's own
     Flow toggle, the same way a real submission would move a visitor from
     the form to the confirmation screen. */
  function wireEntryForm(container){
    var form = document.querySelector("[data-giveaway-form]");
    if (!form) return;
    form.addEventListener("submit", function(e){
      e.preventDefault();
      if (container) container.setAttribute("data-flow-state", "after");
      var afterButton = document.querySelector('.preview-bar [data-flow-state="after"]');
      var beforeButton = document.querySelector('.preview-bar [data-flow-state="before"]');
      if (afterButton) afterButton.setAttribute("aria-pressed", "true");
      if (beforeButton) beforeButton.setAttribute("aria-pressed", "false");
    });
  }

  /* Collapse/reveal the whole dev preview bar (client feedback, Steve,
     2026-09-16) — lets a reviewer see the real design without the bar's
     chrome, with an easy way back via the small pill it leaves behind. */
  function wireCollapse(){
    var bar = document.querySelector(".preview-bar");
    var hideBtn = document.getElementById("preview-bar-hide");
    var revealBtn = document.getElementById("preview-bar-show");
    if (!bar || !hideBtn || !revealBtn) return;

    hideBtn.addEventListener("click", function(){
      bar.classList.add("is-hidden");
      revealBtn.hidden = false;
    });
    revealBtn.addEventListener("click", function(){
      bar.classList.remove("is-hidden");
      revealBtn.hidden = true;
    });
  }

  function init(){
    var container = document.querySelector(".splash-page-container");

    TOGGLE_ATTRS.forEach(function(attr){
      wireToggleGroup(container, attr);
    });

    wireEntryForm(container);

    var nav = document.getElementById("variant-nav");
    if (nav) {
      nav.addEventListener("change", function(e){
        window.location.href = e.target.value;
      });
    }

    wireCopyButtons("[data-copy-coupon]", "¡Copiado!");
    wireLanguageSwitcher();
    wireCollapse();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
