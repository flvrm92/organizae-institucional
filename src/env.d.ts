interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_PANEL_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
