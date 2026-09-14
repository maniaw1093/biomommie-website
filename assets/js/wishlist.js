/* ============================================================
   BIOMOMMIE — Wishlist (localStorage, array of product slugs)
   ============================================================ */

(function(){
  const KEY = 'biomommie_wishlist';

  function getWishlist(){
    try{ return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch(e){ return []; }
  }
  function saveWishlist(list){
    localStorage.setItem(KEY, JSON.stringify(list));
    updateCountBadge();
  }
  function isWishlisted(slug){ return getWishlist().includes(slug); }
  function toggleWishlist(slug){
    let list = getWishlist();
    if(list.includes(slug)){ list = list.filter(s => s !== slug); }
    else { list.push(slug); if(window.showToast) window.showToast('Added to your wishlist'); }
    saveWishlist(list);
    return list.includes(slug);
  }
  function updateCountBadge(){
    document.querySelectorAll('#wishlistCount').forEach(el => {
      const n = getWishlist().length;
      el.textContent = n;
      el.hidden = n === 0;
    });
  }

  function renderWishlistPage(){
    const mount = document.getElementById('wishlistMount');
    if(!mount || !window.PRODUCTS) return;
    const slugs = getWishlist();
    const items = window.PRODUCTS.filter(p => slugs.includes(p.slug));

    if(items.length === 0){
      mount.innerHTML = `
        <div class="empty-state reveal is-visible">
          <div class="icon">${window.ICONS.heart}</div>
          <h3>Your wishlist is empty</h3>
          <p class="text-muted" style="margin:14px 0 30px">Save the pieces you love for later.</p>
          <a href="${window.SITE_BASE}shop/index.html" class="btn btn-dark">Explore the Shop</a>
        </div>`;
      return;
    }
    mount.innerHTML = `<div class="grid g4">${items.map(p => window.renderProductCard(p)).join('')}</div>`;
    window.bindProductCardEvents(mount);
    if(window.observeReveals) window.observeReveals(mount);
  }

  window.Wishlist = { getWishlist, isWishlisted, toggleWishlist };

  document.addEventListener('DOMContentLoaded', () => {
    updateCountBadge();
    renderWishlistPage();
  });
})();
