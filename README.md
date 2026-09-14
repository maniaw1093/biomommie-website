# BIOMOMMIE

Premium baby lifestyle e-commerce website for **BIOMOMMIE**, a Garvcare brand. Plain HTML/CSS/JS — no build tools or Node required, deploys straight to GitHub Pages.

**Live site:** https://maniaw1093.github.io/biomommie-website/

## Project structure

```
index.html              Homepage
shop/                    Shop (all / newborn / clothing / gifting)
product.html             Product detail — reads ?slug= from assets/js/products.js
cart.html, checkout.html Cart + checkout (Razorpay)
wishlist.html, account.html
our-story.html, size-guide.html
journal/                 Magazine-style journal + 5 articles
policies/                Privacy, terms, shipping, returns, FAQs, contact, track order

assets/css/style.css     Full design system (colours, type, components)
assets/js/media.js       Every image/video URL used on the site — swap placeholders here
assets/js/products.js    Product catalogue — edit/add products here
assets/js/config.js      Razorpay key + shipping settings
assets/js/cart.js        Cart (localStorage)
assets/js/wishlist.js    Wishlist (localStorage)
assets/js/checkout.js    Razorpay checkout flow
assets/js/main.js        Header, mobile nav, animations, accordions

tools/                   Page templates + build.py used to generate the HTML
                         above — only needed if you want to edit shared
                         header/footer markup or add a new page.
```

## Editing content (no coding required for most changes)

- **Products, prices, colours, sizes:** edit `assets/js/products.js`.
- **Images/video:** edit `assets/js/media.js`. The site currently uses
  neutral placeholder images in the brand colours so every page works today —
  replace these URLs with your real photography/video whenever it's ready.
- **Razorpay payments:** put your real Key ID from the Razorpay Dashboard
  (Settings → API Keys) into `assets/js/config.js`. Test mode keys start
  with `rzp_test_`, live keys with `rzp_live_`.
- **Journal articles, policies, homepage copy:** these are plain HTML files —
  edit the file directly and refresh the browser.

## Editing the shared header/footer or adding a new page

The header and footer are shared across every page via a tiny Python build
script (no Node needed):

```
tools/templates/header.html   shared header (edit once, applies everywhere)
tools/templates/footer.html   shared footer
tools/templates/shell.html    <head> boilerplate, fonts, script tags
tools/pages/**.html           one source fragment per page (mirrors the
                               final file layout, e.g. tools/pages/shop/index.html)
```

After editing anything in `tools/`, regenerate the site:

```
python3 tools/build.py
```

This overwrites the generated HTML files at the repo root/subfolders. Commit
and push as usual.

## Deploying

Already deployed via GitHub Pages, serving from the `main` branch root. Any
push to `main` updates the live site within a minute or two — no CI/build
step required since the HTML is pre-generated and committed.

## Known limitations of a backend-free static site

- **Checkout** uses Razorpay's client-side Standard Checkout, so it can
  charge the real cart total without a server — but the amount isn't
  verified server-side, so treat it as an MVP checkout, not a
  tamper-proof one, before scaling.
- **Account/login** is a visual shell only — there's no real authentication
  without a backend.
- **Cart/wishlist** live in the browser's localStorage, so they're
  per-device and clear if site data is cleared.
