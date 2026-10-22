/* Pacifica Sweep marketing site — progressive enhancement only.
   Works with JS disabled: the <html> element never gets the .js class, so
   the mobile nav toggle stays hidden and the nav links render as a visible
   stacked list (see styles.css). With JS enabled, the toggle controls the
   collapsible nav with aria-expanded semantics. */
(function () {
  'use strict';

  // Signal JS availability for progressive-enhancement CSS (.js scoping).
  if (document.documentElement && document.documentElement.classList) {
    document.documentElement.classList.add('js');
  }

  // Mobile navigation toggle
  var toggle = document.querySelector('[data-nav-toggle]');
  var nav = document.querySelector('[data-site-nav]');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Escape dismisses the open nav (keyboard convenience): focus stays on
    // the still-visible toggle and aria-expanded stays in sync.
    if (typeof document.addEventListener === 'function') {
      document.addEventListener('keydown', function (ev) {
        if (ev && ev.key === 'Escape' && nav.classList.contains('open')) {
          nav.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }

  // Footer year
  var years = document.querySelectorAll('[data-year]');
  for (var i = 0; i < years.length; i++) {
    years[i].textContent = String(new Date().getFullYear());
  }

  /* Reduced motion is handled dynamically by the CSS
     `@media (prefers-reduced-motion: reduce)` block in styles.css, which
     re-evaluates live if the OS setting changes mid-session. Do NOT set an
     inline scrollBehavior here: inline style would beat the stylesheet and
     pin the page to 'auto' even after the user turns reduced motion off. */
})();
