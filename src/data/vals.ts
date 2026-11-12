// Static port of renderVals() from the Claude Design prototype
// (design/project/JBG Homepage.dc.html). Width-dependent values live in
// src/styles/responsive.css as CSS variables; interactive state lives in
// src/scripts/site.ts. Everything here is resolved at build time.
import { icon } from './icons';
import { REVIEWS } from './reviews';

export type PageKey =
  | 'home' | 'about' | 'locations' | 'projects' | 'quote' | 'reviews' | 'services'
  | 'grease' | 'expansion' | 'backflow' | 'boilers' | 'gasline' | 'sump'
  | 'heaters' | 'sewer' | 'leak' | 'pressure' | 'toilets'
  | 'contact' | 'terms' | 'privacy' | 'thanks';

export const BOOK_URL = 'https://book.housecallpro.com/book/JBG-Plumbing/4e36de049beb46bc86918c304ca376cb';

/** Route path for each page (the prototype's hash routes, as real paths). */
export const PAGE_PATH: Record<PageKey, string> = {
  home: '/',
  about: '/about-us/',
  locations: '/locations/',
  projects: '/projects/',
  quote: '/quote-request/',
  reviews: '/reviews/',
  services: '/services/',
  grease: '/grease-trap-cleaning/',
  expansion: '/expansion-tank/',
  backflow: '/backflow-testing/',
  boilers: '/boiler-installation/',
  gasline: '/gas-line-installation/',
  sump: '/sump-pump-repair/',
  heaters: '/services/water-heaters/',
  sewer: '/services/sewer-drain-septic/',
  leak: '/services/leak-detection-pipe-repair/',
  pressure: '/services/water-pressure-filtration/',
  toilets: '/services/toilets-faucets/',
  contact: '/contact-us/',
  terms: '/terms-of-service/',
  privacy: '/privacy-policy/',
  thanks: '/thank-you/',
};

const SERVICE_PAGES: PageKey[] = ['services', 'grease', 'expansion', 'backflow', 'boilers', 'gasline', 'sump', 'heaters', 'sewer', 'leak', 'pressure', 'toilets'];
/** Pages without the "LET'S GET IT BUILT RIGHT." CTA band. */
export const NO_CTA: PageKey[] = ['quote', 'terms', 'privacy', 'thanks'];

type Kid = { label: string; href: string; weight: number; size: string; color: string; tt: string; bg: string; ring: string; pe: string; mob: string };
const kid = (label: string, href: string): Kid => ({ label, href, weight: 500, size: '15.5px', color: '#3A3530', tt: 'none', bg: 'transparent', ring: 'none', pe: 'auto', mob: 'block' });
const grp = (label: string): Kid => ({ label, href: '#', weight: 700, size: '12.5px', color: '#716558', tt: 'uppercase', bg: 'transparent', ring: 'none', pe: 'none', mob: label.trim() ? 'block' : 'none' }); // the nbsp spacer only breaks the desktop dropdown into columns

const SERVICES: [string, string, string][] = [
  ['Water Heater Installation Repair', 'bolt', '/services/water-heaters/#water-heater-installation-repair'],
  ['Sewer Line Cleaning Repair', 'broom', '/services/sewer-drain-septic/#sewer-line-cleaning-repair'],
  ['Leak Detection', 'leak', '/services/leak-detection-pipe-repair/#leak-detection'],
  ['Septic Tank Cleaning', 'septic', '/services/sewer-drain-septic/#septic-tank-cleaning'],
  ['Grease Trap Cleaning', 'grease', '/grease-trap-cleaning/'],
  ['Slab Leak Repair', 'slab', '/services/leak-detection-pipe-repair/#slab-leak-repair'],
  ['Backflow Testing', 'gauge', '/backflow-testing/'],
  ['Expansion Tank Installation', 'tank', '/expansion-tank/'],
  ['Sump Pump Well Pump Repair', 'wrench', '/sump-pump-repair/'],
  ['Waterline Replacement Repair', 'pipe', '/services/leak-detection-pipe-repair/#waterline-replacement-repair'],
  ['Water Pipe Repair Replacement', 'pipe', '/services/leak-detection-pipe-repair/#water-pipe-repair-replacement'],
  ['Water Pressure Repair', 'gauge', '/services/water-pressure-filtration/#water-pressure-repair'],
  ['Water Filter Installation', 'filter', '/services/water-pressure-filtration/#water-filter-installation'],
  ['Toilet Installation Repair', 'toilet', '/services/toilets-faucets/#toilet-installation-repair'],
  ['Faucet Installation', 'drop', '/services/toilets-faucets/#faucet-installation'],
  ['Video Inspection Services', 'eye', '/services/sewer-drain-septic/#video-inspection-services'],
];

