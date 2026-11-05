/* devingriffin.com — homepage interactions (vanilla, no dependencies) */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Hero film: plays once, holds on the last frame; phone gets the vertical cut.
     Reduced motion (or blocked autoplay) shows the last frame as a still. ---- */
  var hv = document.querySelector('.hero__video');
  if (hv) {
    var media = hv.parentNode;
    var showStill = function () { media.classList.add('is-still'); };
    if (reduce) {
      showStill(); hv.removeAttribute('src');
    } else {
      var phone = window.matchMedia('(max-width: 860px)').matches;
      if (phone) hv.poster = hv.getAttribute('data-poster-mobile');
      hv.src = hv.getAttribute(phone ? 'data-mobile' : 'data-desktop');
      hv.addEventListener('error', showStill);
      var p = hv.play();
      if (p && p.catch) p.catch(showStill);
    }
  }

  /* ---- Reveal: Figma timeline translated to scroll-in, once per element ----
     Elements alternate left / right in document order, exactly like the Figma
     keyframes (±92px desktop, ±36.8px mobile, 350ms, 32% → 100% opacity).
     Items entering together are staggered 70ms apart. */
  var items = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
  items.forEach(function (el, i) { el.setAttribute('data-reveal', i % 2 ? 'r' : 'l'); });

  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var queue = [], flushing = false;
    var flush = function () {
      queue.sort(function (a, b) { return items.indexOf(a) - items.indexOf(b); });
      queue.forEach(function (el, n) {
        el.style.setProperty('--delay', (n * 70) + 'ms');
        el.classList.add('is-in');
      });
      queue = []; flushing = false;
    };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { queue.push(e.target); io.unobserve(e.target); }
      });
      if (queue.length && !flushing) { flushing = true; requestAnimationFrame(flush); }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---- Carousels: duplicate the list for a seamless loop, set a slow speed,
     pause on hover / focus (CSS) and on touch-hold (here) ---- */
  var SPEED = 22; // px per second — slower than the round-1 mockups (~40)
  Array.prototype.forEach.call(document.querySelectorAll('.marquee'), function (m) {
    var track = m.querySelector('.marquee__track');
    var group = track.querySelector('.marquee__group');
    var clone = group.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
    var setDur = function () {
      var w = group.getBoundingClientRect().width;
      if (w) track.style.setProperty('--dur', Math.round(w / SPEED) + 's');
    };
    setDur();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(setDur);
    window.addEventListener('resize', setDur);

    var release;
    m.addEventListener('pointerdown', function () { clearTimeout(release); m.classList.add('is-held'); });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (t) {
      m.addEventListener(t, function () {
        clearTimeout(release);
        release = setTimeout(function () { m.classList.remove('is-held'); }, 1200);
      });
    });
  });

  /* ---- Work dropdown: hover (with a short delay) or click on desktop ---- */
  var wmBtn = document.querySelector('.nav__toggle');
  var wm = document.getElementById('work-menu');
  if (wmBtn && wm) {
    var hoverable = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    var wmTimer = 0;
    var here = location.pathname.replace(/index\.html$/, '');
    Array.prototype.forEach.call(wm.querySelectorAll('a'), function (a) {
      var p = a.getAttribute('href'); var file = p.split('/').pop();
      if ((p.length > 1 && here.indexOf(p) !== -1) || (file && location.pathname.split('/').pop() === file)) a.setAttribute('aria-current', 'page');
    });
    var openWm = function () { clearTimeout(wmTimer); wm.hidden = false; wmBtn.setAttribute('aria-expanded', 'true'); };
    var closeWm = function (focusBtn) { clearTimeout(wmTimer); wm.hidden = true; wmBtn.setAttribute('aria-expanded', 'false'); if (focusBtn) wmBtn.focus(); };
    wmBtn.addEventListener('click', function () { wm.hidden ? openWm() : closeWm(); });
    if (hoverable) {
      [wmBtn, wm].forEach(function (el) {
        el.addEventListener('mouseenter', function () { clearTimeout(wmTimer); wmTimer = setTimeout(openWm, 90); });
        el.addEventListener('mouseleave', function () { clearTimeout(wmTimer); wmTimer = setTimeout(function () { closeWm(); }, 220); });
      });
    }
    wmBtn.addEventListener('keydown', function (e) { if (e.key === 'ArrowDown') { e.preventDefault(); openWm(); wm.querySelector('a').focus(); } });
    wm.addEventListener('keydown', function (e) {
      var links = Array.prototype.slice.call(wm.querySelectorAll('a')); var i = links.indexOf(document.activeElement);
      if (e.key === 'Escape') { e.preventDefault(); closeWm(true); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); links[Math.min(i + 1, links.length - 1)].focus(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); if (i <= 0) closeWm(true); else links[i - 1].focus(); }
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !wm.hidden) closeWm(true); });
    document.addEventListener('click', function (e) { if (!wm.hidden && !wm.contains(e.target) && !wmBtn.contains(e.target)) closeWm(); });
    wm.addEventListener('focusout', function (e) { if (!wm.contains(e.relatedTarget) && e.relatedTarget !== wmBtn) closeWm(); });
  }

  /* ---- Work inside the mobile menu ---- */
  var mToggle = document.querySelector('.menu__toggle');
  var mSub = document.getElementById('menu-work');
  if (mToggle && mSub) {
    mToggle.addEventListener('click', function () {
      var open = mSub.hidden; mSub.hidden = !open; mToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* ---- Mobile menu: full-screen beige panel ---- */
  var menu = document.getElementById('menu');
  var openBtn = document.getElementById('menu-open');
  var closeBtn = document.getElementById('menu-close');
  var openMenu = function () {
    menu.hidden = false;
    openBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };
  var closeMenu = function () {
    menu.hidden = true;
    openBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    openBtn.focus();
  };
  if (menu && openBtn && closeBtn) {
    openBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) closeMenu(); });
    menu.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  }

  /* ---- Feature images behind the four underlined words ----
     Each word opens its image full screen. Files live in assets/words/:
     <word>-desktop.webp and <word>-mobile.webp (mobile used at 860px and below). */
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lb-img');
  var lbMobile = document.getElementById('lb-mobile');
  var lbFallback = document.getElementById('lb-fallback');
  var lbClose = document.getElementById('lb-close');
  var lastWord = null;
  var closeLb = function () {
    if (lb.hidden || lb.classList.contains('is-closing')) return;
    lb.classList.add('is-closing');
    setTimeout(function () {
      lb.hidden = true; lb.classList.remove('is-closing');
      document.body.style.overflow = '';
      if (lastWord) lastWord.focus();
    }, reduce ? 0 : 300);
  };
  Array.prototype.forEach.call(document.querySelectorAll('.word'), function (btn) {
    btn.addEventListener('click', function () {
      var w = btn.getAttribute('data-word');
      lastWord = btn;
      lbFallback.hidden = true;
      lbFallback.textContent = w;
      lbImg.alt = 'Feature image: ' + w;
      lbMobile.srcset = 'assets/words/' + w + '-mobile.webp';
      lbImg.src = 'assets/words/' + w + '-desktop.webp';
      var small = window.matchMedia('(max-width: 860px)').matches;
      document.getElementById('lb-backdrop').style.backgroundImage = 'url(assets/words/' + w + (small ? '-mobile' : '-desktop') + '.webp)';
      lb.hidden = false;
      document.body.style.overflow = 'hidden';
      lbClose.focus();
    });
  });
  if (lb) {
    lbImg.addEventListener('error', function () { lbFallback.hidden = false; });
    lbClose.addEventListener('click', closeLb);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLb(); });
  }

  /* ---- Contact form ----
     Not connected to a mail service yet. Set data-endpoint on the form
     (e.g. a Formspree or Netlify Forms URL) and it will POST there. */
  var form = document.getElementById('contact-form');
  var status = document.getElementById('cf-status');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.elements.name.value.trim();
      var q = form.elements.question.value.trim();
      var email = form.elements.email ? form.elements.email.value.trim() : 'n/a';
      if (!name || !q || !email) { status.textContent = 'Add your name, email and a question, then submit.'; return; }
      if (form.elements.email && !form.elements.email.checkValidity()) { status.textContent = 'That email address doesn’t look right.'; return; }
      var endpoint = form.getAttribute('data-endpoint');
      if (!endpoint) {
        // no form service yet: hand the message to the visitor's email app instead
        var subj = form.elements.subject.value.trim() || ('Website enquiry from ' + name);
        window.location.href = 'mailto:devingriffin75@gmail.com?subject=' + encodeURIComponent(subj) + '&body=' + encodeURIComponent(q + '\n\n— ' + name);
        status.textContent = 'Opening your email app…';
        return;
      }
      status.textContent = 'Sending…';
      fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (r) {
          if (!r.ok) throw new Error();
          form.reset();
          status.textContent = 'Thanks, ' + name + '. Your message is in my inbox and I’ll reply soon.';
        })
        .catch(function () { status.textContent = 'That didn’t send. Email devingriffin75@gmail.com instead.'; });
    });
  }

  // Case study title: scale the client name to fill its column exactly, once fonts are in
  var title = document.querySelector('.cs__title');
  if (title) {
    var fitTitle = function () {
      title.style.fontSize = '';
      var box = title.parentElement.clientWidth - parseFloat(getComputedStyle(title.parentElement).paddingLeft) - parseFloat(getComputedStyle(title.parentElement).paddingRight);
      var w = title.getBoundingClientRect().width;
      if (!w || !box) return;
      var size = parseFloat(getComputedStyle(title).fontSize) * (box / w) * 0.995;
      title.style.fontSize = Math.min(size, 160) + 'px';
    };
    fitTitle();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitTitle);
    var fitT; window.addEventListener('resize', function () { clearTimeout(fitT); fitT = setTimeout(fitTitle, 100); });
  }
})();
