# Map layout alternatives

_Started 2026-11-10 22:04 UTC_

---

## User

<artifact-content-authored-by-others/>
Continuing from "Hero page design variations".

## Assistant

We were refining the JBG Commercial Plumbing homepage as a single Design Components file, then expanded to include an About Us page, all in the same file. The homepage is complete and locked; About Us is finished but needs image URLs tested.

Key decisions made:
- Switched to Lato throughout (headings weight 700–900 uppercase, body 400).
- Brand palette: #716558 (warm taupe-brown) dominant everywhere, with #BD1E2D (red from logo) as a small accent in hero and section headers only. Dark sections use #2B2622.
- Sections alternate white / light tint (#F4F1EE) backgrounds, except the dark "Services we offer" and CTA band which stay fixed. Cards reverse their background on each section type so they always contrast.
- Hero uses your blurred IHOP truck photo under a brown overlay at a fixed 380px height; inner pages reuse this exact height.
- Recent New Plumbing Construction carousel was removed per your request.
- Quote request buttons open a pop-up form (shortened to Name, Phone, Email, Project Details) instead of linking out.
- Google reviews section added: 6 reviews shown first, load 6 more per click, with "See more" on long reviews.
- End-banner (above footer on all pages) has a short contact form on the right, not a photo.
- Footer now has navigation menus and four leveled office addresses in one row.
- Header nav changed "Book Online" to "Request a Quote" (opens pop-up).
- All section widths, headers and footers now align perfectly at 1240px with 20px padding.

Current state:
- Homepage: complete, all 10 sections live with text, images, pop-up form, review carousel.
- About Us page: 4 sections (hero with team collage background, intro paragraphs, city image slider, team photo) using the i0.wp.com domain URLs. Team photo uses the Why Choose Us image from homepage. Hero and team images may not load in preview due to external links, but URLs are correct.
- End banner (Got a Project?) sticks above the footer on both pages.
- Backup saved as "JBG Homepage - backup 2026-11-11.dc.html".

Open next steps:
- Test city slider images and About Us hero / team photo on live domain.
- Confirm header width fits on narrow screens (near 1100px).
- Add more inner pages (Quote Request, Recent Projects, Locations, Contact Us, Latest From JBG, specific service pages) using the same hero height and design system.

Files involved: JBG Homepage.dc.html (homepage + About Us), reviews-data.js (Google reviews), CLAUDE.md (project rules).

## User

<artifact-content-authored-by-others/>
in this part instead of that photo can we do map and boxes of different maps for different locations?

## User

in this part instead of that photo can we do map and boxes of different maps for different locations?

## User

Found issues — fixing…

## Assistant

_[tool: grep]_

_[tool: show_html]_

_[tool: get_webview_logs]_

_[tool: eval_js]_

_[tool: read_file]_

_[tool: eval_js]_

_[tool: eval_js]_

The map and location boxes are in place. They're on the About Us page, which is where that city slider was. The verifier checked the homepage, so its "missing" report was a false alarm.

The map is an embedded Google Map in a beige tone. Beside it are four boxes for the offices: College Station, Houston, San Antonio and Baton Rouge. Click a box and the map moves to that address. The selected box turns brown with a red top bar. I checked the map and the boxes on the About page after reload. The page doesn't scroll sideways. I didn't click a box to confirm the map moves.

The old slider had five cities, including Austin and Dallas. The boxes use only the four office addresses. Do you want Austin and Dallas added as service areas?

## User

<pasted_text name="Pasted text (148 lines)">
Edit the SAME existing file. Do not create a new file, page or project.

RULES
- Do NOT touch the homepage in any way.
- Design: you handle the design. Match the existing site design system (colors, fonts, buttons, spacing, header and footer) and the About Us page.
- Content: use ONLY the content below, word for word and section for section. Do not add, remove, shorten or reword anything.
- Hero height: use exactly the same hero height as the About Us page on all 4 pages below.
- No breadcrumbs.

━━━━━━━━━━━━━━━━━━━━
PAGE 1: Latest From JBG (/latest-from-jbg/)
━━━━━━━━━━━━━━━━━━━━
Use the same header and footer as the homepage. "About Us" stays the active nav item (this page sits under About Us).

HERO
Heading: Latest From JBG
Subheading: Tips, project news and plumbing know-how from our team.
Background image: https://i0.wp.com/jbgplumbingtx.com/wp-content/uploads/2017/12/Team-banner50-1-1500x630.jpg

POST LIST (3 post cards, newest first; each card links to its article page)
Card 1
- Image: https://i0.wp.com/jbgplumbingtx.com/wp-content/uploads/2018/03/Grease-trap-cleaning.jpg
- Category: Commercial Kitchens
- Title: Why Your Restaurant's Grease Trap Needs Regular Cleaning
- Excerpt: Fats, oils and grease don't disappear down the drain. Here's what happens when a grease trap is ignored, and how to stay ahead of it.
- Link: "Read more →" → /latest-from-jbg/grease-trap-cleaning/

Card 2
- Image: https://i0.wp.com/jbgplumbingtx.com/wp-content/uploads/2016/11/backflow-testing-Collage-header-1500x430.jpg
- Category: Water Safety
- Title: Backflow Testing: What Every Property Owner Should Know
- Excerpt: Backflow can pull contaminated water back into your clean supply. Learn the warning signs, the two main causes, and why testing matters.
- Link: "Read more →" → /latest-from-jbg/backflow-testing/

Card 3
- Image: https://i0.wp.com/jbgplumbingtx.com/wp-content/uploads/2018/04/Commercial-plumber-reading-plans-495x400.jpg
- Category: New Construction
- Title: Planning Plumbing for a New Commercial Build-Out
- Excerpt: Good plumbing starts long before the first pipe goes in. Here's what we look at, and what to have ready, before your project breaks ground.
- Link: "Read more →" → /latest-from-jbg/commercial-build-out-plumbing/

━━━━━━━━━━━━━━━━━━━━
PAGE 2: /latest-from-jbg/grease-trap-cleaning/
━━━━━━━━━━━━━━━━━━━━
HERO
Category: Commercial Kitchens
Heading: Why Your Restaurant's Grease Trap Needs Regular Cleaning
Byline: JBG Commercial Plumbing
Background image: https://i0.wp.com/jbgplumbingtx.com/wp-content/uploads/2018/03/Grease-trap-cleaning.jpg

ARTICLE
Every commercial kitchen sends fats, oils and grease (FOG) down its drains. A grease trap catches that FOG before it reaches the city sewer, and for most food service businesses having one isn't optional; it's a legal requirement.

H2: What happens when a grease trap is ignored
A grease trap only works if it's emptied and cleaned. As FOG builds up, it hardens inside the trap and the lines leading to it. That can lead to:
- Slow drains and backups in your kitchen
- Bad odors in and around your business
- Sewer backups that can shut down service
- Fines for not maintaining your trap

H2: Cleaning the trap AND the lines
It isn't enough to pump out the trap itself. Grease also coats the lines that run to and from it. Keeping those lines clean is what keeps water flowing and stops buildup from turning into a blockage.

H2: Inspection, repair and installation
Regular inspections catch problems early, before they become emergencies. Opening a new kitchen or replacing an old system? We help you choose the right grease trap for your space and volume, install it, and handle the permits.

H2: How often should you clean it?
Many kitchens need cleaning about once a month, but the right schedule depends on your trap's size and how much your kitchen cooks. We'll recommend a schedule that fits your business.

CTA BOX
Heading: Keep your kitchen running.
Text: Schedule grease trap cleaning or an inspection with JBG.
Buttons: "Request a Quote" → /quote-request/ · "(888) 512-4107" → tel:8885124107
Link below: "Learn more about Grease Trap Cleaning →" → /commercial-plumber-services/grease-trap-cleaning/

━━━━━━━━━━━━━━━━━━━━
PAGE 3: /latest-from-jbg/backflow-testing/
━━━━━━━━━━━━━━━━━━━━
HERO
Category: Water Safety
Heading: Backflow Testing: What Every Property Owner Should Know
Byline: JBG Commercial Plumbing
Background image: https://i0.wp.com/jbgplumbingtx.com/wp-content/uploads/2016/11/backflow-testing-Collage-header-1500x430.jpg

ARTICLE
Clean water should only flow one way: into your building. Backflow is when water reverses direction and flows back into your clean water supply, carrying whatever it picked up along the way.

H2: Why backflow is a health risk
When backflow happens, contaminated water can end up in your drinking water. That can mean bacteria, chemicals and unpleasant odors in the water your staff, tenants or customers use every day.

H2: The two main causes
- Back pressure: the pressure in your building's system becomes higher than the pressure in the supply line, pushing water backward.
- Back siphonage: a sudden drop in supply pressure, such as a water main break or heavy demand nearby, pulls water backward out of your system.

H2: Warning signs to watch for
- Drains that won't empty properly
- Water flowing in the wrong direction
- Discolored water or unusual smells from your taps

H2: Testing and installation
A backflow prevention device stops water from reversing, but it has to be working to protect you. Our licensed technicians install and test backflow preventers for commercial and residential properties, and we respond to backflow emergencies.

CTA BOX
Heading: Protect your water supply.
Text: Schedule backflow testing or installation with JBG.
Buttons: "Request a Quote" → /quote-request/ · "(888) 512-4107" → tel:8885124107
Link below: "Learn more about Backflow Testing →" → /commercial-plumber-services/backflow-testing-college-station-tx-bryan/

━━━━━━━━━━━━━━━━━━━━
PAGE 4: /latest-from-jbg/commercial-build-out-plumbing/
━━━━━━━━━━━━━━━━━━━━
HERO
Category: New Construction
Heading: Planning Plumbing for a New Commercial Build-Out
Byline: JBG Commercial Plumbing
Background image: https://i0.wp.com/jbgplumbingtx.com/wp-content/uploads/2018/04/Commercial-Plumber-wirsbo-pipe-install-495x400.jpg

ARTICLE
From restaurants and salons to retail stores and office suites, we've plumbed new build-outs for brands like IHOP, European Wax Center, Foot Locker and Texas Roadhouse. The projects that go smoothest all have one thing in common: the plumbing was planned early.

H2: We plan for today and tomorrow
We start by reviewing your project's scope and goals, then design a system that fits your budget. We also plan for future demand, so your plumbing can grow with your business and is easy to service down the road.

H2: Getting gas lines right
Gas line work has to be precise. Pipes are sized based on inlet pressure and the allowable pressure drop, and that depends on every gas appliance you plan to connect. To size your system correctly, we'll need:
- Your connected gas load and meter outlet pressure
- A scaled utility site plan
- Your preferred meter location
- Any required permits
Gas line designs also need engineer approval before work begins.

H2: All in-house, start to finish
From site prep and piping to rough-in and final fixtures, our team handles the work in-house, with no subcontractors. That means one point of contact and a crew that knows your project from day one.

CTA BOX
Heading: Have plans or an RFP?
Text: Send them over and we'll get back to you with a quote.
Buttons: "Request a Quote" → /quote-request/ · "(888) 512-4107" → tel:8885124107
Link below: "View Recent Projects →" → /projects/

━━━━━━━━━━━━━━━━━━━━
FINAL CHECK (confirm before finishing)
━━━━━━━━━━━━━━━━━━━━
1. The homepage is unchanged.
2. All 4 pages exist, with every section above present and the text word for word.
3. All 4 heroes are exactly the same height as the About Us hero.
4. Every "Read more", button and link goes to the page listed.
5. You edited the same existing file.
</pasted_text>

## Assistant

_[tool: grep]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: grep]_

