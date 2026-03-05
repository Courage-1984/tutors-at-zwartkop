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
    + '<a href="index.html" class="nav-logo" aria-label="Tutors@Zwartkop Tuisblad">'
    + '<img src="assets/logos/new/new_logo.webp" alt="Tutors@Zwartkop" height="61" style="width:auto;">'
    + '</a>'
    + '<button class="nav-toggle" aria-label="Oopmaak menu" aria-expanded="false">'
    + '<span></span><span></span><span></span>'
    + '</button>'
    + '<ul class="nav-menu" role="list">'
    + '<li><a href="index.html">Tuis</a></li>'
    + '<li><a href="about.html">Oor Ons</a></li>'
    + '<li><a href="academics.html">Akademie</a></li>'
    + '<li><a href="admissions.html">Toelating</a></li>'
    + '<li><a href="gallery.html">Galery</a></li>'
    + '<li><a href="calendar.html">Kalender</a></li>'
    + '<li><a href="contact.html" class="nav-cta">Kontak Ons</a></li>'
    + '</ul>'
    + '</div>'
    + '</nav>';

  /* ---- Footer HTML ----------------------------------------- */
  var FOOTER = '<footer class="footer bg-navy">'
    + '<div class="container">'
    + '<div class="footer-grid">'
    + '<div class="footer-brand">'
    + '<img src="assets/logos/new/new_logo2.webp" alt="Tutors@Zwartkop" height="112" style="width:auto;">'
    + '<p>Afrikaanse tuisonderrig leersentrum vir Graad RR tot Graad 12 waar Christelike beginsels, normes en waardes die grondslag vorm van elke leerder se reis.</p>'
    + '<p style="margin-top:1rem; font-size:0.8rem; opacity:0.85;">Kurrikulum: Oxford (RR\u20134)</p>'
    + '<p style="margin-top:0.25rem; font-size:0.8rem; opacity:0.85;"><a href="https://www.impaq.co.za/" target="_blank" rel="noopener" style="color:var(--color-teal);">IMPAQ (Graad 5\u201312)</a></p>'
    + '<a href="https://www.impaq.co.za/" target="_blank" rel="noopener" style="display:block; margin-top:0.5rem;"><img src="assets/logos/Impaq_logo.webp" alt="Curriculum supplied by IMPAQ" style="height:48px; width:auto; max-width:200px;" width="200" height="48"></a>'
    + '</div>'
    + '<div class="footer-col">'
    + '<h5>Vinnige Skakels</h5>'
    + '<ul>'
    + '<li><a href="index.html">Tuis</a></li>'
    + '<li><a href="about.html">Oor Ons</a></li>'
    + '<li><a href="academics.html">Akademie</a></li>'
    + '<li><a href="admissions.html">Toelating</a></li>'
    + '<li><a href="gallery.html">Galery</a></li>'
    + '<li><a href="calendar.html">Kalender</a></li>'
    + '<li><a href="contact.html">Kontak Ons</a></li>'
    + '</ul>'
    + '</div>'
    + '<div class="footer-col">'
    + '<h5>Aktiwiteite</h5>'
    + '<ul>'
    + '<li><a href="academics.html#swembad">Warm Water Swembad</a></li>'
    + '<li><a href="academics.html#rugby">RSD Rugby</a></li>'
    + '<li><a href="academics.html#witjassies">Die Witjassies</a></li>'
    + '<li><a href="admissions.html#nasorg">Nasorg Sentrum</a></li>'
    + '</ul>'
    + '</div>'
    + '<div class="footer-col">'
    + '<h5>Kontak</h5>'
    + '<div class="footer-contact-item"><span class="icon">\uD83D\uDCCD</span><span>250 Summit Ave, Cranbrookvale (Clubview), Centurion</span></div>'
    + '<div class="footer-contact-item"><span class="icon">\uD83D\uDCDE</span><span>Marina Botha: <a href="tel:0829221528">082 922-1528</a></span></div>'
    + '<div class="footer-contact-item"><span class="icon">\u2709\uFE0F</span><a href="mailto:marinabotha@vodamail.co.za">marinabotha@vodamail.co.za</a></div>'
    + '</div>'
    + '</div>'
    + '</div>'
    + '<div class="footer-disclaimer" style="background:rgba(0,0,0,0.15); padding:0.6rem 0; font-size:0.8rem; text-align:center; color:rgba(198,228,233,0.9);">'
    + 'Selfoon vry \u00B7 AI vry \u00B7 Vaste rooster \u00B7 Kwartale soos skole \u00B7 Ekstra klasse & CAT/IT beskikbaar'
    + '</div>'
    + '<div class="footer-bottom">'
    + '<div class="container" style="display:flex;justify-content:space-between;width:100%;">'
    + '<span>\u00A9 2026 Tutors@Zwartkop. Alle regte voorbehou. | Designed and hosted by <a href="https://logi-ink.co.za/" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;opacity:1;">Logi-Ink</a></span>'
    + '<span>250 Summit Ave, Centurion</span>'
    + '</div>'
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
