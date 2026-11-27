// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Canonical origin of the public site. Overridable per environment (dev.organizae.app.br).
const site = process.env.PUBLIC_SITE_URL ?? 'https://organizae.app.br';

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
  // Astro hashes every inline script/style it renders into a CSP <meta>, including the theme bootstrap.
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "base-uri 'self'",
        "form-action 'self'",
        "object-src 'none'",
      ],
    },
  },
  // No Markdown code blocks here; Shiki's inline styles would conflict with the CSP.
  markdown: { syntaxHighlight: false },
  // Never inline assets as data: URIs (fonts would be blocked by font-src 'self').
  vite: { plugins: [tailwindcss()], build: { assetsInlineLimit: 0 } },
});