_[tool: run_script]_

_[tool: ready_for_verification]_

## User

Edit the SAME existing file. Do not create a new file, page or project.

RULES
- Do NOT touch the homepage in any way.
- Design: you handle the design. Match the existing site design system (colors, fonts, buttons, spacing, header and footer) and the About Us page.
- Content: use ONLY the content below, word for word and section for section. Do not add, remove, shorten or reword anything.
- Hero height: use exactly the same hero height as the About Us page.
- No breadcrumbs.

━━━━━━━━━━━━━━━━━━━━
NEW PAGE: Locations (/locations/)
━━━━━━━━━━━━━━━━━━━━
Use the same header and footer as the homepage, with "Locations" shown as the active nav item.

SECTION 1: HERO
Heading: Locations
Subheading: Commercial plumbing across Texas and Louisiana.
Background image: https://i0.wp.com/jbgplumbingtx.com/wp-content/uploads/2016/11/Huston-1-1500x630.png

SECTION 2: INTRO
Text: We started in the Brazos Valley and have grown to serve most major cities in Texas and Louisiana. Find the office nearest you.

SECTION 3: OUR OFFICES
Group the cards under two labels: TEXAS and LOUISIANA.

TEXAS
Card 1: College Station, TX
- Address: 12394 Robin Dr, College Station, TX 77845
- Phone: (979) 777-4420 → tel:9797774420
- Buttons: "View Location →" → /locations/texas/college-station/ · "Get Directions" → https://www.google.com/maps/search/?api=1&query=12394+Robin+Dr+College+Station+TX+77845

