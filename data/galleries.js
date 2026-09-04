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
    { src: 'CTA-Card-3_CYCLES.webp',             cap: 'Three cycles — website evolution' },
    { src: '2022-sites.jpg',                     cap: '2022 platform — responsive system' },
    { src: '2022-Redesign.webp',                 cap: '3rd cycle — website evolution (2022, live)', long: true },
    { src: 'HBA-Autumn-01.webp',                 cap: 'Autumn Collateral (2022, live)', long: true },
    { src: 'autumn-landing-desktop.jpg',         cap: 'Autumn campaign — landing page', long: true },
    { src: 'HBA-Referral-01 copy.webp',          cap: 'Referral Program', long: true },
    { src: 'HBA-CraftingCampaign-01.webp',       cap: 'Crafting Campaign', long: true },
    { src: '2019-design-overview.jpg',           cap: '2019 cycle — overview' },
    { src: '2019-Redesign-Full.webp',            cap: '2nd cycle — website evolution (2018)', long: true },
    { src: '2010-redesign.webp',                 cap: '1st cycle — website evolution (2012)', long: true },
    { src: 'onlineads-grand-opening.jpg',        cap: 'Grand Opening — online ads' },
    { src: 'onlineads-black-friday.jpg',         cap: 'Black Friday — online ads' },
    { src: 'HBA-Posters.webp',                   cap: 'Homes by Avi Posters' }    

  ],

  /* ---------- CMCA ---------- */
  cmca: [
    { src: '01_CMCA-Poster-02_LAYOUT-01.webp',            cap: 'Winterfest Event Poster 2022 — poster', long: true },
    { src: '02_CMCA-Swag_LAYOUT-01.webp',                 cap: 'Branded swag' },
    { src: '03_CMCA-Logos-PosterMural_LAYOUT-01.webp',    cap: 'CMCA Brand, subsidiary logos and posters & mural', long: true },
    { src: '04_CMCA-Poster-01b_LAYOUT-01.webp',           cap: 'Winterfest Event Poster 2021 — poster', long: true },
    { src: '05_CMCA-Events-Social_LAYOUT-01.webp',        cap: 'Multiple events and mediums — print, OOH and social', long: true },
    { src: '06_CMCA-Website_LAYOUT-01.webp',              cap: 'Website — original design, 2018' },
    { src: '07_CMCA-A-Frame_EventSignage_LAYOUT-01.webp', cap: 'Event Signage — posters and pay frames', long: true },
    { src: '08_CMCA-DiscGolf_LAYOUT-01.webp',             cap: 'Canyon Meadows Disc Golf brand material — multiple mediums', long: true },
    { src: '09_CMCA-SIS-Brand_LAYOUT-01.webp',            cap: 'Stampede in September, largest CMCA event — brand', long: true }
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
