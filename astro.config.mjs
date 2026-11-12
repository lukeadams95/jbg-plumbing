// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://jbgplumbingtx.com',
  trailingSlash: 'always',
  // Old jbgplumbingtx.com URLs -> new paths. On a static host Astro emits a
  // meta-refresh page for each; hosts with redirect support (Netlify, Vercel,
  // Cloudflare) can turn these into real 301s via their adapter.
  redirects: {
    '/commercial-plumber-services/': '/services/',
    '/commercial-plumber-services/grease-trap-cleaning/': '/grease-trap-cleaning/',
    '/commercial-plumber-services/backflow-testing-college-station-tx-bryan/': '/backflow-testing/',
    '/commercial-plumber-services/sump-pump-repair-college-station-tx-bryan/': '/sump-pump-repair/',
    '/commercial-plumber-services/boiler-installation/': '/boiler-installation/',
    '/commercial-plumber-services/gas-line-installation/': '/gas-line-installation/',
    '/testimonials/': '/',
    '/latest-from-jbg/': '/',
    '/latest-from-jbg/grease-trap-cleaning/': '/grease-trap-cleaning/',
    '/latest-from-jbg/backflow-testing/': '/backflow-testing/',
    '/latest-from-jbg/commercial-build-out-plumbing/': '/projects/',
    '/locations/texas/college-station/': '/locations/',
    '/locations/texas/houston/': '/locations/',
    '/locations/texas/san-antonio/': '/locations/',
    '/locations/louisiana/baton-rouge/': '/locations/',
  },
});
