/* ============================================================
   BIOMOMMIE — Checkout (checkout.html)
   Static-site checkout: collects customer/shipping details, then
   opens Razorpay's client-side Standard Checkout for the real
   cart total. No backend required — Razorpay records the payment
   (with the shipping details attached as "notes") in your Razorpay
   Dashboard, which is where you'll process/ship orders from.

   IMPORTANT: without a backend, the amount charged is set by this
   page's JavaScript rather than verified server-side. That's fine
   to start selling quickly, but before scaling meaningfully, move
   order-amount calculation to a small server (or a Razorpay
   integration partner) so it can't be tampered with in devtools.
   ============================================================ */

(function(){
  document.addEventListener('DOMContentLoaded', () => {
    const mount = document.getElementById('checkoutMount');
    if(!mount || !window.Cart) return;

    const cart = window.Cart.getCart();
    if(cart.length === 0){
      mount.innerHTML = `
        <div class="empty-state reveal is-visible">
          <h3>Your bag is empty</h3>
          <p class="text-muted" style="margin:14px 0 30px">Add something beautiful before checking out.</p>
          <a href="${window.SITE_BASE}shop/index.html" class="btn btn-dark">Continue Shopping</a>
        </div>`;
      return;
    }

    const subtotal = window.Cart.cartSubtotal();
    const cfg = window.SITE_CONFIG;
    const shipping = subtotal >= cfg.FREE_SHIPPING_THRESHOLD ? 0 : cfg.SHIPPING_FEE;
    const total = subtotal + shipping;

    mount.innerHTML = `
      <div class="checkout-layout">
        <div>
          <h3 style="margin-bottom:26px">Customer Details</h3>
          <form id="checkoutForm">
            <div class="form-row">
              <div class="form-group"><label>First Name</label><input type="text" name="firstName" required></div>
              <div class="form-group"><label>Last Name</label><input type="text" name="lastName" required></div>
            </div>
            <div class="form-group"><label>Email Address</label><input type="email" name="email" required></div>
            <div class="form-group"><label>Phone Number</label><input type="tel" name="phone" required pattern="[0-9]{10}" placeholder="10-digit mobile number"></div>
            <div class="form-group"><label>Address</label><input type="text" name="address" required placeholder="House / street / area"></div>
            <div class="form-row">
              <div class="form-group"><label>City</label><input type="text" name="city" required></div>
              <div class="form-group"><label>State</label><input type="text" name="state" required></div>
            </div>
            <div class="form-row">
              <div class="form-group"><label>Pincode</label><input type="text" name="pincode" required pattern="[0-9]{6}"></div>
              <div class="form-group"><label>Order Note (optional)</label><input type="text" name="note" placeholder="Gift message, delivery note…"></div>
            </div>
            <button class="btn btn-dark btn-block" type="submit" id="payBtn">Pay ${window.Cart.money(total)} Securely</button>
            <div class="stripe-note">
              <span>&#128274;</span>
              <span>Payments are processed securely by Razorpay. We never see or store your card details.</span>
            </div>
          </form>
        </div>

        <div class="summary-card">
          <h4 style="margin-bottom:18px">Order Summary</h4>
          <div id="checkoutLines"></div>
          <div class="summary-row"><span>Subtotal</span><span>${window.Cart.money(subtotal)}</span></div>
          <div class="summary-row"><span>Shipping</span><span>${shipping===0?'Free':window.Cart.money(shipping)}</span></div>
          <div class="summary-row total"><span>Total</span><span>${window.Cart.money(total)}</span></div>
        </div>
      </div>
    `;

    document.getElementById('checkoutLines').innerHTML = cart.map(l => `
      <div class="checkout-summary-line">
        <img src="${l.image}" alt="${l.name}">
        <div class="flex1">
          <div style="font-size:.92rem">${l.name}</div>
          <div class="text-muted" style="font-size:.8rem">${l.color} &middot; ${l.size} &middot; Qty ${l.qty}</div>
        </div>
        <div>${window.Cart.money(l.price*l.qty)}</div>
      </div>`).join('');

    const form = document.getElementById('checkoutForm');
    const payBtn = document.getElementById('payBtn');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if(!window.Razorpay){
        window.showToast('Payments are still loading — please try again in a moment.');
        return;
      }
      const data = Object.fromEntries(new FormData(form).entries());
      const itemsNote = cart.map(l => `${l.name} (${l.color}/${l.size}) x${l.qty}`).join(' | ');

      payBtn.disabled = true;
      payBtn.textContent = 'Opening secure payment…';

      const rzp = new Razorpay({
        key: cfg.RAZORPAY_KEY_ID,
        amount: total * 100,
        currency: 'INR',
        name: 'BIOMOMMIE',
        description: `Order for ${data.firstName} ${data.lastName}`,
        prefill: { name: `${data.firstName} ${data.lastName}`, email: data.email, contact: data.phone },
        notes: {
          address: `${data.address}, ${data.city}, ${data.state} ${data.pincode}`,
          items: itemsNote,
          order_note: data.note || '',
        },
        theme: { color: '#2A251E' },
        handler: function(response){
          localStorage.setItem('biomommie_cart', '[]');
          mount.innerHTML = `
            <div class="empty-state reveal is-visible">
              <h3>Thank you, ${data.firstName}.</h3>
              <p class="text-muted" style="margin:14px 0 8px">Your order has been placed.</p>
              <p class="text-muted" style="font-size:.8rem">Payment reference: ${response.razorpay_payment_id}</p>
              <a href="${window.SITE_BASE}shop/index.html" class="btn btn-dark" style="margin-top:30px">Continue Shopping</a>
            </div>`;
          if(window.Cart) document.querySelectorAll('#cartCount').forEach(el=>el.hidden=true);
        },
        modal: {
          ondismiss: function(){
            payBtn.disabled = false;
            payBtn.textContent = `Pay ${window.Cart.money(total)} Securely`;
            window.showToast('Payment cancelled — you can try again anytime.');
          }
        }
      });
      rzp.on('payment.failed', function(){
        payBtn.disabled = false;
        payBtn.textContent = `Pay ${window.Cart.money(total)} Securely`;
        window.showToast('Payment failed — please try again.');
      });
      rzp.open();
    });
  });
})();
