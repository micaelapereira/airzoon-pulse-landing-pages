/* ==========================================================================
   airZoon Pulse — Survey Page — dev-only preview bar behavior
   Same generic pattern as the sibling archetypes' shared/preview-bar.js:
   any preview-bar button group keyed on a shared data-* attribute toggles
   that attribute on .splash-page-container and updates aria-pressed within
   its own group. This archetype's real interaction — tapping a star — also
   drives that same state, so it has to sync the preview bar back (see
   wireSurveyScale), not just be driven by it.
   Also wires the suggested-review copy button, the WhatsApp feedback
   submit, the airZoon coupon copy-to-clipboard button, and the variant
   switcher <select>.
   ========================================================================== */

(function(){
  var TOGGLE_ATTRS = ["survey-step", "survey-branch", "connect", "incentive-style"];

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

  /* Mirrors a real interaction's result back onto the preview bar's own
     toggle group, so the two stay in sync whichever one the reviewer used
     last — same idea as the Giveaway Page's form-submit sync. */
  function syncPreviewToggle(attr, value){
    document.querySelectorAll(".preview-bar [data-" + attr + "]").forEach(function(btn){
      btn.setAttribute("aria-pressed", btn.getAttribute("data-" + attr) === value ? "true" : "false");
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

  /* One-tap star scale: tapping a star fills it (and every star before it),
     picks the branch (4-5 = high, 1-3 = low), and advances straight to the
     result screen — no separate submit button, per brief ("una sola
     pulsación"). Syncs the preview bar's own Step/Branch toggles so both
     controls agree regardless of which one a reviewer used last. */
  function wireSurveyScale(container){
    document.querySelectorAll(".survey-scale").forEach(function(scale){
      var stars = Array.prototype.slice.call(scale.querySelectorAll(".survey-star"));
      stars.forEach(function(star){
        star.addEventListener("click", function(){
          var value = parseInt(star.getAttribute("data-value"), 10);
          stars.forEach(function(s){
            var v = parseInt(s.getAttribute("data-value"), 10);
            s.classList.toggle("is-filled", v <= value);
          });
          var branch = value >= 4 ? "high" : "low";
          if (container) {
            container.setAttribute("data-survey-step", "result");
            container.setAttribute("data-survey-branch", branch);
          }
          syncPreviewToggle("survey-step", "result");
          syncPreviewToggle("survey-branch", branch);
        });
      });
    });
  }

  /* High branch: copies the suggested review text (not a fixed code, so it
     doesn't fit wireCopyButtons' data-copy-code/-coupon pattern) — reads
     the sibling text straight from the DOM instead of duplicating it into
     a data attribute. */
  function wireReviewCopyButtons(){
    document.querySelectorAll("[data-copy-review]").forEach(function(btn){
      btn.addEventListener("click", function(){
        var block = btn.closest(".review-suggested");
        var textEl = block && block.querySelector(".review-suggested-text");
        var text = textEl ? textEl.textContent.trim() : "";
        if (navigator.clipboard && text) {
          navigator.clipboard.writeText(text).catch(function(){});
        }
        /* Swap only the label span, not the whole button: the button now
           carries a copy-icon SVG too, and btn.textContent would wipe it. */
        var label = btn.querySelector(".review-suggested-copy-label");
        var prevLabel = label ? label.textContent : btn.textContent;
        if (label) { label.textContent = "¡Copiado!"; } else { btn.textContent = "¡Copiado!"; }
        setTimeout(function(){
          if (label) { label.textContent = prevLabel; } else { btn.textContent = prevLabel; }
        }, 1600);
      });
    });
  }

  /* Low branch: sends whatever the visitor typed straight to the
     responsable's WhatsApp as a pre-filled message — no real backend in
     this mockup, so "submitting" the textarea just builds the wa.me link
     on click instead of collecting it server-side. */
  function wireFeedbackSubmit(){
    document.querySelectorAll("[data-survey-whatsapp]").forEach(function(btn){
      btn.addEventListener("click", function(e){
        e.preventDefault();
        var number = btn.getAttribute("data-survey-whatsapp");
        var textarea = document.querySelector(".survey-textarea");
        var feedback = textarea ? textarea.value.trim() : "";
        var message = feedback
          ? "Feedback de un cliente: " + feedback
          : "Quiero dejar mi feedback sobre mi visita.";
        window.open("https://wa.me/" + number + "?text=" + encodeURIComponent(message), "_blank", "noopener");
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

    wireSurveyScale(container);
    wireReviewCopyButtons();
    wireFeedbackSubmit();

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
