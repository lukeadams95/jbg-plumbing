# Missing page items

_Started 2026-11-11 23:00 UTC_

---

## User

<artifact-content-authored-by-others/>
Continuing from "Footer update".

## Assistant

We were refining the JBG Commercial Plumbing site—a single Design Components file containing the homepage and 16+ additional pages (About Us, Locations, Recent Projects, Reviews, Request a Quote, Contact Us, Terms of Service, Privacy Policy, Thank You, and 11 service detail pages).

Key decisions made:
- Brand palette: #716558 (taupe-brown), #BD1E2D (red accent), #2B2622 (dark), #F4F1EE (light tint). Lato font (700–900 uppercase headings, 400 body).
- Hero height locked at 380px across all pages.
- Header rearranged: nav on left (Home, About Us dropdown, Commercial Plumbing dropdown, Recent Projects, Reviews), buttons on right (light-brown phone button, Request a Quote). Contact Us link in top bar. About Us dropdown contains Service Areas; Commercial Plumbing and Services dropdowns each have multiple items. Reviews in footer only, not in About Us dropdown.
- Footer overhauled to three equal columns: Our Office (College Station only), Counties We Serve (Brazos, Milam, Robertson, Grimes), 24/7 Emergency Service. Social links: Facebook, X, Yelp, BBB, Angi, HomeAdvisor.
- All service cards now link to dedicated service pages with jump-link navigation and anchored sections.
- "LET'S GET IT BUILT RIGHT." CTA banner with quote form appears at the end of every page except Request a Quote and Thank You.
- Back/Forward button now preserves scroll position. All page transitions are instant (no smooth scroll).
- Quote Request and Contact Us forms now redirect to /thank-you/ on successful submit.

Current state:
- Homepage: 10 sections, unchanged.
- About Us, Locations, Services, Grease Trap Cleaning, Recent Projects, Reviews, Request a Quote, Contact Us, Thank You, Terms of Service, Privacy Policy: all complete with 380px heroes and matching design.
- 11 service detail pages built: Expansion Tank, Backflow Testing, Commercial Boilers, Gas Line Installation, Sump Pump Repair, Water Heaters, Sewer/Drain/Septic, Leak Detection & Pipe Repair, Water Pressure & Filtration, Toilets & Faucets, Grease Trap Cleaning.
- All 16 homepage service cards + 12 "We Also Handle" cards updated to link to their service pages with jump anchors.
- Services dropdown: 11 links in two columns (Residential and Commercial & Specialty).
- Rating strip on homepage and Reviews page links to Google Maps with brand logo.

Open next steps:
- Test responsive behavior at 1100px (tablet) and 375px (mobile).
- Test all external links and tel: links on live domain.
- Verify form submissions redirect correctly to /thank-you/.
- Check dropdown highlights render correctly on service pages.

Files involved: JBG Homepage.dc.html (all pages in one file).

## User

anything here that doesn't have a page yet?

## Assistant

_[tool: run_script]_

_[tool: run_script]_

_[tool: grep]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: grep]_

Every internal link in the file points to a page that exists. The `#` hrefs are non-clickable group labels in the dropdowns and footer.

I checked internal page links only. External links such as Google, Facebook and Yelp, and `tel:` links, weren't tested.