const SERVICE_IMG: Record<string, string> = {
  'Leak Detection': 'leak detection (1).webp',
  'Septic Tank Cleaning': 'septic tank cleaning (1).webp',
  'Grease Trap Cleaning': 'grease cleaning (1).webp',
  'Backflow Testing': 'backflow-testing.webp',
  'Expansion Tank Installation': 'expansion-tank-installation.webp',
  'Faucet Installation': 'faucet installation.jpg',
  'Waterline Replacement Repair': 'waterline-replacement-repair (1).webp',
  'Sewer Line Cleaning Repair': 'sewer-line-cleaning-repair (1).webp',
  'Slab Leak Repair': 'slab-leak-repair (1).webp',
  'Sump Pump Well Pump Repair': 'sump pump well pump repair.jpg',
  'Toilet Installation Repair': 'toilet installation repair.jpg',
  'Video Inspection Services': 'video inspection.jpg',
  'Water Heater Installation Repair': 'water-heater-installation-repair.webp',
  'Water Filter Installation': 'water filter installation.jpg',
  'Water Pipe Repair Replacement': 'water-pipe-repair-replacement (1).webp',
  'Water Pressure Repair': 'water-pressure-repair.webp',
};

/** Homepage-only photo overrides ("Our Plumbing Services" grid). The Services
 *  page's "We Also Handle" cards keep SERVICE_IMG. */
const HOME_IMG: Record<string, string> = {
  'Leak Detection': 'leak-detection-technician.webp',
};

const SOCIALS = [
  { name: 'Facebook', short: 'f', href: 'https://www.facebook.com/JBGPlumbingServices' },
  { name: 'X', short: 'X', href: 'https://twitter.com/JBGPlumbing' },
  { name: 'Yelp', short: 'Yelp', href: 'https://www.yelp.com/biz/jbg-plumbing-college-station' },
  { name: 'BBB', short: 'BBB', href: 'https://www.bbb.org/central-texas/business-reviews/plumbers/jbg-plumbing-in-wellborn-tx-1000130652' },
  { name: 'Angi', short: 'Angi', href: 'https://www.angieslist.com/companylist/us/tx/wellborn/jbg-plumbing-reviews-8739178.htm' },
  { name: 'HomeAdvisor', short: 'HomeAdvisor', href: 'https://www.homeadvisor.com/rated.JBGPlumbing.49998568.html' },
];

/** Initial number of reviews shown (homepage / reviews page) and page size of "Load more". */
export const HOME_REVIEWS = 6;
/** Total Google review count (4.7 stars from 558 reviews), shown in "Showing N of 558 reviews".
 *  The site only carries the reviews in reviews-raw.js, so "Load more" stops at that list's end. */
export const GOOGLE_REVIEW_COUNT = 558;
export const ALL_REVIEWS = 30;

/** Truncation used by the homepage review cards ("See more"). */
export const shortReview = (text: string) => (text.length > 260 ? text.slice(0, 240).replace(/\s+\S*$/, '') + '…' : text);

/** Only the initially visible reviews are rendered; "Load more" fetches the rest from /reviews.json. */
function reviewItems(initial: number, truncate: boolean) {
  return REVIEWS.slice(0, initial).map((r) => {
    const long = truncate && r.text.length > 260;
    return { ...r, long, shownText: long ? shortReview(r.text) : r.text, fullText: long ? r.text : undefined, toggleLabel: 'See more', hidden: false };
  });
}

