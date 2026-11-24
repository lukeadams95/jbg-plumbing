// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://bcsplumber.com',
  trailingSlash: 'always',
  // Old WordPress URLs are 301-redirected in public/_redirects (Cloudflare Pages).
});
