import type { APIRoute } from 'astro';
import { PAGE_PATH, type PageKey } from '../data/vals';

// Every real page except the form thank-you page (noindex).
const EXCLUDE: PageKey[] = ['thanks'];

export const GET: APIRoute = ({ site }) => {
  const urls = (Object.entries(PAGE_PATH) as [PageKey, string][])
    .filter(([page]) => !EXCLUDE.includes(page))
    .map(([, path]) => `  <url><loc>${new URL(path, site)}</loc></url>`)
    .join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