export function vals(page: PageKey) {
  const navItems: [string, string, Kid[]][] = [
    ['Home', '/', []],
    ['About Us', '/about-us/', [kid('Service Areas', '/locations/')]],
    ['Services', '/services/', [
      grp('Residential'),
      kid('Water Heaters', '/services/water-heaters/'),
      kid('Sewer, Drain & Septic', '/services/sewer-drain-septic/'),
      kid('Leak Detection & Pipe Repair', '/services/leak-detection-pipe-repair/'),
      kid('Water Pressure & Filtration', '/services/water-pressure-filtration/'),
      kid('Toilets & Faucets', '/services/toilets-faucets/'),
      grp(' '),
      grp('Commercial & Specialty'),
      kid('Grease Trap Cleaning', '/grease-trap-cleaning/'),
      kid('Backflow Testing', '/backflow-testing/'),
      kid('Expansion Tank', '/expansion-tank/'),
      kid('Sump Pump Repair', '/sump-pump-repair/'),
      kid('Commercial Boilers', '/boiler-installation/'),
      kid('Gas Line Installation', '/gas-line-installation/'),
    ]],
    ['Recent Projects', '/projects/', []],
    ['Reviews', '/reviews/', []],
  ];

  // Current-page highlight inside the dropdowns (prototype: pageHash list).
  const highlightPages: PageKey[] = ['locations', 'grease', 'expansion', 'backflow', 'boilers', 'gasline', 'sump', 'contact', 'heaters', 'sewer', 'leak', 'pressure', 'toilets'];
  const current = highlightPages.includes(page) ? PAGE_PATH[page] : null;

  const nav = navItems.map(([label, href, kids]) => {
    const isSvc = label === 'Services';
    const k2 = kids.map((k) => (current && k.href === current ? { ...k, weight: 800, color: '#BD1E2D', bg: '#F4F1EE', ring: 'inset 0 -3px 0 #BD1E2D' } : k));
    const active =
      (label === 'About Us' && (page === 'about' || page === 'locations' || page === 'contact')) ||
      (label === 'Recent Projects' && page === 'projects') ||
      (label === 'Reviews' && page === 'reviews') ||
      (label === 'Services' && SERVICE_PAGES.includes(page));
    return {
      label, href, kids: k2, hasKids: kids.length > 0,
      ddMin: isSvc ? '560px' : '240px', ddDisp: isSvc ? 'grid' : 'block', ddRows: isSvc ? 'repeat(7,auto)' : 'none', ddFlow: isSvc ? 'column' : 'row',
      bar: active ? '#BD1E2D' : 'transparent',
    };
  });

  const imgOf = (label: string, map: Record<string, string>) => (map[label] ? encodeURI('/uploads/' + map[label]) : '');
  const services = SERVICES.map(([label, ic, href]) => ({
    label, href, cta: 'Learn more →',
    hasImg: !!SERVICE_IMG[label], noImg: !SERVICE_IMG[label],
    img: imgOf(label, HOME_IMG) || imgOf(label, SERVICE_IMG),
    iconBig: icon(ic, '#716558', 64),
    // Prototype sizes this 22px under 700px and 28px above; the SVG scales to
    // its box via the --svcIconSvg variable.
    iconW: icon(ic, '#fff', 28, 'svc-icon-w'),
  }));

  const offers = ([['Cost effective upfront pricing', 'tag'], ['Personal service', 'user'], ['No mess after the job', 'broom'], ['Master plumbers', 'wrench'], ['Fully stocked trucks', 'truck'], ['Warranty', 'shield'], ['24/7 emergency repair', 'bolt']] as const)
    .map(([label, ic]) => ({ label, icon: icon(ic, '#fff', 28) }));

  const kidsOf = (l: string) => (nav.find((n) => n.label === l)?.kids ?? []).filter((k) => k.pe !== 'none');
  const fl = (label: string, href: string) => ({ label, href, fc: '#E6E0DA', fw: 500, fs: '15px', tt: 'none', ls: '0' });
  const footMenus = [
    { title: 'Menu', links: [fl('Home', '/'), fl('Recent Projects', '/projects/'), fl('About Us', '/about-us/'), fl('Contact Us', '/contact-us/'), ...kidsOf('About Us').map((k) => fl(k.label, k.href)), fl('Reviews', '/reviews/')] },
    { title: 'Commercial Plumbing', links: kidsOf('Services').map((k) => fl(k.label, k.href)) },
  ];

  const visibleReviews = reviewItems(HOME_REVIEWS, true);
  const allReviews = reviewItems(ALL_REVIEWS, false);
  const total = REVIEWS.length;

  const opt = (label: string, ic?: string) => ({
    label, on: false, bd: '#C9BFB5', bg: '#fff', fg: '#2B2622',
    icon: ic ? icon(ic, '#716558', 40) : '',
  });

  return {
    nav, services, offers, footMenus, socials: SOCIALS,
    findUs: [{ name: 'Google', short: 'Google', href: 'https://www.google.com/maps?cid=14838878191929429427' }, ...SOCIALS],
    featured: ([['Grease Trap Cleaning', '/grease-trap-cleaning/', 'grease'], ['Backflow Testing', '/backflow-testing/', 'gauge'], ['Expansion Tank Installation', '/expansion-tank/', 'tank'], ['Commercial Boilers', '/boiler-installation/', 'bolt'], ['Gas Line Installation', '/gas-line-installation/', 'pipe'], ['Sump Pump Repair', '/sump-pump-repair/', 'pump']] as const)
      .map(([label, href, ic]) => ({ label, href, hasImg: false, noImg: true, icon: icon(ic, '#fff', 34) })),
    alsoCards: ['Water Heater Installation Repair', 'Sewer Line Cleaning Repair', 'Leak Detection', 'Septic Tank Cleaning', 'Slab Leak Repair', 'Waterline Replacement Repair', 'Water Pipe Repair Replacement', 'Water Pressure Repair', 'Water Filter Installation', 'Toilet Installation Repair', 'Faucet Installation', 'Video Inspection Services']
      .map((l) => ({ ...services.find((s) => s.label === l)!, img: imgOf(l, SERVICE_IMG) })),
    rotWords: ['Salon', 'Restaurant', 'Retail', 'Gym', 'Home'].map((w, i, a) => {
      const on = i === 0;
      return { w, c: on ? '#fff' : '#D9CFC6', fw: on ? 900 : 500, bd: on ? '#BD1E2D' : 'transparent', sep: i < a.length - 1 ? '·' : 'Plumbing' };
    }),
    icons: { tag: icon('tag', '#fff', 30), drop: icon('drop', '#fff', 30), bolt: icon('bolt', '#fff', 30), tank: icon('tank', '#fff', 30), shield: icon('shield', '#fff', 30) },
    phoneIcon: icon('phone', '#fff', 22), menuIcon: icon('menu', '#fff', 24), phoneDark: icon('phone', '#716558', 30),
    visibleReviews, shownCount: Math.min(HOME_REVIEWS, total), totalCount: GOOGLE_REVIEW_COUNT, canLoadMore: HOME_REVIEWS < total,
    allReviews, allShown: Math.min(ALL_REVIEWS, total), allTotal: GOOGLE_REVIEW_COUNT, allCanLoad: ALL_REVIEWS < total,
    mapSrc: 'https://maps.google.com/maps?q=' + encodeURIComponent('580 Graham Rd Ste D, College Station, TX 77845') + '&z=15&output=embed',
    wtOpts: [['Residential Plumbing', 'home'], ['Commercial Plumbing', 'building'], ['New Commercial Construction', 'crane']].map(([l, ic]) => opt(l, ic)),
    cmOpts: ['Phone', 'Email', 'Text'].map((l) => opt(l)),
    quoteRing: page === 'quote' ? '0 4px 0 #BD1E2D' : 'none',
    // Form placeholders: validation state is applied client-side.
    qm: {} as Record<string, string>, cm: {} as Record<string, string>,
    qb: new Proxy({}, { get: () => '#C9BFB5' }) as Record<string, string>,
    cb: new Proxy({}, { get: () => '#C9BFB5' }) as Record<string, string>,
  };
}