Card 2: Houston, TX
- Address: 1001 Texas Avenue, Suite 1400 #228, Houston, TX 77002
- Phone: 713-364-0105 → tel:7133640105
- Buttons: "View Location →" → /locations/texas/houston/ · "Get Directions" → https://www.google.com/maps/search/?api=1&query=1001+Texas+Avenue+Houston+TX+77002

Card 3: San Antonio, TX
- Address: 1100 Northwest Loop 410, Suite 700 #228, San Antonio, TX 78213
- Phone: 210-405-2512 → tel:2104052512
- Buttons: "View Location →" → /locations/texas/san-antonio/ · "Get Directions" → https://www.google.com/maps/search/?api=1&query=1100+Northwest+Loop+410+San+Antonio+TX+78213

LOUISIANA
Card 4: Baton Rouge, LA
- Address: 2900 Westfork Dr Suite 401 #228, Baton Rouge, LA 70827
- Phone: (225) 257-7248 → tel:2252577248
- Buttons: "View Location →" → /locations/louisiana/baton-rouge/ · "Get Directions" → https://www.google.com/maps/search/?api=1&query=2900+Westfork+Dr+Baton+Rouge+LA+70827

SECTION 4: SERVICE AREAS
Heading: Areas We Serve
Two groups:
- Texas: Houston · Austin · San Antonio · DFW
- Louisiana: Shreveport · Baton Rouge · NOLA

