/* ============================================================
   BIOMOMMIE — site configuration
   Edit these values for your real store. Nothing else in the
   codebase needs to change.
   ============================================================ */

window.SITE_CONFIG = {
  /* Get this from your Razorpay Dashboard → Settings → API Keys.
     Starts with rzp_test_ while testing, rzp_live_ once you go live.
     This is a PUBLIC key (safe to expose in frontend code) — never
     put your Razorpay Key Secret anywhere in this website. */
  RAZORPAY_KEY_ID: 'rzp_live_Tbsjl9FwvIqwSt',

  FREE_SHIPPING_THRESHOLD: 1999,
  SHIPPING_FEE: 99,

  /* Used by the WhatsApp/email fallbacks and contact forms. */
  SUPPORT_EMAIL: 'hello@biomommie.com',
  SUPPORT_WHATSAPP: '910000000000', // country code + number, no + or spaces
};
