/* ============================================================
   GALLERY ORDER — edit this file to change any work page.

   • Reorder      → move a line up or down
   • Remove       → delete the line (or put // in front of it)
   • Add          → copy a line, change the file name and caption
   • Long scroll  → add long: true for full-page screenshots
                    (they get a fixed-width frame that scrolls on hover;
                     the scroll speed adjusts to the image, so any length reads
                     at the same pace — export them 1200px wide)

   Export sizes: normal pieces 1600px on the long edge, WebP ~80.

   Images live in assets/work/<project>/web/
   ============================================================ */

/* where the image folders live, relative to the page */
window.ASSET_BASE = '../assets/';

window.WORK_GALLERIES = {

  /* ---------- Homes by Avi ---------- */
  hba: [
    { src: '2022-sites.jpg',                     cap: '2022 platform — responsive system' },
    { src: 'autumn-landing-desktop.jpg',         cap: 'Autumn campaign — landing page', long: true },
    { src: 'autumn-landing-mobile.jpg',          cap: 'Autumn campaign — mobile', long: true },
    { src: '2022-information-architecture.jpg',   cap: 'Information architecture' },
    { src: 'homepage-desktop-cgy.jpg',           cap: 'Calgary homepage', long: true },
    { src: '2022-iphone-mockup.jpg',             cap: 'Mobile experience' },
    { src: 'referral-phone-scroll.jpg',          cap: 'Referral program' },
    { src: 'billboard-crafting-memories.jpg',    cap: 'Crafting Memories — billboard' },
    { src: 'busad-crafting-memories.jpg',        cap: 'Crafting Memories — transit' },
    { src: 'busad-autumn-a.jpg',                 cap: 'Autumn — transit' },
    { src: 'busad-autumn-c.jpg',                 cap: 'Autumn — transit' },
    { src: 'magazinead-crafting-memories.jpg',   cap: 'Crafting Memories — magazine' },
    { src: 'magazinead-01.jpg',                  cap: 'Magazine' },
    { src: 'digitalad-crafting-memories.jpg',    cap: 'Crafting Memories — digital' },
    { src: 'onlineads-crafting-memories.jpg',    cap: 'Crafting Memories — online ads' },
    { src: 'onlineads-grand-opening.jpg',        cap: 'Grand Opening — online ads' },
    { src: 'onlineads-black-friday.jpg',         cap: 'Black Friday — online ads' },
    { src: '2019-design-overview.jpg',           cap: '2019 cycle — overview' }
  ],

  /* ---------- CMCA ---------- */
  cmca: [
    { src: 'winterfest-poster-01.jpg',    cap: 'Winterfest — poster' },
    { src: 'winterfest-poster-02.jpg',    cap: 'Winterfest — poster' },
    { src: 'cmca-logo-colour.jpg',        cap: 'Association identity' },
    { src: 'homepage-desktop.jpg',        cap: 'Website — desktop', long: true },
    { src: 'homepage-mobile.jpg',         cap: 'Website — mobile' },    
    { src: '50-years-logo.jpg',           cap: '50 years — anniversary mark' },
    { src: 'disc-golf-logo.jpg',          cap: 'Disc Golf — program mark' },
    { src: 'business-partnership-logo.jpg', cap: 'Business Partnership — mark' },
    { src: 'scoop-logo.jpg',              cap: 'The Scoop — masthead' },
    { src: 'door-knockers.jpg',           cap: 'Door knockers' },
    { src: 'christmas-fair-facebook.jpg', cap: 'Christmas Fair — social' },
    { src: 'sins-2024-facebook.jpg',      cap: 'Stampede in September — social' }
  ],

  /* ---------- Archive (folder: current) ---------- */
  archive: [
    { src: 'benevity-home.jpg',            cap: 'Benevity — homepage' },
    { src: 'benevity-sub.jpg',             cap: 'Benevity — subpage' },
    { src: 'benevity-corporate-home.jpg',  cap: 'Benevity — corporate' },
    { src: 'benevity-corporate-sub.jpg',   cap: 'Benevity — corporate subpage' },
    { src: 'kilo9-website-homepage.jpg',   cap: 'Kilo9 Pet Resort — website', long: true },
    { src: 'kilo9-logo-dark.jpg',          cap: 'Kilo9 — identity' },    
    { src: 'cl-businesscard-front.jpg',    cap: 'Business card — front' },
    { src: 'cl-businesscard-back.jpg',     cap: 'Business card — back' },
    { src: 'chmic-website-home.jpg',       cap: 'CHMIC — website' },
  ]
};

/* folder each gallery pulls from */
window.WORK_FOLDERS = { hba: 'hba', cmca: 'cmca', archive: 'current' };