SECTION 5: LICENSES
Heading: Licensed in Texas & Louisiana
Text: TXRMPL-39725 · MMRF-21 · BP001481 · LaMP-11151 · WSPS-21

SECTION 6: CTA
Heading: Not sure which office to call?
Text: Call our main line and we'll connect you with the right team.
Buttons: "(888) 512-4107" → tel:8885124107 · "Request a Quote" → /quote-request/

━━━━━━━━━━━━━━━━━━━━
FINAL CHECK (confirm before finishing)
━━━━━━━━━━━━━━━━━━━━
1. The homepage is unchanged.
2. All 6 sections above are present, in this order, with the text word for word.
3. The hero is exactly the same height as the About Us hero.
4. Every phone number, "View Location" and "Get Directions" link goes where listed.
5. You edited the same existing file.

## Assistant

_[tool: run_script]_

_[tool: ready_for_verification]_

## User

<pasted_text name="Pasted text (94 lines)">
Edit the SAME existing file. Do not create a new file, page or project.

RULES
- Homepage: make ONLY the homepage changes listed in Parts 2, 3 and 4 below. Do not change anything else on the homepage.
- Design: you handle the design and keep everything matching the existing design system.
- Content: use ONLY the content below, word for word.
- Inner-page hero heights stay the same as the About Us page.
- No breadcrumbs.

━━━━━━━━━━━━━━━━━━━━
PART 1: REPLACE THE LOCATIONS PAGE CONTENT (/locations/)
━━━━━━━━━━━━━━━━━━━━
Remove all of the current Locations page content (the four office cards, Areas We Serve and the CTA) and replace it with the sections below. Keep the hero image and hero height.

SECTION 1: HERO
Heading: Service Areas
Subheading: Full-service, 24-hour plumbing across the Brazos Valley.

SECTION 2: INTRO
Text: JBG is a full-service, 24-hour plumber proudly serving Brazos, Milam, Robertson and Grimes County. Whether it's your home or your business, our licensed plumbers are ready day or night.

SECTION 3: COUNTIES WE SERVE (4 cards)
Card 1: Brazos County · including Bryan, College Station, Wellborn and Kurten
Card 2: Milam County · including Cameron and Rockdale
Card 3: Robertson County · including Hearne, Franklin and Calvert
Card 4: Grimes County · including Navasota and Anderson
Each card has a "Request a Quote →" link to /quote-request/.

SECTION 4: OUR OFFICE
Heading: Visit Our Office
- JBG Plumbing
- 12394 Robin Dr, College Station, TX 77845
- (979) 777-4420 → tel:9797774420
- Button: "Get Directions" → https://www.google.com/maps/search/?api=1&amp;query=12394+Robin+Dr+College+Station+TX+77845

SECTION 5: LICENSES
Heading: Licensed Plumbers
Text: TXRMPL-39725 · MMRF-21 · BP001481 · LaMP-11151 · WSPS-21

SECTION 6: CTA
Heading: Plumbing emergency? We're available 24/7.
Buttons: "(888) 512-4107" → tel:8885124107 · "Request a Quote" → /quote-request/

HEADER NAV (on every page, including the homepage)
- Change the "Locations" dropdown to a single link with no dropdown: "Service Areas" → /locations/
- Remove the College Station, Houston, San Antonio and Baton Rouge links from the menu.

