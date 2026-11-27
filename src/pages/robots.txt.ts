import type { APIRoute } from 'astro';
import { SITE_URL } from '../config/site';
import { isProduction } from '../config/env';

// Only the production origin is indexable; dev/preview builds ask crawlers to stay out.
export const GET: APIRoute = () => {
  const body = isProduction
    ? `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap-index.xml\n`
    : 'User-agent: *\nDisallow: /\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
