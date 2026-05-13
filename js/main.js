/* ══════════════════════════════════════════════════════
   Desafio 30 Dias Sem Glúten · main.js
   ══════════════════════════════════════════════════════ */

/* ── Scroll: header shadow ─────────────────────────── */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ── Mobile nav toggle ─────────────────────────────── */
const hamburger  = document.getElementById('hamburger');
const mobileNav  = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  const spans = hamburger.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

/* ── Reveal on scroll ──────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Smooth scroll for anchor links ────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id = anchor.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const offset = header.offsetHeight + 16;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});

/* ── FAQ: close others on open ─────────────────────── */
document.querySelectorAll('.faq__item').forEach(item => {
  item.addEventListener('toggle', () => {
    if (item.open) {
      document.querySelectorAll('.faq__item').forEach(other => {
        if (other !== item) other.open = false;
      });
    }
  });
});

/* ── CTA button ripple effect ──────────────────────── */
document.querySelectorAll('.btn--primary').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    const rect   = this.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,.3);
      width: ${size}px;
      height: ${size}px;
      left: ${e.clientX - rect.left - size / 2}px;
      top: ${e.clientY - rect.top - size / 2}px;
      animation: ripple .6s linear forwards;
      pointer-events: none;
    `;
    if (getComputedStyle(this).position === 'static') {
      this.style.position = 'relative';
    }
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = '@keyframes ripple{to{transform:scale(2.5);opacity:0}}';
document.head.appendChild(rippleStyle);

/* ── Lazy load images with fade-in ─────────────────── */
if ('IntersectionObserver' in window) {
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        img.style.transition = 'opacity .4s';
        img.style.opacity = '1';
        imgObserver.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });

  document.querySelectorAll('img[data-src]').forEach(img => {
    img.style.opacity = '0';
    imgObserver.observe(img);
  });
}

/* ── Sticky CTA bar on mobile ──────────────────────── */
function createStickyCTA() {
  if (window.innerWidth > 768) return;
  const bar = document.createElement('div');
  bar.className = 'sticky-cta-bar';
  bar.innerHTML = `
    <div class="sticky-cta-bar__inner">
      <div>
        <strong>Desafio 30 Dias</strong>
        <span>R$ 97 · acesso imediato</span>
      </div>
      <a href="#oferta" class="btn btn--primary">Quero Participar</a>
    </div>
  `;
  const style = document.createElement('style');
  style.textContent = `
    .sticky-cta-bar {
      position: fixed; bottom: 0; left: 0; right: 0; z-index: 98;
      background: #fff; border-top: 1px solid #ede4d6;
      padding: 12px 20px 18px; box-shadow: 0 -4px 20px rgba(0,0,0,.08);
      transform: translateY(100%); transition: transform .4s cubic-bezier(.4,0,.2,1);
    }
    .sticky-cta-bar.visible { transform: translateY(0); }
    .sticky-cta-bar__inner { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
    .sticky-cta-bar__inner strong { display: block; font-size: .9rem; color: #1a3c2a; }
    .sticky-cta-bar__inner span   { font-size: .8rem; color: #6b6b6b; }
    .sticky-cta-bar .btn--primary { white-space: nowrap; padding: 12px 20px; font-size: .9rem; }
  `;
  document.head.appendChild(style);
  document.body.appendChild(bar);

  const hero = document.getElementById('hero');
  const oferta = document.getElementById('oferta');
  const stickyObserver = new IntersectionObserver(([entry]) => {
    bar.classList.toggle('visible', !entry.isIntersecting);
  }, { threshold: 0 });
  if (hero) stickyObserver.observe(hero);

  const ofertaObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) bar.classList.remove('visible');
  }, { threshold: 0.5 });
  if (oferta) ofertaObserver.observe(oferta);
}
createStickyCTA();

/* ── Back to top ───────────────────────────────────── */
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    backToTopBtn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── Countdown timer (72h, persists via localStorage) ─ */
(function () {
  const KEY = 'dep30_offer_end';
  const HOURS = 72;

  let end = parseInt(localStorage.getItem(KEY), 10);
  if (!end || end < Date.now()) {
    end = Date.now() + HOURS * 3600 * 1000;
    localStorage.setItem(KEY, end);
  }

  const pad = n => String(n).padStart(2, '0');
  const el  = id => document.getElementById(id);

  function tick() {
    const diff  = Math.max(0, end - Date.now());
    const total = Math.floor(diff / 1000);
    const d = Math.floor(total / 86400);
    const h = Math.floor((total % 86400) / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;

    if (el('cntDays'))  el('cntDays').textContent  = pad(d);
    if (el('cntHours')) el('cntHours').textContent = pad(h);
    if (el('cntMins'))  el('cntMins').textContent  = pad(m);
    if (el('cntSecs'))  el('cntSecs').textContent  = pad(s);

    if (diff === 0) clearInterval(timer);
  }

  const timer = setInterval(tick, 1000);
  tick();
})();

/* ── Depoimentos slider ────────────────────────────── */
(function () {
  const slider   = document.getElementById('depSlider');
  const track    = document.getElementById('depTrack');
  const prevBtn  = document.getElementById('depPrev');
  const nextBtn  = document.getElementById('depNext');
  const dotsWrap = document.getElementById('depDots');
  if (!slider || !track) return;

  const TOTAL = track.children.length;
  let current = 0;
  let autoTimer;
  let cardW = 0;

  function visible() { return window.innerWidth <= 768 ? 1 : 3; }
  function maxIdx()  { return TOTAL - visible(); }

  function setCardWidths() {
    cardW = slider.offsetWidth / visible();
    Array.from(track.children).forEach(c => { c.style.width = cardW + 'px'; });
  }

  function applyTransform() {
    track.style.transform = `translateX(${-current * cardW}px)`;
  }

  function buildDots() {
    dotsWrap.innerHTML = '';
    const count = maxIdx() + 1;
    for (let i = 0; i < count; i++) {
      const d = document.createElement('button');
      d.className = 'dep-dot' + (i === current ? ' dep-dot--active' : '');
      d.setAttribute('aria-label', `Ir para posição ${i + 1}`);
      d.addEventListener('click', () => { goTo(i); resetAuto(); });
      dotsWrap.appendChild(d);
    }
  }

  function syncDots() {
    dotsWrap.querySelectorAll('.dep-dot').forEach((d, i) => {
      d.classList.toggle('dep-dot--active', i === current);
    });
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === maxIdx();
  }

  function goTo(idx) {
    current = Math.max(0, Math.min(idx, maxIdx()));
    applyTransform();
    syncDots();
  }

  function next() { goTo(current >= maxIdx() ? 0 : current + 1); }
  function prev() { goTo(current <= 0 ? maxIdx() : current - 1); }

  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(next, 5000);
  }

  prevBtn.addEventListener('click', () => { prev(); resetAuto(); });
  nextBtn.addEventListener('click', () => { next(); resetAuto(); });

  slider.addEventListener('mouseenter', () => clearInterval(autoTimer));
  slider.addEventListener('mouseleave', resetAuto);

  let touchX = 0;
  slider.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', e => {
    const diff = touchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 48) { diff > 0 ? next() : prev(); resetAuto(); }
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (current > maxIdx()) current = maxIdx();
      setCardWidths();
      buildDots();
      applyTransform();
      syncDots();
    }, 150);
  });

  setCardWidths();
  buildDots();
  goTo(0);
  resetAuto();
})();
