/* Devin Griffin portfolio — theme, animated backgrounds, transitions, carousel, lightbox */
(function () {
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.body;

  /* ---------- theme ---------- */
  const STORE = 'dg-theme';
  function applyTheme(t, animate) {
    root.dataset.theme = t;
    const dark = t === 'dark';
    document.querySelectorAll('[data-mark]').forEach(img => {
      img.src = img.dataset.mark.replace('THEME', dark ? 'white.svg' : 'green.png');
    });
    document.querySelectorAll('[data-theme-icon]').forEach(el => {
      el.innerHTML = dark ? ICON_MOON : ICON_SUN;
    });
    const night = document.querySelector('.bg-night');
    const sunny = document.querySelector('.bg-sunny');
    if (night && sunny) {
      night.classList.toggle('is-on', dark);
      sunny.classList.toggle('is-on', !dark);
    }
    try { localStorage.setItem(STORE, t); } catch (e) {}
    if (animate && window.gsap && !REDUCED) {
      gsap.fromTo('.shell', { opacity: .82 }, { opacity: 1, duration: .5, ease: 'power2.out' });
    }
  }
  const ICON_MOON = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  const ICON_SUN = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';

  let saved = 'dark';
  try { saved = localStorage.getItem(STORE) || 'dark'; } catch (e) {}
  applyTheme(saved, false);

  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-theme-toggle]');
    if (!btn) return;
    applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true);
  });

  /* ---------- background motion: wind sway + flare + shooting stars ---------- */
  function windSway() {
    if (REDUCED) return;
    const imgs = document.querySelectorAll('.bg-img:not(video)');
    if (!imgs.length) return;
    let t = 0;
    (function loop() {
      t += 0.0032;
      const x = Math.sin(t) * 9 + Math.sin(t * 2.37) * 3.5;
      const y = Math.cos(t * 0.73) * 5 + Math.sin(t * 1.9) * 1.8;
      const s = 1.012 + Math.sin(t * 0.55) * 0.006;
      const sk = Math.sin(t * 1.21) * 0.09;
      imgs.forEach(img => {
        img.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${s}) skewX(${sk}deg)`;
      });
      requestAnimationFrame(loop);
    })();
  }

  function flarePulse() {
    if (REDUCED) return;
    const flare = document.querySelector('.sun-flare');
    if (!flare) return;
    if (document.querySelector('video.bg-sunny')) { flare.style.display = 'none'; return; }
    let t = 0;
    (function loop() {
      t += 0.006;
      const base = 0.72 + Math.sin(t) * 0.16 + Math.sin(t * 3.1) * 0.05;
      const glint = Math.max(0, Math.sin(t * 0.37)) ** 8 * 0.35;
      flare.style.opacity = root.dataset.theme === 'light' ? String(Math.min(1, base + glint)) : '0';
      flare.style.transform = `translate(-50%,-30%) scale(${1 + Math.sin(t * 0.8) * 0.04 + glint * 0.15})`;
      requestAnimationFrame(loop);
    })();
  }

  function shootingStars() {
    const cv = document.querySelector('.bg-fx');
    if (!cv || REDUCED) return;
    if (document.querySelector('video.bg-night')) return; // the night video carries its own shooting star
    const ctx = cv.getContext('2d');
    let w, h, dpr;
    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.width = innerWidth * dpr;
      h = cv.height = innerHeight * dpr;
      cv.style.width = innerWidth + 'px';
      cv.style.height = innerHeight + 'px';
    }
    size();
    addEventListener('resize', size);

    const stars = [];
    let next = performance.now() + 3000;

    function spawn() {
      const startX = w * (0.15 + Math.random() * 0.7);
      const startY = h * (Math.random() * 0.42);
      const angle = (Math.random() * 22 + 20) * Math.PI / 180;
      stars.push({
        x: startX, y: startY,
        vx: Math.cos(angle) * (7 + Math.random() * 5) * dpr,
        vy: Math.sin(angle) * (7 + Math.random() * 5) * dpr,
        life: 0, max: 55 + Math.random() * 35,
        len: (90 + Math.random() * 110) * dpr
      });
    }

    (function loop(now) {
      ctx.clearRect(0, 0, w, h);
      if (root.dataset.theme === 'dark') {
        if (now > next) { spawn(); next = now + 9000 + Math.random() * 16000; }
        for (let i = stars.length - 1; i >= 0; i--) {
          const s = stars[i];
          s.life++;
          s.x += s.vx; s.y += s.vy;
          const fade = Math.sin((s.life / s.max) * Math.PI);
          const nx = s.vx / Math.hypot(s.vx, s.vy), ny = s.vy / Math.hypot(s.vx, s.vy);
          const g = ctx.createLinearGradient(s.x, s.y, s.x - nx * s.len, s.y - ny * s.len);
          g.addColorStop(0, `rgba(255,255,255,${0.85 * fade})`);
          g.addColorStop(0.4, `rgba(214,232,255,${0.28 * fade})`);
          g.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.strokeStyle = g;
          ctx.lineWidth = 1.6 * dpr;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.x - nx * s.len, s.y - ny * s.len);
          ctx.stroke();
          if (s.life > s.max) stars.splice(i, 1);
        }
      } else if (stars.length) { stars.length = 0; }
      requestAnimationFrame(loop);
    })(performance.now());
  }

  /* ---------- preloader + page transitions ---------- */
  function intro() {
    const pl = document.querySelector('.preloader');
    const veil = document.querySelector('.page-veil');
    const first = !sessionStorage.getItem('dg-visited');
    const reveals = gsap.utils.toArray('.reveal');

    function revealPage() {
      if (!window.gsap || REDUCED) { reveals.forEach(el => el.classList.remove('reveal')); return; }
      gsap.to(reveals, { opacity: 1, y: 0, duration: .95, stagger: .07, ease: 'power3.out', onComplete: () => reveals.forEach(el => el.classList.remove('reveal')) });
    }

    if (pl && first && window.gsap && !REDUCED) {
      sessionStorage.setItem('dg-visited', '1');
      const counter = pl.querySelector('.count');
      const obj = { n: 0 };
      gsap.timeline()
        .to(obj, { n: 100, duration: 1.5, ease: 'power2.inOut', onUpdate: () => counter.textContent = Math.round(obj.n) + '%' })
        .to(pl, { yPercent: -100, duration: .9, ease: 'expo.inOut' }, '+=0.15')
        .add(revealPage, '-=0.45')
        .set(pl, { display: 'none' });
    } else {
      if (pl) pl.style.display = 'none';
      if (veil && window.gsap && !REDUCED) {
        gsap.fromTo(veil, { scaleY: 1, transformOrigin: 'top' }, { scaleY: 0, duration: .8, ease: 'expo.inOut' });
      }
      revealPage();
    }

    /* outgoing transition */
    document.addEventListener('click', e => {
      const a = e.target.closest('a[href]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('http') || a.target === '_blank' || a.hasAttribute('download')) return;
      if (!window.gsap || REDUCED) return;
      e.preventDefault();
      gsap.timeline()
        .to('.shell', { opacity: 0, y: -14, duration: .4, ease: 'power2.in' }, 0)
        .fromTo(veil, { scaleY: 0, transformOrigin: 'bottom' }, { scaleY: 1, duration: .6, ease: 'expo.inOut' }, 0)
        .add(() => { location.href = href; });
    });
  }

  /* ---------- scroll reveals ---------- */
  function scrollReveals() {
    if (!window.gsap || !window.ScrollTrigger || REDUCED) return;
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('[data-scroll-reveal]').forEach(el => {
      gsap.fromTo(el, { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: .9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    });
  }

  /* ---------- carousel: drag to scroll ---------- */
  function carousels() {
    document.querySelectorAll('.carousel').forEach(el => {
      let down = false, startX = 0, startLeft = 0, moved = 0;
      el.addEventListener('pointerdown', e => {
        down = true; moved = 0;
        startX = e.clientX; startLeft = el.scrollLeft;
        el.setPointerCapture(e.pointerId);
      });
      el.addEventListener('pointermove', e => {
        if (!down) return;
        const dx = e.clientX - startX;
        if (Math.abs(dx) > 4) el.classList.add('dragging');
        moved = Math.abs(dx);
        el.scrollLeft = startLeft - dx;
      });
      const end = () => { down = false; setTimeout(() => el.classList.remove('dragging'), 30); };
      el.addEventListener('pointerup', end);
      el.addEventListener('pointercancel', end);
      el.addEventListener('click', e => { if (moved > 6) { e.preventDefault(); e.stopPropagation(); } }, true);
      el.addEventListener('wheel', e => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
        el.scrollLeft += e.deltaY;
        e.preventDefault();
      }, { passive: false });
    });
  }

  /* ---------- lightbox ---------- */
  function lightbox() {
    const box = document.querySelector('.lightbox');
    if (!box) return;
    const target = box.querySelector('img');
    document.querySelectorAll('.slide img').forEach(img => {
      img.addEventListener('click', () => {
        target.src = img.currentSrc || img.src;
        target.alt = img.alt || '';
        box.classList.add('open');
        document.documentElement.style.overflow = 'hidden';
        if (window.gsap && !REDUCED) gsap.fromTo(target, { opacity: 0, scale: .97 }, { opacity: 1, scale: 1, duration: .5, ease: 'power3.out' });
      });
    });
    function close() { box.classList.remove('open'); document.documentElement.style.overflow = ''; }
    box.addEventListener('click', e => { if (e.target === box || e.target.closest('.close')) close(); });
    addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  /* ---------- work-index hover preview ---------- */
  function hoverPreview() {
    const prev = document.querySelector('.hover-preview');
    if (!prev) return;
    document.querySelectorAll('[data-preview]').forEach(row => {
      row.addEventListener('pointerenter', () => {
        prev.src = row.dataset.preview;
        prev.classList.add('on');
      });
      row.addEventListener('pointerleave', () => prev.classList.remove('on'));
      row.addEventListener('pointermove', e => {
        if (window.gsap) gsap.to(prev, { left: e.clientX, top: e.clientY, duration: .5, ease: 'power3.out' });
      });
    });
  }

  /* ---------- render galleries from site/data/galleries.js ---------- */
  function buildGalleries() {
    const data = window.WORK_GALLERIES, folders = window.WORK_FOLDERS || {};
    if (!data) return;
    document.querySelectorAll('[data-gallery]').forEach(track => {
      const key = track.dataset.gallery;
      const items = data[key];
      if (!items) return;
      const folder = folders[key] || key;
      track.innerHTML = items.map(it => {
        const cap = (it.cap || '').replace(/&/g, '&amp;').replace(/</g, '&lt;');
        return `<figure class="slide${it.long ? ' long' : ''}">` +
          `<img src="${window.ASSET_BASE || 'assets/'}work/${folder}/web/${it.src}" alt="${cap}" loading="lazy">` +
          `<figcaption class="slide-cap">${cap}</figcaption></figure>`;
      }).join('');
      const count = track.closest('.carousel-wrap')?.querySelector('[data-count]');
      if (count) count.textContent = items.length + ' pieces';
    });
  }

  /* ---------- touch: reveal callout image fully ---------- */
  function touchReveal() {
    document.querySelectorAll('.rail-item').forEach(el => {
      el.addEventListener('touchstart', () => {
        document.querySelectorAll('.rail-item.touched').forEach(o => { if (o !== el) o.classList.remove('touched'); });
        el.classList.add('touched');
      }, { passive: true });
    });
  }

  /* ---------- year ---------- */
  function year() {
    document.querySelectorAll('[data-year]').forEach(el => el.textContent = '© ' + new Date().getFullYear());
  }

  function init() {
    windSway(); flarePulse(); shootingStars();
    buildGalleries();
    carousels(); lightbox(); hoverPreview(); touchReveal(); year();
    if (window.gsap) { intro(); scrollReveals(); }
    else document.querySelectorAll('.reveal').forEach(el => el.classList.remove('reveal'));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
