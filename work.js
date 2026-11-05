/* =====================================================
   Case study gallery lightbox
   Each .gal[data-gallery] button opens its gallery from #gallery-data.
   Keys: ← → to move, Esc to close, Home/End for first/last. Swipe on touch.
   Tall page screenshots scroll vertically inside the stage.
   ===================================================== */
(function () {
  var dataEl = document.getElementById('gallery-data');
  var box = document.getElementById('glb');
  if (!dataEl || !box) return;

  var DATA = JSON.parse(dataEl.textContent);
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (id) { return document.getElementById(id); };
  var img = $('glb-img'), cap = $('glb-cap'), stage = $('glb-stage'), thumbs = $('glb-thumbs');
  var titleEl = $('glb-title'), iEl = $('glb-i'), nEl = $('glb-n');
  var prev = $('glb-prev'), next = $('glb-next'), closeBtn = $('glb-close');
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };

  var slug = null, items = [], index = 0, opener = null;

  function url(slugName, file) { return DATA.base + slugName + '/' + file; }

  function preload(i) {
    var it = items[i]; if (!it) return;
    var p = new Image(); p.decoding = 'async';
    p.srcset = url(slug, it.sm) + ' ' + Math.min(it.w, it.tall ? 780 : 1100) + 'w, ' + url(slug, it.src) + ' ' + it.w + 'w';
    p.sizes = img.sizes;
  }

  function show(i, dir) {
    index = (i + items.length) % items.length;
    var it = items[index];
    box.classList.toggle('is-tall', !!it.tall);
    img.classList.remove('is-in');
    img.removeAttribute('srcset');
    img.width = it.w; img.height = it.h;
    img.sizes = it.tall ? '(max-width: 860px) 100vw, 1100px' : '(max-width: 860px) 100vw, 80vw';
    img.srcset = url(slug, it.sm) + ' ' + Math.min(it.w, it.tall ? 780 : 1100) + 'w, ' + url(slug, it.src) + ' ' + it.w + 'w';
    img.src = url(slug, it.src);
    img.alt = it.alt;
    cap.textContent = it.alt;
    if (it.tall) { var h = document.createElement('span'); h.className = 'glb__hint'; h.textContent = ' · Scroll for the full page'; cap.appendChild(h); }
    iEl.textContent = pad(index + 1);
    stage.scrollTop = 0;
    img.dataset.dir = dir || '';
    var done = function () { img.classList.add('is-in'); };
    if (img.complete && img.naturalWidth) done(); else img.onload = done;
    Array.prototype.forEach.call(thumbs.children, function (li, k) {
      var b = li.firstChild;
      if (k === index) { b.setAttribute('aria-current', 'true'); b.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduce ? 'auto' : 'smooth' }); }
      else b.removeAttribute('aria-current');
    });
    preload(index + 1); preload(index - 1);
  }

  function buildThumbs() {
    thumbs.innerHTML = '';
    items.forEach(function (it, k) {
      var li = document.createElement('li');
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'glb__thumb';
      b.setAttribute('aria-label', 'Image ' + (k + 1) + ': ' + it.alt);
      var t = document.createElement('img');
      t.src = url(slug, it.th); t.alt = ''; t.loading = 'lazy'; t.decoding = 'async';
      b.appendChild(t);
      b.addEventListener('click', function () { show(k, k > index ? 1 : -1); });
      li.appendChild(b); thumbs.appendChild(li);
    });
  }

  function open(name, btn) {
    var g = DATA.galleries[name]; if (!g || !g.items.length) return;
    slug = name; items = g.items; opener = btn || null;
    titleEl.textContent = g.title;
    nEl.textContent = pad(items.length);
    var single = items.length < 2;
    prev.hidden = next.hidden = thumbs.hidden = single;
    buildThumbs();
    box.hidden = false;
    box.classList.remove('is-closing');
    document.body.style.overflow = 'hidden';
    show(0);
    closeBtn.focus();
  }

  function close() {
    if (box.hidden || box.classList.contains('is-closing')) return;
    box.classList.add('is-closing');
    setTimeout(function () {
      box.hidden = true; box.classList.remove('is-closing');
      document.body.style.overflow = '';
      img.removeAttribute('src'); img.removeAttribute('srcset');
      if (opener) opener.focus();
    }, reduce ? 0 : 300);
  }

  Array.prototype.forEach.call(document.querySelectorAll('.gal[data-gallery]'), function (btn) {
    btn.addEventListener('click', function () { open(btn.getAttribute('data-gallery'), btn); });
  });
  prev.addEventListener('click', function () { show(index - 1, -1); });
  next.addEventListener('click', function () { show(index + 1, 1); });
  closeBtn.addEventListener('click', close);

  document.addEventListener('keydown', function (e) {
    if (box.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); show(index + 1, 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); show(index - 1, -1); }
    else if (e.key === 'Home') { e.preventDefault(); show(0, -1); }
    else if (e.key === 'End') { e.preventDefault(); show(items.length - 1, 1); }
    else if (e.key === 'Tab') {
      // keep focus inside the dialog
      var f = Array.prototype.filter.call(box.querySelectorAll('button:not([hidden]), [tabindex="-1"]'), function (el) { return el.offsetParent !== null && el.tabIndex >= 0; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  // swipe left/right on the stage (vertical scrolling of tall pages is left alone)
  var sx = 0, sy = 0, st = 0;
  stage.addEventListener('touchstart', function (e) { var t = e.touches[0]; sx = t.clientX; sy = t.clientY; st = Date.now(); }, { passive: true });
  stage.addEventListener('touchend', function (e) {
    var t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy;
    if (Date.now() - st < 600 && Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) show(index + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
  }, { passive: true });

  // click on empty stage space closes (not on the image or caption)
  stage.addEventListener('click', function (e) { if (e.target === stage) close(); });
})();
