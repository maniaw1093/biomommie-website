/* ============================================================
   BIOMOMMIE — Product detail page (product.html?slug=...)
   ============================================================ */

(function(){
  document.addEventListener('DOMContentLoaded', () => {
    const mount = document.getElementById('pdpMount');
    if(!mount || !window.PRODUCTS) return;

    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    const product = window.PRODUCTS.find(p => p.slug === slug) || window.PRODUCTS[0];
    if(!product){ mount.innerHTML = '<p>Product not found.</p>'; return; }

    document.title = `${product.name} | BIOMOMMIE`;

    const g = product.gallery;
    const thumbs = [
      {key:'front', label:'Front', src:g.front},
      {key:'back', label:'Back', src:g.back},
      {key:'wearing', label:'Worn', src:g.wearing},
      {key:'fabric', label:'Fabric', src:g.fabric},
      {key:'closure', label:'Closure', src:g.closure},
      {key:'lifestyle', label:'Lifestyle', src:g.lifestyle},
    ];

    let selectedColor = product.colors[0];
    let selectedSize = product.sizes[0];

    mount.innerHTML = `
      <div class="product-layout">
        <div class="pdp-gallery">
          <div class="pdp-gallery-main" id="pdpMain">
            <img src="${g.front}" alt="${product.name}">
          </div>
          <div class="pdp-thumbs">
            ${thumbs.map((t,i)=>`<button type="button" data-src="${t.src}" class="${i===0?'is-active':''}" aria-label="${t.label} view"><img src="${t.src}" alt=""></button>`).join('')}
          </div>
        </div>

        <div class="pdp-info">
          <span class="eyebrow">${product.short}</span>
          <h1>${product.name}</h1>
          <div class="pdp-rating">
            <span class="stars">★★★★★</span>
            <a href="#reviews">128 Reviews</a>
          </div>
          <div class="pdp-price">${window.money(product.price)}</div>

          <div class="pdp-block">
            <div class="label"><span>Colour — <strong id="colorLabel">${selectedColor}</strong></span></div>
            <div class="pdp-swatches" id="colorSwatches">
              ${product.colors.map(c=>`<span class="pdp-swatch ${c===selectedColor?'is-selected':''}" data-color="${c}" style="background:${{'Ivory':'#F3ECE0','Sage':'#93A188','Blush':'#EEDDD3','Beige':'#E8DCC7','Taupe':'#AB9578','Charcoal':'#2A251E'}[c]||'#ccc'}"></span>`).join('')}
            </div>
          </div>

          <div class="pdp-block">
            <div class="label"><span>Size</span><a href="${window.SITE_BASE}size-guide.html" class="link-underline" style="border:none;text-decoration:underline">Size Guide</a></div>
            <div class="size-grid" id="sizeGrid">
              ${product.sizes.map(s=>`<span class="size-pill ${s===selectedSize?'is-selected':''}" data-size="${s}">${s}</span>`).join('')}
            </div>
          </div>

          <div class="pdp-block">
            <div class="label"><span>Quantity</span></div>
            <div class="qty-stepper">
              <button type="button" data-step="down">&minus;</button>
              <input type="text" id="pdpQty" value="1" readonly>
              <button type="button" data-step="up">+</button>
            </div>
          </div>

          <div class="pdp-actions">
            <button class="btn btn-dark btn-block" id="addToBagBtn">Add to Bag</button>
            <button class="btn btn-outline btn-block" id="buyNowBtn">Buy Now</button>
            <button class="pdp-wishlist-link" id="pdpWishlist">${window.ICONS.heart} <span>Add to Wishlist</span></button>
          </div>

          <div class="accordion" id="pdpAccordion">
            <div class="accordion-item is-open">
              <div class="accordion-head">Description<span class="plus">+</span></div>
              <div class="accordion-panel" style="max-height:600px"><div class="accordion-panel-inner">
                <p>${product.desc}</p>
              </div></div>
            </div>
            <div class="accordion-item">
              <div class="accordion-head">Fabric &amp; Feel<span class="plus">+</span></div>
              <div class="accordion-panel"><div class="accordion-panel-inner">
                <p>Beautiful babywear begins with what touches their skin. We pay attention to the fabric, the construction, the finish and every detail that becomes part of their everyday.</p>
              </div></div>
            </div>
            <div class="accordion-item">
              <div class="accordion-head">Size &amp; Fit<span class="plus">+</span></div>
              <div class="accordion-panel"><div class="accordion-panel-inner">
                <p>Fabric: ${product.fabric}<br>Construction: ${product.construction}<br>GSM: ${product.gsm}<br>Sizes: ${product.sizes.join(', ')}</p>
              </div></div>
            </div>
            <div class="accordion-item">
              <div class="accordion-head">Care<span class="plus">+</span></div>
              <div class="accordion-panel"><div class="accordion-panel-inner">
                <p>Follow garment care label. Gentle machine wash cold with like colours, do not bleach, line dry in shade.</p>
              </div></div>
            </div>
            <div class="accordion-item">
              <div class="accordion-head">Shipping &amp; Returns<span class="plus">+</span></div>
              <div class="accordion-panel"><div class="accordion-panel-inner">
                <p>Free shipping on orders over ₹1,999. Easy 7-day returns on unused items with tags attached. <a href="${window.SITE_BASE}policies/return-policy.html" class="link-underline" style="border:none;text-decoration:underline">Read our full return policy</a>.</p>
              </div></div>
            </div>
            <div class="accordion-item">
              <div class="accordion-head">Quality<span class="plus">+</span></div>
              <div class="accordion-panel"><div class="accordion-panel-inner">
                <p>Every piece is reviewed against our defined quality standards before it is folded, packaged and sent to you.</p>
              </div></div>
            </div>
            <div class="accordion-item">
              <div class="accordion-head">FAQ<span class="plus">+</span></div>
              <div class="accordion-panel"><div class="accordion-panel-inner">
                <ul>
                  <li>Is this true to size? — Yes, our pieces run true to size; see the size guide for exact measurements.</li>
                  <li>Will colours fade? — Our fabrics are selected to hold colour and softness wash after wash when cared for per the label.</li>
                </ul>
              </div></div>
            </div>
          </div>
        </div>
      </div>

      <div class="related">
        <div class="section-head left">
          <span class="eyebrow">You May Also Like</span>
          <h2>Complete the moment</h2>
        </div>
        <div class="grid g4" id="relatedGrid"></div>
      </div>
    `;

    /* gallery thumb switching */
    const mainImg = mount.querySelector('#pdpMain img');
    mount.querySelectorAll('.pdp-thumbs button').forEach(btn => {
      btn.addEventListener('click', () => {
        mount.querySelectorAll('.pdp-thumbs button').forEach(b=>b.classList.remove('is-active'));
        btn.classList.add('is-active');
        mainImg.src = btn.dataset.src;
      });
    });
    mount.querySelector('#pdpMain').addEventListener('click', function(){ this.classList.toggle('is-zoomed'); });

    /* colour + size selection */
    mount.querySelectorAll('#colorSwatches .pdp-swatch').forEach(sw => {
      sw.addEventListener('click', () => {
        mount.querySelectorAll('#colorSwatches .pdp-swatch').forEach(s=>s.classList.remove('is-selected'));
        sw.classList.add('is-selected');
        selectedColor = sw.dataset.color;
        document.getElementById('colorLabel').textContent = selectedColor;
      });
    });
    mount.querySelectorAll('#sizeGrid .size-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        mount.querySelectorAll('#sizeGrid .size-pill').forEach(p=>p.classList.remove('is-selected'));
        pill.classList.add('is-selected');
        selectedSize = pill.dataset.size;
      });
    });

    /* qty stepper */
    const qtyInput = mount.querySelector('#pdpQty');
    mount.querySelectorAll('.pdp-actions')[0]; // noop, steppers bound globally in main.js too
    mount.querySelectorAll('.qty-stepper button').forEach(btn => {
      btn.addEventListener('click', () => {
        let val = parseInt(qtyInput.value,10) || 1;
        val = btn.dataset.step === 'down' ? Math.max(1,val-1) : val+1;
        qtyInput.value = val;
      });
    });

    function currentLine(){
      return {
        slug: product.slug, name: product.name, image: g.front, price: product.price,
        color: selectedColor, size: selectedSize, qty: parseInt(qtyInput.value,10) || 1
      };
    }

    mount.querySelector('#addToBagBtn').addEventListener('click', () => {
      window.Cart.addToCart(currentLine());
    });
    mount.querySelector('#buyNowBtn').addEventListener('click', () => {
      window.Cart.addToCart(currentLine());
      window.location.href = `${window.SITE_BASE}checkout.html`;
    });
    const wishBtn = mount.querySelector('#pdpWishlist');
    if(window.Wishlist && window.Wishlist.isWishlisted(product.slug)) wishBtn.style.color = 'var(--taupe-dark)';
    wishBtn.addEventListener('click', () => {
      const active = window.Wishlist.toggleWishlist(product.slug);
      wishBtn.style.color = active ? 'var(--taupe-dark)' : '';
    });

    /* accordion open state for first panel needs JS height after render */
    const firstPanel = mount.querySelector('.accordion-item.is-open .accordion-panel');
    if(firstPanel) firstPanel.style.maxHeight = firstPanel.scrollHeight + 'px';

    /* related products */
    const related = window.PRODUCTS.filter(p => p.slug !== product.slug && p.category === product.category);
    const fallback = window.PRODUCTS.filter(p => p.slug !== product.slug);
    window.renderProductGrid(document.getElementById('relatedGrid'), (related.length ? related : fallback).slice(0,4));
  });
})();
