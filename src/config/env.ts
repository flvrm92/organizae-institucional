import { SITE_URL } from './site';

/** The canonical production origin; any other origin (dev, previews) is kept out of search engines. */
export const PRODUCTION_SITE_URL = 'https://organizae.app.br';
export const isProduction = SITE_URL === PRODUCTION_SITE_URL;
