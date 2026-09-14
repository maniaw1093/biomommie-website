/* ============================================================
   BIOMOMMIE — Cart
   Client-side cart backed by localStorage (no server). Each line
   item: {slug, name, image, price, color, size, qty, stripeLink}
   ============================================================ */

(function(){
  const KEY = 'biomommie_cart';

  function getCart(){
    try{ return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch(e){ return []; }
  }
  function saveCart(cart){
    localStorage.setItem(KEY, JSON.stringify(cart));
    updateCountBadge();
  }
  function lineKey(item){ return [item.slug, item.color, item.size].join('__'); }

  function addToCart(item){
    const cart = getCart();
    const key = lineKey(item);
    const existing = cart.find(l => lineKey(l) === key);
    if(existing){ existing.qty += item.qty || 1; }
    else { cart.push(Object.assign({qty:1}, item)); }
    saveCart(cart);
    if(window.showToast) window.showToast(`${item.name} added to your bag`);
  }
  function removeLine(key){
    saveCart(getCart().filter(l => lineKey(l) !== key));
  }
  function setQty(key, qty){
    const cart = getCart();
    const line = cart.find(l => lineKey(l) === key);
    if(line){ line.qty = Math.max(1, qty); saveCart(cart); }
  }
  function cartCount(){ return getCart().reduce((n,l)=>n+l.qty,0); }
  function cartSubtotal(){ return getCart().reduce((n,l)=>n+l.qty*l.price,0); }

  function updateCountBadge(){
    document.querySelectorAll('#cartCount').forEach(el => {
      const n = cartCount();
      el.textContent = n;
      el.hidden = n === 0;
    });
  }

  function money(n){ return '₹' + n.toLocaleString('en-IN'); }

  function renderCartPage(){
    const mount = document.getElementById('cartMount');
    if(!mount) return;
    const cart = getCart();

    if(cart.length === 0){
      mount.innerHTML = `
        <div class="empty-state reveal is-visible">
          <div class="icon">${window.ICONS.heart.replace('heart','')}
            <svg viewBox="0 0 24 24" fill="none"><path d="M6.5 8h11l.9 12.2a1 1 0 0 1-1 1.08H6.6a1 1 0 0 1-1-1.08L6.5 8Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8" stroke="currentColor" stroke-width="1.2"/></svg>
          </div>
          <h3>Your bag is empty</h3>
          <p class="text-muted" style="margin:14px 0 30px">Beautifully made essentials are waiting for you.</p>
          <a href="${window.SITE_BASE}shop/index.html" class="btn btn-dark">Continue Shopping</a>
        </div>`;
      return;
    }

    const linesHtml = cart.map(l => `
      <div class="cart-line" data-key="${lineKey(l)}">
        <img src="${l.image}" alt="${l.name}">
        <div>
          <h4>${l.name}</h4>
          <p class="meta">${l.color} &middot; Size ${l.size}</p>
          <div class="qty-stepper">
            <button type="button" data-step="down">&minus;</button>
            <input type="text" value="${l.qty}" inputmode="numeric" readonly>
            <button type="button" data-step="up">+</button>
          </div>
          <button class="cart-remove" type="button">Remove</button>
        </div>
        <div class="price">${money(l.price * l.qty)}</div>
      </div>`).join('');

    const subtotal = cartSubtotal();
    const shipping = subtotal >= 1999 || subtotal === 0 ? 0 : 99;

    mount.innerHTML = `
      <div class="cart-layout">
        <div class="cart-lines">${linesHtml}</div>
        <div class="summary-card">
          <h3 style="margin-bottom:20px">Order Summary</h3>
          <div class="summary-row"><span>Subtotal</span><span>${money(subtotal)}</span></div>
          <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? 'Free' : money(shipping)}</span></div>
          <div class="summary-row total"><span>Total</span><span>${money(subtotal + shipping)}</span></div>
          <a href="${window.SITE_BASE}checkout.html" class="btn btn-dark btn-block" style="margin-top:22px">Proceed to Checkout</a>
        </div>
      </div>`;

    mount.querySelectorAll('.cart-line').forEach(row => {
      const key = row.dataset.key;
      row.querySelector('.cart-remove').addEventListener('click', () => { removeLine(key); renderCartPage(); });
      row.querySelectorAll('.qty-stepper button').forEach(btn => {
        btn.addEventListener('click', () => {
          const input = row.querySelector('.qty-stepper input');
          let val = parseInt(input.value,10) || 1;
          val = btn.dataset.step === 'down' ? Math.max(1,val-1) : val+1;
          setQty(key, val);
          renderCartPage();
        });
      });
    });
  }

  window.Cart = { getCart, addToCart, removeLine, setQty, cartCount, cartSubtotal, money, lineKey };

  document.addEventListener('DOMContentLoaded', () => {
    updateCountBadge();
    renderCartPage();
  });
})();
