/* ============================================================
   BIOMOMMIE — global site behaviour
   Header scroll state, mobile nav, search overlay, reveal-on-scroll,
   accordions, toast, newsletter, quantity steppers.
   ============================================================ */

window.ICONS = {
  heart: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 20.4S3.6 15.2 3.6 9.3C3.6 6.4 5.8 4.3 8.5 4.3c1.7 0 3 .8 3.5 1.9.5-1.1 1.8-1.9 3.5-1.9 2.7 0 4.9 2.1 4.9 5 0 5.9-8.4 11.1-8.4 11.1Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>',
};

window.showToast = function(message){
  const toast = document.getElementById('toast');
  if(!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(()=>toast.classList.remove('is-visible'), 2600);
};

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Header scroll state ---------- */
  const header = document.getElementById('siteHeader');
  const isOverlayHero = document.body.classList.contains('home') || document.body.classList.contains('has-overlay-header');
  function onScroll(){
    if(!header) return;
    if(window.scrollY > 60){ header.classList.add('is-solid'); }
    else if(isOverlayHero){ header.classList.remove('is-solid'); }
  }
  if(header){
    if(!isOverlayHero) header.classList.add('is-solid');
    onScroll();
    window.addEventListener('scroll', onScroll, {passive:true});
  }

  /* ---------- Mobile nav ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavClose = document.getElementById('mobileNavClose');
  menuToggle && menuToggle.addEventListener('click', () => mobileNav.classList.add('is-open'));
  mobileNavClose && mobileNavClose.addEventListener('click', () => mobileNav.classList.remove('is-open'));
  mobileNav && mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('is-open')));

  /* ---------- Search overlay ---------- */
  const searchToggle = document.getElementById('searchToggle');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchClose = document.getElementById('searchClose');
  const searchInput = document.getElementById('searchInput');
  const searchForm = document.getElementById('searchForm');
  searchToggle && searchToggle.addEventListener('click', () => {
    searchOverlay.hidden = false;
    setTimeout(()=>searchInput && searchInput.focus(), 50);
  });
  searchClose && searchClose.addEventListener('click', () => searchOverlay.hidden = true);
  searchOverlay && searchOverlay.addEventListener('click', (e) => { if(e.target === searchOverlay) searchOverlay.hidden = true; });
  searchForm && searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = searchInput.value.trim();
    if(q){ window.location.href = `${window.SITE_BASE}shop/index.html?q=${encodeURIComponent(q)}`; }
  });

  /* ---------- Active nav link ---------- */
  document.querySelectorAll('[data-nav]').forEach(link => {
    const key = link.getAttribute('data-nav');
    const path = window.location.pathname;
    let match = false;
    if(key === 'home' && (path.endsWith('/index.html') && !path.includes('/shop/') && !path.includes('/journal/')) ) match = true;
    if(key === 'shop' && path.includes('/shop/') && !path.includes('newborn') && !path.includes('clothing') && !path.includes('gifting')) match = true;
    if(key === 'newborn' && path.includes('newborn')) match = true;
    if(key === 'clothing' && path.includes('clothing')) match = true;
    if(key === 'gifting' && path.includes('gifting')) match = true;
    if(key === 'our-story' && path.includes('our-story')) match = true;
    if(key === 'journal' && path.includes('/journal/')) match = true;
    if(match){ link.style.opacity = '1'; link.style.fontWeight = '700'; }
  });

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && revealEls.length){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:.15, rootMargin:'0px 0px -60px 0px'});
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Accordions (product page, FAQs) ---------- */
  document.querySelectorAll('.accordion').forEach(acc => {
    acc.querySelectorAll('.accordion-item').forEach(item => {
      const head = item.querySelector('.accordion-head');
      const panel = item.querySelector('.accordion-panel');
      head && head.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        acc.querySelectorAll('.accordion-item').forEach(i => {
          i.classList.remove('is-open');
          i.querySelector('.accordion-panel').style.maxHeight = null;
        });
        if(!isOpen){
          item.classList.add('is-open');
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });
    });
  });

  /* ---------- Newsletter forms ---------- */
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if(input && input.value){
        showToast('Welcome to the BioMommie world — check your inbox soon.');
        form.reset();
      }
    });
  });

  /* ---------- Generic quantity steppers ---------- */
  document.querySelectorAll('.qty-stepper').forEach(stepper => {
    const input = stepper.querySelector('input');
    stepper.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        let val = parseInt(input.value, 10) || 1;
        val = btn.dataset.step === 'down' ? Math.max(1, val - 1) : val + 1;
        input.value = val;
        input.dispatchEvent(new Event('change'));
      });
    });
  });

  /* ---------- Contact / auth forms without a backend ---------- */
  document.querySelectorAll('[data-fake-submit]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast(form.dataset.fakeSubmit || 'Thank you — we’ll be in touch shortly.');
      form.reset();
    });
  });

});
