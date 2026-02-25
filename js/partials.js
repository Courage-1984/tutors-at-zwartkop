/* =============================================================
   Tutors @ Zwartkop — Synchronous Partial Injection
   
   This script is loaded WITHOUT defer/async so it runs during
   HTML parsing, immediately after the navbar placeholder div.
   The nav is injected before the browser renders any page
   content — zero FOUC, zero CLS from partial injection.
   
   Footer injection is deferred to DOMContentLoaded since the
   footer placeholder is at the bottom of the body.
   ============================================================= */

(function () {

  /* ---- Nav HTML -------------------------------------------- */
  var NAV = '<nav class="navbar" role="navigation" aria-label="Hoofnavigasie">'
    + '<div class="nav-container">'
    +   '<a href="index.html" class="nav-logo" aria-label="Tutors@Zwartkop Tuisblad">'
    +     '<img src="assets/logos/logo%20+%20name/White.svg" alt="Tutors@Zwartkop" width="120" height="44">'
    +   '</a>'
    +   '<button class="nav-toggle" aria-label="Oopmaak menu" aria-expanded="false">'
    +     '<span></span><span></span><span></span>'
    +   '</button>'
    +   '<ul class="nav-menu" role="list">'
    +     '<li><a href="index.html">Tuis</a></li>'
    +     '<li><a href="about.html">Oor Ons</a></li>'
    +     '<li><a href="academics.html">Akademie</a></li>'
    +     '<li><a href="admissions.html">Toelating</a></li>'
    +     '<li><a href="gallery.html">Galery</a></li>'
    +     '<li><a href="calendar.html">Kalender</a></li>'
    +     '<li><a href="contact.html" class="nav-cta">Kontak Ons</a></li>'
    +   '</ul>'
    + '</div>'
    + '</nav>';

  /* ---- Footer HTML ----------------------------------------- */
  var FOOTER = '<footer class="footer bg-navy">'
    + '<div class="container">'
    +   '<div class="footer-grid">'
    +     '<div class="footer-brand">'
    +       '<img src="assets/logos/logo%20+%20name%20+%20slogan/White.svg" alt="Tutors@Zwartkop" width="220" height="80">'
    +       '<p>Prim\u00EAre fase tuisonderrig leersentrum waar Christelike beginsels, normes en waardes die grondslag vorm van elke leerder se reis.</p>'
    +     '</div>'
    +     '<div class="footer-col">'
    +       '<h5>Vinnige Skakels</h5>'
    +       '<ul>'
    +         '<li><a href="index.html">Tuis</a></li>'
    +         '<li><a href="about.html">Oor Ons</a></li>'
    +         '<li><a href="academics.html">Akademie</a></li>'
    +         '<li><a href="admissions.html">Toelating</a></li>'
    +         '<li><a href="gallery.html">Galery</a></li>'
    +         '<li><a href="calendar.html">Kalender</a></li>'
    +         '<li><a href="contact.html">Kontak Ons</a></li>'
    +       '</ul>'
    +     '</div>'
    +     '<div class="footer-col">'
    +       '<h5>Aktiwiteite</h5>'
    +       '<ul>'
    +         '<li><a href="academics.html#swembad">Warm Water Swembad</a></li>'
    +         '<li><a href="academics.html#rugby">RSD Rugby</a></li>'
    +         '<li><a href="academics.html#witjassies">Die Witjassies</a></li>'
    +         '<li><a href="admissions.html#nasorg">Nasorg Sentrum</a></li>'
    +       '</ul>'
    +     '</div>'
    +     '<div class="footer-col">'
    +       '<h5>Kontak</h5>'
    +       '<div class="footer-contact-item"><span class="icon">\uD83D\uDCCD</span><span>250 Summit Ave, Cranbrookvale (Clubview), Centurion</span></div>'
    +       '<div class="footer-contact-item"><span class="icon">\uD83D\uDCDE</span><span>Marina: <a href="tel:0829221528">082 922-1528</a></span></div>'
    +       '<div class="footer-contact-item"><span class="icon">\uD83D\uDCDE</span><span>Genevieve: <a href="tel:0729419096">072 941-9096</a></span></div>'
    +       '<div class="footer-contact-item"><span class="icon">\u2709\uFE0F</span><a href="mailto:marinabotha@vodamail.co.za">marinabotha@vodamail.co.za</a></div>'
    +     '</div>'
    +   '</div>'
    + '</div>'
    + '<div class="footer-bottom">'
    +   '<div class="container" style="display:flex;justify-content:space-between;width:100%;">'
    +     '<span>\u00A9 2025 Tutors@Zwartkop. Alle regte voorbehou. | Designed and hosted by <a href="https://logi-ink.co.za/" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;opacity:1;">Logi-Ink</a></span>'
    +     '<span>250 Summit Ave, Centurion</span>'
    +   '</div>'
    + '</div>'
    + '</footer>';

  /* ---- Inject nav immediately (runs during HTML parse) ------ */
  var navEl = document.getElementById('navbar-placeholder');
  if (navEl) navEl.outerHTML = NAV;

  /* ---- Inject footer at DOMContentLoaded ------------------- */
  function injectFooter() {
    var footerEl = document.getElementById('footer-placeholder');
    if (footerEl) footerEl.outerHTML = FOOTER;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectFooter);
  } else {
    injectFooter();
  }

}());
