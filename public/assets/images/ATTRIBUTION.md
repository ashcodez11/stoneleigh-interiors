# Image attribution & licence record

This file documents every image shipped in `public/assets/images/` for **Stoneleigh
Interiors**: the original stock source page, the photographer, the licence and the
stored pixel dimensions.

## Status of this imagery — read first

- **The great majority of the photographs here are licence-cleared stock artwork**,
  sourced from [Pexels](https://www.pexels.com/) under the **Pexels License** — free for
  commercial and non-commercial use, **attribution not required**. Attribution is
  recorded here in full regardless. **Two files are not stock:** `brand/hero-stoneleigh.png`
  and `spaces/pooja-room.webp` were supplied directly by the studio owner and are used
  exactly as provided — see "Owner-supplied files" below.
- **They are REPRESENTATIVE imagery only.** None of these photographs is Stoneleigh
  Interiors' own project photography, and none is presented on the site as a
  completed Stoneleigh project. The site labels its case studies
  "Representative study" and every stock slot in `src/lib/images.ts` is flagged
  `placeholder: true` purely to record provenance in code. (The two owner-supplied
  files are flagged `placeholder: false`.)
- **They must be replaced with the studio's own photographs before launch** wherever
  genuine project imagery is claimed. When the studio supplies real photography,
  drop the files into `public/assets/images/...`, update `src`/`alt` in
  `src/lib/images.ts` and set `placeholder: false`.
- **Video assets are excluded.** No film was supplied for this studio, so this
  project ships no video and no video poster frame. (The source studio's hero film
  is not part of this repository.)
- **Scope:** 80 files are present under `public/assets/images/`. All 80 are recorded
  below — the 78 stock files carried over from the source project's record, plus two
  files supplied directly by the studio owner. Relative to the source project's record,
  a logo file, one studio-supplied closing photograph, and a `testimonials/` folder are
  absent here; the remaining stock files are the same set.

## Licence

**Pexels License** — free to use for commercial and non-commercial purposes, no
attribution required. See https://www.pexels.com/license/ .

All files are self-hosted under `public/assets/images/` (WebP, with a single PNG hero);
no third-party URLs are hotlinked at runtime.

## House colour grade applied

Every **stock** file in this folder has had one consistent, non-destructive colour grade
baked in so the whole library reads as a single warm editorial shoot. (The two
owner-supplied files noted above are used exactly as supplied and were deliberately
**not** re-graded, re-encoded or resized.)

1. **Warm white balance toward a champagne target** (R : G : B = 1 : 0.945 : 0.875).
   Frames that sit cooler than the target are corrected firmly; frames already warmer
   than the target are only gently trimmed, so genuinely rich golden frames keep their
   warmth. Green casts are neutralised.
2. **Exposure preserved** — mean luminance is restored after the balance shift.
3. **Rich brown shadows** — a gentle warm toe so darks read brown, never blue or black.
4. **Soft highlight roll-off** so whites stay creamy rather than clinical.
5. **Mild contrast** (+7% around mid-grey).
6. **Normalised saturation** toward one warm-luxury band, so flat frames gain body and
   over-saturated frames are restrained.

No crop, resize, reframe or content change was made: **pixel dimensions are unchanged**,
so every `width`/`height` in `src/lib/images.ts` remains accurate. The source
photographs and their licences are exactly as recorded below.

## Summary

- **Files documented:** 80
- **Matched to a recorded stock source:** 78
- **Owner-supplied, source not recorded:** 2
- **Source platform:** Pexels (stock files only)

## Record

### `brand/`

| File path | Original page URL | Photographer | Licence | Dimensions |
| --- | --- | --- | --- | --- |
| `brand/introduction.webp` | https://www.pexels.com/photo/elegant-modern-living-room-interior-design-36601369/ | Ritam Das | Pexels License | 1200×1500 |
| `brand/introduction-wide.webp` | https://www.pexels.com/photo/modern-luxurious-living-room-interior-design-36601414/ | Ritam Das | Pexels License | 2400×1350 |
| `brand/about-interior.webp` | https://www.pexels.com/photo/charming-living-room-with-vintage-furniture-and-ambient-lighting-in-jodhpur-14197309/ | Megha | Pexels License | 1600×2133 |
| `brand/contact-hero.webp` | https://www.pexels.com/photo/7148849/ | souranshi fashion and lifestyle magazine | Pexels License | 2400×1600 |
| `brand/team-pending.webp` | https://www.pexels.com/photo/textile-samples-and-paper-illustrations-on-desk-in-workroom-7147552/ | michael burrows | Pexels License | 1600×1000 |
| `brand/hero-stoneleigh.png` | — (supplied by studio owner) | — | Used as supplied | 1024×1024 |

### `spaces/`

| File path | Original page URL | Photographer | Licence | Dimensions |
| --- | --- | --- | --- | --- |
| `spaces/pooja-room.webp` | — (supplied by studio owner) | — | Used as supplied | 2048×2048 |

### `services/`

| File path | Original page URL | Photographer | Licence | Dimensions |
| --- | --- | --- | --- | --- |
| `services/architectural-design.webp` | https://www.pexels.com/photo/white-window-of-concrete-building-7425308/ | setu r8 | Pexels License | 1200×1600 |
| `services/bedroom-interiors.webp` | https://www.pexels.com/photo/elegant-modern-bedroom-with-wooden-accents-37846775/ | Misbaa eri | Pexels License | 1200×1600 |
| `services/complete-home-interiors.webp` | https://www.pexels.com/photo/interior-design-of-a-dining-room-12784156/ | dropshado | Pexels License | 1200×1600 |
| `services/custom-furniture-storage.webp` | https://www.pexels.com/photo/modern-minimalist-indoor-wooden-closet-design-31759521/ | Misbaa eri | Pexels License | 1200×1600 |
| `services/dining-spaces.webp` | https://www.pexels.com/photo/elegant-dining-room-with-floral-chairs-and-marble-floor-36601404/ | Ritam Das | Pexels License | 1200×1600 |
| `services/living-room-interiors.webp` | https://www.pexels.com/photo/a-luxurious-living-room-17948134/ | Kirti  Phadke | Pexels License | 1200×1600 |
| `services/modular-kitchens.webp` | https://www.pexels.com/photo/modular-kitchen-design-3926542/ | Houzlook .com | Pexels License | 1200×1600 |
| `services/residential-interior-design.webp` | https://www.pexels.com/photo/illuminated-modern-interior-20653884/ | roshan patel | Pexels License | 1200×1600 |

### `philosophy/`

| File path | Original page URL | Photographer | Licence | Dimensions |
| --- | --- | --- | --- | --- |
| `philosophy/staircase.webp` | https://www.pexels.com/photo/modern-house-interior-with-wooden-elements-17905813/ | caio mantovani | Pexels License | 1200×1600 |
| `philosophy/staircase-wide.webp` | https://www.pexels.com/photo/modern-living-room-with-stylish-sofa-and-lighting-38199516/ | danielrosehill | Pexels License | 2400×1350 |

### `instagram/`

| File path | Original page URL | Photographer | Licence | Dimensions |
| --- | --- | --- | --- | --- |
| `instagram/01.webp` | https://www.pexels.com/photo/vases-on-a-coffee-table-9116640/ | ksu eli studio | Pexels License | 1000×1000 |
| `instagram/02.webp` | https://www.pexels.com/photo/close-up-shot-of-a-sconce-chandelier-9036950/ | ikke mist deg selv goshawk | Pexels License | 1000×1000 |
| `instagram/03.webp` | https://www.pexels.com/photo/cozy-sunlit-room-with-potted-plant-and-curtains-34975226/ | aleksandra hryn | Pexels License | 1000×1000 |
| `instagram/04.webp` | https://www.pexels.com/photo/modern-cozy-bedroom-interior-design-with-natural-light-28586180/ | jonathanborba | Pexels License | 1000×1000 |
| `instagram/05.webp` | https://www.pexels.com/photo/wooden-furniture-and-table-in-room-19980220/ | alex tyson | Pexels License | 1000×1000 |
| `instagram/06.webp` | https://www.pexels.com/photo/brown-and-black-wooden-chair-14546703/ | casa innata | Pexels License | 1000×1000 |

### `social/`

| File path | Original page URL | Photographer | Licence | Dimensions |
| --- | --- | --- | --- | --- |
| `social/og-home.webp` | https://www.pexels.com/photo/a-brown-couch-inside-the-living-room-7166929/ | artbovich | Pexels License | 1200×630 |

### `projects/living-room/`

| File path | Original page URL | Photographer | Licence | Dimensions |
| --- | --- | --- | --- | --- |
| `projects/living-room/gallery-01.webp` | https://www.pexels.com/photo/elegant-modern-living-room-interior-design-31737839/ | dropshado | Pexels License | 2000×1375 |
| `projects/living-room/gallery-02.webp` | https://www.pexels.com/photo/modern-cozy-living-room-with-elegant-lighting-36601412/ | Ritam Das | Pexels License | 1200×1500 |
| `projects/living-room/gallery-03.webp` | https://www.pexels.com/photo/furniture-in-living-room-17948130/ | Kirti  Phadke | Pexels License | 1200×1500 |
| `projects/living-room/gallery-04.webp` | https://www.pexels.com/photo/a-cozy-living-room-with-television-and-couch-7166926/ | artbovich | Pexels License | 1200×1500 |
| `projects/living-room/hero.webp` | https://www.pexels.com/photo/a-green-door-of-a-house-9209430/ | dropshado | Pexels License | 1200×1500 |
| `projects/living-room/hero-wide.webp` | https://www.pexels.com/photo/a-modern-living-room-with-a-dining-table-and-chairs-28254552/ | achraf borkadi | Pexels License | 2400×1350 |
| `projects/living-room/rail.webp` | https://www.pexels.com/photo/luxurious-living-room-with-marble-accent-wall-36601407/ | Ritam Das | Pexels License | 900×1800 |

### `projects/kitchen/`

| File path | Original page URL | Photographer | Licence | Dimensions |
| --- | --- | --- | --- | --- |
| `projects/kitchen/gallery-01.webp` | https://www.pexels.com/photo/brown-table-with-chairs-7148841/ | souranshi fashion and lifestyle magazine | Pexels License | 2000×1375 |
| `projects/kitchen/gallery-02.webp` | https://www.pexels.com/photo/interior-of-kitchen-20653876/ | Roshan Patel | Pexels License | 1200×1500 |
| `projects/kitchen/gallery-03.webp` | https://www.pexels.com/photo/beige-wooden-kitchen-cupboards-2947958/ | Houzlook .com | Pexels License | 1200×1500 |
| `projects/kitchen/gallery-04.webp` | https://www.pexels.com/photo/renovated-kitchen-13628796/ | Kirti  Phadke | Pexels License | 1200×1500 |
| `projects/kitchen/hero.webp` | https://www.pexels.com/photo/stylish-modern-kitchen-in-jammu-and-kashmir-34623007/ | Imad Clicks | Pexels License | 1200×1500 |
| `projects/kitchen/hero-wide.webp` | https://www.pexels.com/photo/modern-kitchen-interior-in-jammu-and-kashmir-34623005/ | Imad Clicks | Pexels License | 2400×1350 |
| `projects/kitchen/rail.webp` | https://www.pexels.com/photo/kitchen-2-13628801/ | Kirti  Phadke | Pexels License | 900×1800 |

### `projects/bedroom/`

| File path | Original page URL | Photographer | Licence | Dimensions |
| --- | --- | --- | --- | --- |
| `projects/bedroom/gallery-01.webp` | https://www.pexels.com/photo/interior-design-of-bedroom-17125486/ | rishi raj khare | Pexels License | 2000×1375 |
| `projects/bedroom/gallery-02.webp` | https://www.pexels.com/photo/luxurious-modern-bedroom-interior-design-35189676/ | ranamatloob567 | Pexels License | 1200×1500 |
| `projects/bedroom/gallery-03.webp` | https://www.pexels.com/photo/modern-luxury-bedroom-interior-design-39725930/ | Anil  Sharma | Pexels License | 1200×1500 |
| `projects/bedroom/gallery-04.webp` | https://www.pexels.com/photo/master-bedroom-13628798/ | Kirti  Phadke | Pexels License | 1200×1500 |
| `projects/bedroom/hero.webp` | https://www.pexels.com/photo/modern-bedroom-interior-design-in-kerala-33721710/ | Liva  Kitchens And Interiors | Pexels License | 1200×1500 |
| `projects/bedroom/hero-wide.webp` | https://www.pexels.com/photo/very-cozy-and-luxurious-bedroom-20653869/ | Roshan Patel | Pexels License | 2400×1350 |
| `projects/bedroom/rail.webp` | https://www.pexels.com/photo/modern-minimalist-bedroom-interior-design-28609808/ | darkmodecinema | Pexels License | 900×1800 |

### `projects/dining/`

| File path | Original page URL | Photographer | Licence | Dimensions |
| --- | --- | --- | --- | --- |
| `projects/dining/gallery-01.webp` | https://www.pexels.com/photo/elegant-dining-room-interior-with-modern-decor-36601371/ | Ritam Das | Pexels License | 2000×1375 |
| `projects/dining/gallery-02.webp` | https://www.pexels.com/photo/modern-dining-room-with-elegant-decor-37532763/ | Misbaa eri | Pexels License | 1200×1500 |
| `projects/dining/gallery-03.webp` | https://www.pexels.com/photo/bright-minimalist-dining-area-with-vintage-chairs-37003186/ | ANUSMIT SIL | Pexels License | 1200×1500 |
| `projects/dining/gallery-04.webp` | https://www.pexels.com/photo/green-potted-plant-on-table-14495131/ | caio mantovani | Pexels License | 1200×1500 |
| `projects/dining/hero.webp` | https://www.pexels.com/photo/elegant-modern-dining-room-with-stylish-lighting-36913233/ | SHELTON ESTIBEIRO | Pexels License | 1200×1500 |
| `projects/dining/hero-wide.webp` | https://www.pexels.com/photo/elegant-dining-room-with-table-setting-in-pune-36195704/ | Anisha Deb | Pexels License | 2400×1350 |
| `projects/dining/rail.webp` | https://www.pexels.com/photo/a-modern-dining-room-design-17947888/ | Kirti  Phadke | Pexels License | 900×1800 |

### `projects/apartment/`

| File path | Original page URL | Photographer | Licence | Dimensions |
| --- | --- | --- | --- | --- |
| `projects/apartment/gallery-01.webp` | https://www.pexels.com/photo/modern-interior-design-20653885/ | Roshan Patel | Pexels License | 2000×1375 |
| `projects/apartment/gallery-02.webp` | https://www.pexels.com/photo/modern-study-room-with-sunlit-window-36601395/ | Ritam Das | Pexels License | 1200×1500 |
| `projects/apartment/gallery-03.webp` | https://www.pexels.com/photo/hallway-with-wooden-doors-and-floor-7166935/ | artbovich | Pexels License | 1200×1500 |
| `projects/apartment/gallery-04.webp` | https://www.pexels.com/photo/main-entrance-13628793/ | Kirti  Phadke | Pexels License | 1200×1500 |
| `projects/apartment/hero.webp` | https://www.pexels.com/photo/elegant-modern-dining-and-living-room-interior-34989208/ | andromeda99 | Pexels License | 1200×1500 |
| `projects/apartment/hero-wide.webp` | https://www.pexels.com/photo/elegant-interior-of-luxurious-villa-lobby-38149248/ | Md Amir Umar | Pexels License | 2400×1350 |
| `projects/apartment/rail.webp` | https://www.pexels.com/photo/interior-of-apartment-with-kitchen-and-living-zone-near-hallway-6238684/ | artbovich | Pexels License | 900×1800 |

### `projects/storage/`

| File path | Original page URL | Photographer | Licence | Dimensions |
| --- | --- | --- | --- | --- |
| `projects/storage/gallery-01.webp` | https://www.pexels.com/photo/wooden-stool-beside-a-wall-7484799/ | cottonbro | Pexels License | 2000×1375 |
| `projects/storage/gallery-02.webp` | https://www.pexels.com/photo/jackets-hanging-on-hooks-21624612/ | yasin | Pexels License | 1200×1500 |
| `projects/storage/gallery-03.webp` | https://www.pexels.com/photo/opened-wardrobe-with-shoes-19846384/ | lisa anna | Pexels License | 1200×1500 |
| `projects/storage/gallery-04.webp` | https://www.pexels.com/photo/modern-wooden-walk-in-closet-interior-design-39829436/ | shaza jocarlos | Pexels License | 1200×1500 |
| `projects/storage/hero.webp` | https://www.pexels.com/photo/modern-minimalist-walk-in-closet-interior-design-36221937/ | real estate 4k | Pexels License | 1200×1500 |
| `projects/storage/hero-wide.webp` | https://www.pexels.com/photo/dressing-room-in-the-attic-20705883/ | albeg | Pexels License | 2400×1350 |
| `projects/storage/rail.webp` | https://www.pexels.com/photo/a-brown-wooden-walk-in-closet-8146203/ | artbovich | Pexels License | 900×1800 |

### `projects/facade/`

| File path | Original page URL | Photographer | Licence | Dimensions |
| --- | --- | --- | --- | --- |
| `projects/facade/gallery-01.webp` | https://www.pexels.com/photo/elegant-archway-entrance-with-wooden-door-39866860/ | perry | Pexels License | 2000×1375 |
| `projects/facade/gallery-02.webp` | https://www.pexels.com/photo/traditional-wooden-architecture-in-sunlight-37014869/ | talha kugu | Pexels License | 1200×1500 |
| `projects/facade/gallery-03.webp` | https://www.pexels.com/photo/sunlit-wooden-shutters-12969329/ | freestockpro | Pexels License | 1200×1500 |
| `projects/facade/gallery-04.webp` | https://www.pexels.com/photo/modern-balcony-with-stone-and-glass-window-34510067/ | ty nguy n | Pexels License | 1200×1500 |
| `projects/facade/hero.webp` | https://www.pexels.com/photo/modern-stone-villa-with-lush-tropical-garden-28586235/ | jonathanborba | Pexels License | 1200×1500 |
| `projects/facade/hero-wide.webp` | https://www.pexels.com/photo/brutalist-architecture-in-lucknow-india-32822597/ | Shantum Singh | Pexels License | 2400×1350 |
| `projects/facade/rail.webp` | https://www.pexels.com/photo/modern-house-entrance-at-night-illuminated-31737862/ | dropshado | Pexels License | 900×1800 |

### `projects/bathroom/`

| File path | Original page URL | Photographer | Licence | Dimensions |
| --- | --- | --- | --- | --- |
| `projects/bathroom/gallery-01.webp` | https://www.pexels.com/photo/elegant-bathroom-vanity-with-wicker-mirror-34053830/ | tatianne heruza lacerda amaral | Pexels License | 2000×1375 |
| `projects/bathroom/gallery-02.webp` | https://www.pexels.com/photo/master-bathroom-13628792/ | Kirti  Phadke | Pexels License | 1200×1500 |
| `projects/bathroom/gallery-03.webp` | https://www.pexels.com/photo/modern-bathroom-with-stylish-interior-design-29455222/ | dumitru bumbu | Pexels License | 1200×1500 |
| `projects/bathroom/gallery-04.webp` | https://www.pexels.com/photo/elegant-bathroom-vanity-with-classic-fixtures-40411928/ | Faheem Ahamad | Pexels License | 1200×1500 |
| `projects/bathroom/hero.webp` | https://www.pexels.com/photo/luxurious-modern-minimalist-bathroom-interior-39725944/ | Anil  Sharma | Pexels License | 1200×1500 |
| `projects/bathroom/hero-wide.webp` | https://www.pexels.com/photo/elegant-modern-bathroom-with-marble-and-chrome-faucet-36446636/ | Abhishek  Navlakha | Pexels License | 2400×1350 |
| `projects/bathroom/rail.webp` | https://www.pexels.com/photo/elegant-modern-bathroom-interior-design-39725935/ | Anil  Sharma | Pexels License | 900×1800 |

## Owner-supplied files

Two files were supplied directly by the studio owner and carry no external stock
source. They are stored and shipped exactly as provided — no re-encode, resize, crop
or colour grade:

- `brand/hero-stoneleigh.png` — homepage hero (1024×1024, PNG). Source and licence are
  the owner's to confirm before launch.
- `spaces/pooja-room.webp` — homepage pooja-room feature (2048×2048, WebP). Source and
  licence are the owner's to confirm before launch.

## Unmatched files

None. All 78 stock files present in `public/assets/images/` have a recorded source in
the lineage of this image set; the two owner-supplied files above are recorded
separately.