━━━━━━━━━━━━━━━━━━━━
PART 2: ADD SERVICES TO "Our Commercial Plumbing Services List" (homepage)
━━━━━━━━━━━━━━━━━━━━
Rename the section heading to: Our Plumbing Services
Show these 16 services in this exact order (new ones marked NEW):
1. Water Heater Installation Repair → /quote-request/ · "Get a quote →"
2. Sewer Line Cleaning Repair → /quote-request/ · "Get a quote →"
3. Leak Detection (NEW) → /quote-request/ · "Get a quote →"
4. Septic Tank Cleaning (NEW) → /quote-request/ · "Get a quote →"
5. Grease Trap Cleaning (NEW) → /commercial-plumber-services/grease-trap-cleaning/ · "Learn more →"
6. Slab Leak Repair → /quote-request/ · "Get a quote →"
7. Backflow Testing → /commercial-plumber-services/backflow-testing-college-station-tx-bryan/ · "Learn more →"
8. Expansion Tank Installation → /expansion-tank/ · "Learn more →"
9. Sump Pump Well Pump Repair → /commercial-plumber-services/sump-pump-repair-college-station-tx-bryan/ · "Learn more →"
10. Waterline Replacement Repair → /quote-request/ · "Get a quote →"
11. Water Pipe Repair Replacement → /quote-request/ · "Get a quote →"
12. Water Pressure Repair → /quote-request/ · "Get a quote →"
13. Water Filter Installation → /quote-request/ · "Get a quote →"
14. Toilet Installation Repair → /quote-request/ · "Get a quote →"
15. Faucet Installation → /quote-request/ · "Get a quote →"
16. Video Inspection Services → /quote-request/ · "Get a quote →"
- New cards get a matching line icon in the same style as the others.
- Grid: remove the featured 2×2 card. Use 16 equal cards: 4 columns on desktop (4 × 4), 2 columns on tablet and mobile (8 rows). No leftover card at any size.

━━━━━━━━━━━━━━━━━━━━
PART 3: MAKE 24/7 SERVICE PROMINENT (homepage + header)
━━━━━━━━━━━━━━━━━━━━
- Top utility bar (every page): add "24/7 EMERGENCY SERVICE" before the phone number on the right, with a small pulsing #BD1E2D dot in front of it.
- Hero: replace the round phone-number badge on the photo collage with a round stamp-style badge reading "24/7 EMERGENCY SERVICE" around the edge, with "24/7" large in the center (white background, #716558 text, thin dashed #BD1E2D inner ring).
- Hero supporting line: add a second line under the current one: Day or night, our licensed plumbers are ready when you need us.
- Mobile only: add a sticky bottom bar on every page with a "Call 24/7: (888) 512-4107" button → tel:8885124107.

━━━━━━━━━━━━━━━━━━━━
PART 4: REMOVE THE BLOG
━━━━━━━━━━━━━━━━━━━━
- Delete these pages completely: /latest-from-jbg/, /latest-from-jbg/grease-trap-cleaning/, /latest-from-jbg/backflow-testing/, /latest-from-jbg/commercial-build-out-plumbing/
- Remove "Latest From JBG" from the About Us dropdown in the header and from anywhere else it's linked (footer, homepage).

━━━━━━━━━━━━━━━━━━━━
FINAL CHECK (confirm before finishing)
━━━━━━━━━━━━━━━━━━━━
1. On the homepage, ONLY the services section, the hero badge, the hero supporting line and the header changed.
2. The Locations page has all 6 new sections, word for word, and none of the old office cards.
3. The services grid shows all 16 services in the order above, with no leftover card.
4. "24/7 Emergency Service" appears in the top bar, the hero badge and the mobile sticky bar.
5. No blog pages or "Latest From JBG" links remain anywhere.
6. You edited the same existing file.
</pasted_text>

## User

Found issues — fixing…

## User

<artifact-content-authored-by-others/>
Found issues — fixing…

## Assistant

_[tool: str_replace_edit]_

_[tool: ready_for_verification]_

## User

this edit is for about us page

Edit the SAME existing file. Do not touch any other section or page.

In the map + office list section:
- Remove the Houston, San Antonio and Baton Rouge cards completely.
- Keep only ONE office card:
  JBG Plumbing — College Station
  580 Graham Rd Ste D, College Station, TX 77845
  (979) 777-4420 → tel:9797774420
- Update the map embed and the "Get Directions" link to that same address:
  https://www.google.com/maps/search/?api=1&query=580+Graham+Rd+Ste+D+College+Station+TX+77845
- Under the office card, add a "Counties We Serve" list:
  Brazos County · Milam County · Robertson County · Grimes County
- Under the list, add a button: "Call 24/7: (888) 512-4107" → tel:8885124107
- Let the map and the right column stay the same height, so the column doesn't look empty with only one office.

## Assistant

_[tool: run_script]_

_[tool: ready_for_verification]_

