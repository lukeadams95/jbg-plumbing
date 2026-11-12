import type { PageKey } from './vals';

/** <title> for each page. Pages carry no meta descriptions yet; add them here. */
export const TITLES: Record<PageKey, string> = {
  home: 'JBG Commercial Plumbing | College Station Plumber',
  about: 'About Us',
  locations: 'Service Areas',
  projects: 'Recent Projects',
  quote: 'Request a Quote',
  reviews: 'Reviews',
  services: 'Our Services',
  grease: 'Grease Trap Cleaning',
  expansion: 'Expansion Tank Installation',
  backflow: 'Backflow Testing',
  boilers: 'Commercial Boilers',
  gasline: 'Gas Line Installation',
  sump: 'Sump Pump Repair',
  heaters: 'Water Heaters',
  sewer: 'Sewer, Drain & Septic',
  leak: 'Leak Detection & Pipe Repair',
  pressure: 'Water Pressure & Filtration',
  toilets: 'Toilets & Faucets',
  contact: 'Contact Us',
  terms: 'Terms of Service',
  privacy: 'Privacy Policy',
  thanks: 'Thank You',
};

export const pageTitle = (p: PageKey) => (p === 'home' ? TITLES.home : `${TITLES[p]} | JBG Commercial Plumbing`);
