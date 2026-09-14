/* ============================================================
   BIOMOMMIE — Media registry
   Real, free-to-use photography (Unsplash / Pexels, both licensed
   for free commercial use without attribution required) — curated
   to match the brand's warm, quiet-luxury aesthetic.

   To swap any photo: replace its URL below. Nothing else in the
   codebase needs to change — every page reads images through
   MEDIA.* / media.js helpers (see hydrateMedia() in main.js and
   the gallery mapping in products.js).

   When you have real BIOMOMMIE product photography, replace the
   "product" array (and the per-product gallery mapping in
   products.js) first — that's the highest-impact swap.
   ============================================================ */

(function(){
  const MEDIA = {
    hero: [
      "https://images.unsplash.com/photo-1759802147227-d9b32bd34996?auto=format&fit=crop&w=1920&q=80",
      "https://images.pexels.com/photos/3270224/pexels-photo-3270224.jpeg?auto=compress&cs=tinysrgb&w=1920",
      "https://images.pexels.com/photos/30701846/pexels-photo-30701846.jpeg?auto=compress&cs=tinysrgb&w=1920",
      "https://images.unsplash.com/photo-1528569409061-dfb85e3c68d9?auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1552819289-824d37ca69d2?auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1774041197575-62591d2fb12d?auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1654747097476-64c1d3a3ed7c?auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1565340419825-cd1ac212cbce?auto=format&fit=crop&w=1920&q=80",
    ],
    heroVideo: [
      { url: "https://videos.pexels.com/video-files/6849024/6849024-uhd_2560_1440_24fps.mp4", alt: "Slow, calm footage of a mother gently holding and cradling her baby in warm indoor light" },
    ],
    lifestyle: [
      "https://images.unsplash.com/photo-1650872466823-433d9e461b9d?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1657664058220-a1bfc04e2e14?auto=format&fit=crop&w=1400&q=80",
      "https://images.pexels.com/photos/19314798/pexels-photo-19314798.jpeg?auto=compress&cs=tinysrgb&w=1400",
      "https://images.pexels.com/photos/18649629/pexels-photo-18649629.jpeg?auto=compress&cs=tinysrgb&w=1400",
      "https://images.unsplash.com/photo-1620354600301-e8b325ef1181?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1721739225034-a6732d0fd819?auto=format&fit=crop&w=1400&q=80",
      "https://images.pexels.com/photos/31331749/pexels-photo-31331749.jpeg?auto=compress&cs=tinysrgb&w=1400",
      "https://images.pexels.com/photos/326545/pexels-photo-326545.jpeg?auto=compress&cs=tinysrgb&w=1400",
      "https://images.unsplash.com/photo-1739874244845-64aeccd01432?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1770831208268-07daeaa6c6c4?auto=format&fit=crop&w=1400&q=80",
      "https://images.pexels.com/photos/4017418/pexels-photo-4017418.jpeg?auto=compress&cs=tinysrgb&w=1400",
      "https://images.unsplash.com/photo-1542644384-49f9febd8443?auto=format&fit=crop&w=1400&q=80",
    ],
    fabric: [
      "https://images.unsplash.com/photo-1756068785746-8aa1a82d2d1d?auto=format&fit=crop&w=1000&q=80",
      "https://images.pexels.com/photos/6843263/pexels-photo-6843263.jpeg?auto=compress&cs=tinysrgb&w=1000",
      "https://images.pexels.com/photos/7598534/pexels-photo-7598534.jpeg?auto=compress&cs=tinysrgb&w=1000",
      "https://images.pexels.com/photos/5908326/pexels-photo-5908326.jpeg?auto=compress&cs=tinysrgb&w=1000",
      "https://images.pexels.com/photos/18444201/pexels-photo-18444201.jpeg?auto=compress&cs=tinysrgb&w=1000",
    ],
    craftsmanship: [
      { label: "Fabric Selection", url: "https://images.pexels.com/photos/18444201/pexels-photo-18444201.jpeg?auto=compress&cs=tinysrgb&w=1000" },
      { label: "Cutting", url: "https://images.pexels.com/photos/2973399/pexels-photo-2973399.jpeg?auto=compress&cs=tinysrgb&w=1000" },
      { label: "Stitching", url: "https://images.pexels.com/photos/31070325/pexels-photo-31070325.jpeg?auto=compress&cs=tinysrgb&w=1000" },
      { label: "Finishing", url: "https://images.pexels.com/photos/5908326/pexels-photo-5908326.jpeg?auto=compress&cs=tinysrgb&w=1000" },
      { label: "Quality Inspection", url: "https://images.pexels.com/photos/9185814/pexels-photo-9185814.jpeg?auto=compress&cs=tinysrgb&w=1000" },
      { label: "Folding", url: "https://images.pexels.com/photos/4440574/pexels-photo-4440574.jpeg?auto=compress&cs=tinysrgb&w=1000" },
      { label: "Packaging", url: "https://images.pexels.com/photos/7670677/pexels-photo-7670677.jpeg?auto=compress&cs=tinysrgb&w=1000" },
    ],
    gifting: [
      "https://images.unsplash.com/photo-1759563871375-d5b140f6646e?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1620843437920-ead942b3abd3?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1592903297149-37fb25202dfa?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1677259329185-66576e3c70e8?auto=format&fit=crop&w=1400&q=80",
      "https://images.pexels.com/photos/9594426/pexels-photo-9594426.jpeg?auto=compress&cs=tinysrgb&w=1400",
      "https://images.pexels.com/photos/7670677/pexels-photo-7670677.jpeg?auto=compress&cs=tinysrgb&w=1400",
    ],
    product: [
      "https://images.unsplash.com/photo-1617331140180-e8262094733a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1763013258923-f8c06366abb5?auto=format&fit=crop&w=1200&q=80",
      "https://images.pexels.com/photos/22484670/pexels-photo-22484670.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/22484666/pexels-photo-22484666.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/22484671/pexels-photo-22484671.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/7973669/pexels-photo-7973669.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/7973672/pexels-photo-7973672.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/18649622/pexels-photo-18649622.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/37529055/pexels-photo-37529055.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    instagram: [
      "https://images.pexels.com/photos/19314798/pexels-photo-19314798.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.unsplash.com/photo-1657664058220-a1bfc04e2e14?auto=format&fit=crop&w=900&q=80",
      "https://images.pexels.com/photos/31331749/pexels-photo-31331749.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/326545/pexels-photo-326545.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.unsplash.com/photo-1721739225034-a6732d0fd819?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1620354600301-e8b325ef1181?auto=format&fit=crop&w=900&q=80",
      "https://images.pexels.com/photos/8910158/pexels-photo-8910158.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.unsplash.com/photo-1770831208268-07daeaa6c6c4?auto=format&fit=crop&w=900&q=80",
    ],
    journal: {
      "what-to-pack-newborn": "https://plus.unsplash.com/premium_photo-1675183691407-967bef65b9ab?auto=format&fit=crop&w=1600&q=80",
      "baby-shower-gifting-guide": "https://images.unsplash.com/photo-1751450236048-aa1981f7bc2d?auto=format&fit=crop&w=1600&q=80",
      "caring-for-cotton-clothes": "https://images.unsplash.com/photo-1768693602418-260d828b878d?auto=format&fit=crop&w=1600&q=80",
      "building-newborn-wardrobe": "https://plus.unsplash.com/premium_photo-1675183689638-a68fe7048da9?auto=format&fit=crop&w=1600&q=80",
      "story-behind-our-fabrics": "https://images.unsplash.com/photo-1770122985572-ca890ef5ecf3?auto=format&fit=crop&w=1600&q=80",
    },
    about: [
      "https://images.unsplash.com/photo-1753162659724-004dd26e1de3?auto=format&fit=crop&w=1400&q=80",
      "https://images.pexels.com/photos/3738099/pexels-photo-3738099.jpeg?auto=compress&cs=tinysrgb&w=1400",
      "https://images.pexels.com/photos/6461088/pexels-photo-6461088.jpeg?auto=compress&cs=tinysrgb&w=1400",
      "https://images.pexels.com/photos/5830691/pexels-photo-5830691.jpeg?auto=compress&cs=tinysrgb&w=1400",
    ],
  };

  window.MEDIA = MEDIA;
})();
