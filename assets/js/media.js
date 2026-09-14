/* ============================================================
   BIOMOMMIE — Media registry
   Every photo/video URL used across the site lives here so the
   whole catalogue can be swapped from placeholders to real brand
   photography by editing this single file.

   NOTE: this build ships with neutral placeholder imagery
   (placehold.co) in the brand palette so every page is fully
   viewable today. Replace the URLs below with real photography /
   licensed stock links — nothing else in the codebase needs to
   change, every page reads images through MEDIA.* / media.js helpers.
   ============================================================ */

(function(){
  /* `label` is kept as the accessible/dev-facing name but intentionally
     not baked into the image — real photography has no text on it, and
     overlaying it under real page headlines (hero, banners) looked like
     a collision. Swap these URLs for real photos whenever ready. */
  function ph(w,h,bg,fg,label){
    return `https://placehold.co/${w}x${h}/${bg}/${bg}`;
  }

  const BEIGE="E8DCC7", CREAM="F3ECE0", BLUSH="EEDDD3", SAGE="93A188", TAUPE="AB9578", CHARCOAL="2A251E", IVORY="FAF7F1";
  const DARK=CHARCOAL, LIGHT=IVORY;

  const MEDIA = {
    hero: [
      ph(1920,1280,BEIGE,DARK,"Mother & Newborn"),
      ph(1920,1280,CREAM,DARK,"Tiny Hands"),
      ph(1920,1280,BLUSH,DARK,"Nursery Light"),
      ph(1920,1280,TAUPE,LIGHT,"Soft Morning"),
      ph(1920,1280,SAGE,LIGHT,"Mother Touch"),
      ph(1920,1280,BEIGE,DARK,"Baby Wrapped"),
    ],
    heroVideo: [],
    lifestyle: [
      ph(1200,1500,CREAM,DARK,"Father & Baby"),
      ph(1200,1500,BEIGE,DARK,"Baby Sleeping"),
      ph(1200,1500,BLUSH,DARK,"Family Moment"),
      ph(1200,1500,TAUPE,LIGHT,"Baby Wearing Romper"),
      ph(1200,1500,SAGE,LIGHT,"Fabric Touch"),
      ph(1200,1500,CREAM,DARK,"Window Light"),
      ph(1200,1500,BEIGE,DARK,"Cuddles"),
      ph(1200,1500,BLUSH,DARK,"Nursery Corner"),
      ph(1200,1500,TAUPE,LIGHT,"Mother Reading"),
      ph(1200,1500,SAGE,LIGHT,"Little Hands"),
      ph(1200,1500,CREAM,DARK,"Soft Blanket"),
      ph(1200,1500,BEIGE,DARK,"Baby Smiling"),
    ],
    fabric: [
      ph(900,900,CREAM,DARK,"Cotton Macro"),
      ph(900,900,BEIGE,DARK,"Interlock Knit"),
      ph(900,900,BLUSH,DARK,"Stitching Detail"),
      ph(900,900,TAUPE,LIGHT,"Seam Finish"),
      ph(900,900,SAGE,LIGHT,"Snap Closure"),
      ph(900,900,CREAM,DARK,"Fabric Fold"),
    ],
    craftsmanship: [
      {label:"Fabric Selection", url: ph(900,1100,BEIGE,DARK,"Fabric Selection")},
      {label:"Cutting", url: ph(900,1100,CREAM,DARK,"Cutting")},
      {label:"Stitching", url: ph(900,1100,BLUSH,DARK,"Stitching")},
      {label:"Finishing", url: ph(900,1100,TAUPE,LIGHT,"Finishing")},
      {label:"Quality Inspection", url: ph(900,1100,SAGE,LIGHT,"Quality Inspection")},
      {label:"Folding", url: ph(900,1100,CREAM,DARK,"Folding")},
      {label:"Packaging", url: ph(900,1100,BEIGE,DARK,"Packaging")},
    ],
    gifting: [
      ph(1400,1600,CREAM,DARK,"Gift Box"),
      ph(1400,1600,BEIGE,DARK,"Tissue & Ribbon"),
      ph(1400,1600,BLUSH,DARK,"Box Opening"),
      ph(1400,1600,TAUPE,LIGHT,"Folded Clothing"),
      ph(1400,1600,SAGE,LIGHT,"Greeting Card"),
      ph(1400,1600,CREAM,DARK,"Presentation"),
    ],
    product: [
      ph(1200,1500,CREAM,DARK,"Product Front"),
      ph(1200,1500,BEIGE,DARK,"Product Detail"),
      ph(1200,1500,BLUSH,DARK,"Product Flat"),
      ph(1200,1500,TAUPE,LIGHT,"Product Worn"),
      ph(1200,1500,SAGE,LIGHT,"Product Soft"),
      ph(1200,1500,CREAM,DARK,"Product Set"),
      ph(1200,1500,BEIGE,DARK,"Product Close"),
      ph(1200,1500,BLUSH,DARK,"Product Angle"),
      ph(1200,1500,TAUPE,LIGHT,"Product Pair"),
      ph(1200,1500,SAGE,LIGHT,"Product Texture"),
    ],
    instagram: [
      ph(800,800,BEIGE,DARK,"@biomommie"),
      ph(800,800,CREAM,DARK,"@biomommie"),
      ph(800,800,BLUSH,DARK,"@biomommie"),
      ph(800,800,TAUPE,LIGHT,"@biomommie"),
      ph(800,800,SAGE,LIGHT,"@biomommie"),
      ph(800,800,CREAM,DARK,"@biomommie"),
      ph(800,800,BEIGE,DARK,"@biomommie"),
      ph(800,800,BLUSH,DARK,"@biomommie"),
    ],
    journal: {
      "what-to-pack-newborn": ph(1600,1000,BEIGE,DARK,"Newborn Packing"),
      "baby-shower-gifting-guide": ph(1600,1000,BLUSH,DARK,"Baby Shower"),
      "caring-for-cotton-clothes": ph(1600,1000,CREAM,DARK,"Cotton Care"),
      "building-newborn-wardrobe": ph(1600,1000,TAUPE,LIGHT,"Newborn Wardrobe"),
      "story-behind-our-fabrics": ph(1600,1000,SAGE,LIGHT,"Our Fabrics"),
    },
    about: [
      ph(1400,1700,BEIGE,DARK,"Our Story"),
      ph(1400,1700,CREAM,DARK,"Thoughtful Workspace"),
      ph(1400,1700,BLUSH,DARK,"Hands & Fabric"),
      ph(1400,1700,TAUPE,LIGHT,"Founder Moment"),
    ],
  };

  window.MEDIA = MEDIA;
})();
