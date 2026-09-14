/* ============================================================
   BIOMOMMIE — Product catalogue + shared rendering helpers
   Add real products by extending PRODUCTS below — every page
   (shop grids, product page, related items, wishlist, search)
   reads from this single array.
   ============================================================ */

(function(){
  const M = window.MEDIA;
  const img = (pool, i) => pool[i % pool.length];

  const COLOR_HEX = {
    'Ivory':'#F3ECE0', 'Sage':'#93A188', 'Blush':'#EEDDD3',
    'Beige':'#E8DCC7', 'Taupe':'#AB9578', 'Charcoal':'#2A251E'
  };

  function gallery(i){
    return {
      front: img(M.product, i),
      back: img(M.product, i+1),
      wearing: img(M.lifestyle, i),
      fabric: img(M.fabric, i),
      stitching: img(M.fabric, i+2),
      closure: img(M.fabric, i+4),
      lifestyle: img(M.lifestyle, i+3),
      packaging: img(M.gifting, i),
    };
  }

  const PRODUCTS = [
    {
      slug:'cloud-cotton-romper', name:'The Cloud Cotton Romper',
      category:'rompers', ageGroup:'newborn', gifting:false, signature:false,
      price:799, colors:['Ivory','Sage','Blush'], sizes:['0-3M','3-6M'],
      fabric:'100% Cotton', construction:'Cotton Interlock', gsm:'220 GSM',
      short:'220 GSM Cotton Interlock', desc:'Soft, simple and designed for everyday moments. Made with selected cotton fabric and finished with thoughtful details for easy everyday dressing.',
      gallery: gallery(0),
    },
    {
      slug:'signature-romper', name:'The BioMommie Signature Romper',
      category:'rompers', ageGroup:'newborn', gifting:false, signature:true,
      price:1299, colors:['Ivory','Charcoal','Sage'], sizes:['0-3M','3-6M'],
      fabric:'100% Cotton', construction:'Double-Layered Cotton Interlock', gsm:'240 GSM',
      short:'Our most-loved silhouette, elevated', desc:'Soft, simple and thoughtfully designed for little beginnings. The piece that defines BioMommie — considered proportions, a gentle hand-feel and finishing details you notice the moment you touch it.',
      gallery: gallery(1),
    },
    {
      slug:'everyday-bodysuit-set', name:'Everyday Bodysuit Set — Pack of 3',
      category:'bodysuits', ageGroup:'little-beginnings', gifting:false, signature:false,
      price:1199, colors:['Ivory','Beige','Blush'], sizes:['3-6M','6-12M'],
      fabric:'100% Cotton', construction:'Cotton Interlock', gsm:'200 GSM',
      short:'Three everyday essentials, one set', desc:'A considered set of everyday bodysuits made for easy dressing and easy days. Envelope necklines and soft-fold cuffs are designed around real newborn mornings.',
      gallery: gallery(2),
    },
    {
      slug:'soft-knit-sleepsuit', name:'Soft Knit Sleepsuit',
      category:'sets', ageGroup:'newborn', gifting:false, signature:false,
      price:899, colors:['Taupe','Sage'], sizes:['0-3M','3-6M'],
      fabric:'100% Cotton', construction:'Ribbed Cotton Knit', gsm:'210 GSM',
      short:'For sleepy mornings and slow days', desc:'A gently ribbed sleepsuit finished with covered snaps for easy changes, designed to move with your baby through their sleepiest, softest days.',
      gallery: gallery(3),
    },
    {
      slug:'muslin-swaddle-set', name:'Muslin Swaddle Set — Pack of 2',
      category:'swaddles', ageGroup:'newborn', gifting:true, signature:false,
      price:699, colors:['Ivory','Sage'], sizes:['One Size'],
      fabric:'100% Cotton Muslin', construction:'Double-Layer Muslin Weave', gsm:'120 GSM',
      short:'Breathable muslin, beautifully finished', desc:'Two generously sized muslin swaddles with a soft, breathable weave that gets softer with every wash — thoughtfully finished at every edge.',
      gallery: gallery(4),
    },
    {
      slug:'everyday-jumpsuit', name:'Everyday Cotton Jumpsuit',
      category:'sets', ageGroup:'growing-days', gifting:false, signature:false,
      price:999, colors:['Beige','Charcoal'], sizes:['6-12M','12-24M'],
      fabric:'100% Cotton', construction:'Cotton Interlock', gsm:'230 GSM',
      short:'Easy movement, everyday comfort', desc:'A relaxed jumpsuit built for a growing, moving baby — flat-lock seams and a gusseted fit designed for everyday exploring.',
      gallery: gallery(5),
    },
    {
      slug:'knot-gown-newborn', name:'Newborn Knot Gown',
      category:'sets', ageGroup:'newborn', gifting:true, signature:false,
      price:749, colors:['Ivory','Blush'], sizes:['0-3M'],
      fabric:'100% Cotton', construction:'Cotton Interlock', gsm:'200 GSM',
      short:'An easy first days essential', desc:'An elasticated hem replaces zips and snaps entirely, making nappy changes gentler in the very first days. Simple, soft and thoughtfully made.',
      gallery: gallery(6),
    },
    {
      slug:'signature-gift-box', name:'The Signature Gift Box',
      category:'gifting', ageGroup:'newborn', gifting:true, signature:false,
      price:1899, colors:['Ivory'], sizes:['0-3M','3-6M'],
      fabric:'100% Cotton', construction:'Curated Two-Piece Set', gsm:'—',
      short:'A little box of beautiful beginnings', desc:'A curated two-piece set presented in our signature ivory gift box with tissue, ribbon and a handwritten card — ready to give exactly as it arrives.',
      gallery: gallery(7),
    },
  ];

  const AGE_GROUPS = [
    {slug:'newborn', label:'Newborn', range:'0–3 Months'},
    {slug:'little-beginnings', label:'Little Beginnings', range:'3–6 Months'},
    {slug:'growing-days', label:'Growing Days', range:'6–12 Months'},
    {slug:'little-explorers', label:'Little Explorers', range:'12–24 Months'},
    {slug:'toddler-years', label:'Toddler Years', range:'2–3 Years'},
  ];

  function money(n){ return '₹' + n.toLocaleString('en-IN'); }

  function renderProductCard(p){
    const wishlisted = window.Wishlist && window.Wishlist.isWishlisted(p.slug);
    return `
    <div class="product-card" data-slug="${p.slug}">
      <a href="${window.SITE_BASE}product.html?slug=${p.slug}" class="product-media" aria-label="${p.name}">
        <img src="${p.gallery.front}" alt="${p.name}">
        <img class="img-hover" src="${p.gallery.wearing}" alt="">
      </a>
      <button class="wishlist-toggle ${wishlisted?'is-active':''}" data-wishlist="${p.slug}" aria-label="Add to wishlist">${window.ICONS.heart}</button>
      <div class="quick-add">
        <button class="btn btn-light btn-block btn-sm" data-quickadd="${p.slug}">Quick Add to Bag</button>
      </div>
      <a href="${window.SITE_BASE}product.html?slug=${p.slug}" class="product-info">
        <h4>${p.name}</h4>
        <p class="product-desc">${p.short}</p>
        <span class="price">${money(p.price)}</span>
        <div class="swatches">${p.colors.map(c=>`<span class="swatch" style="background:${COLOR_HEX[c]||'#ccc'}" title="${c}"></span>`).join('')}</div>
      </a>
    </div>`;
  }

  function bindProductCardEvents(scope){
    (scope || document).querySelectorAll('[data-wishlist]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const active = window.Wishlist.toggleWishlist(btn.dataset.wishlist);
        btn.classList.toggle('is-active', active);
      });
    });
    (scope || document).querySelectorAll('[data-quickadd]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const p = PRODUCTS.find(x => x.slug === btn.dataset.quickadd);
        if(!p) return;
        window.Cart.addToCart({
          slug:p.slug, name:p.name, image:p.gallery.front, price:p.price,
          color:p.colors[0], size:p.sizes[0], qty:1
        });
      });
    });
  }

  function renderGrid(container, list){
    if(!container) return;
    container.innerHTML = list.map(renderProductCard).join('');
    bindProductCardEvents(container);
    if(window.observeReveals) window.observeReveals(container);
  }

  window.PRODUCTS = PRODUCTS;
  window.AGE_GROUPS = AGE_GROUPS;
  window.money = money;
  window.renderProductCard = renderProductCard;
  window.bindProductCardEvents = bindProductCardEvents;
  window.renderProductGrid = renderGrid;

  document.addEventListener('DOMContentLoaded', () => {
    /* Featured collection on the homepage */
    renderGrid(document.getElementById('featuredGrid'), PRODUCTS.slice(0,4));

    /* Signature product panel */
    const sig = PRODUCTS.find(p => p.signature) || PRODUCTS[0];
    document.querySelectorAll('[data-signature]').forEach(el => {
      const field = el.dataset.signature;
      if(field === 'price') el.textContent = money(sig.price);
      else if(field === 'link') el.href = `${window.SITE_BASE}product.html?slug=${sig.slug}`;
      else if(field === 'image') { el.src = sig.gallery.lifestyle; }
      else if(field in sig) el.textContent = sig[field];
    });

    /* Shop grids with category / age / search filtering */
    const shopGrid = document.getElementById('shopGrid');
    if(shopGrid){
      const params = new URLSearchParams(window.location.search);
      const catFixed = shopGrid.dataset.category || '';
      const q = (params.get('q') || '').toLowerCase();
      const ageParam = params.get('age') || '';
      const catParam = params.get('cat') || '';

      function apply(){
        let list = PRODUCTS.slice();
        if(catFixed === 'gifting') list = list.filter(p => p.gifting);
        else if(catFixed === 'newborn-age') list = list.filter(p => p.ageGroup === 'newborn');
        else if(catFixed === 'clothing') list = list.filter(p => !p.gifting || p.category !== 'gifting');
        if(ageParam) list = list.filter(p => p.ageGroup === ageParam);
        if(catParam) list = list.filter(p => p.category === catParam);
        if(q) list = list.filter(p => (p.name+p.short+p.desc).toLowerCase().includes(q));

        const activeChip = document.querySelector('.chip.is-active');
        const chipCat = activeChip ? activeChip.dataset.chip : '';
        if(chipCat) list = list.filter(p => p.category === chipCat);

        renderGrid(shopGrid, list);
        const countEl = document.getElementById('resultCount');
        if(countEl) countEl.textContent = `${list.length} product${list.length===1?'':'s'}`;
        if(list.length === 0){
          shopGrid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><h3>New pieces are on their way</h3><p class="text-muted" style="margin-top:12px">We're thoughtfully adding to this collection — check back soon.</p></div>`;
        }
      }
      document.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', () => {
          document.querySelectorAll('.chip').forEach(c=>c.classList.remove('is-active'));
          chip.classList.add('is-active');
          apply();
        });
      });
      apply();
    }
  });
})();
