// Generates the raster brand assets in public/ from src/assets/brand/mark.svg.
// Run once after changing the logo: `npm run icons`. Outputs are committed.
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { chromium } from 'playwright';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pub = (f) => path.join(root, 'public', f);
const mark = await readFile(path.join(root, 'src/assets/brand/mark.svg'));

/** Mark centred on a square tile; `bg` null keeps transparency. */
async function tile(size, { bg = null, padding = 0.1 } = {}) {
  const inner = Math.round(size * (1 - padding * 2));
  const icon = await sharp(mark, { density: 600 }).resize(inner, inner).png().toBuffer();
  return sharp({
    create: { width: size, height: size, channels: 4, background: bg ?? { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([{ input: icon, gravity: 'center' }])
    .png()
    .toBuffer();
}

const white = { r: 255, g: 255, b: 255, alpha: 1 };
await writeFile(pub('icon-192.png'), await tile(192, { bg: white, padding: 0.14 }));
await writeFile(pub('icon-512.png'), await tile(512, { bg: white, padding: 0.14 }));
await writeFile(pub('apple-touch-icon.png'), await tile(180, { bg: white, padding: 0.14 }));
await writeFile(
  pub('favicon.ico'),
  await pngToIco([await tile(16, { padding: 0 }), await tile(32, { padding: 0.02 }), await tile(48, { padding: 0.04 })])
);

// Open Graph card, rendered with the site's real fonts.
// Fonts are inlined as data URIs: the page is set from a string, so it has no origin to load files from.
const fontData = async (pkg, file) =>
  `data:font/woff2;base64,${(await readFile(path.join(root, 'node_modules', pkg, 'files', file))).toString('base64')}`;
const fonts = {
  display: await fontData('@fontsource-variable/bricolage-grotesque', 'bricolage-grotesque-latin-wght-normal.woff2'),
  body: await fontData('@fontsource-variable/inter', 'inter-latin-wght-normal.woff2'),
  mono: await fontData('@fontsource-variable/jetbrains-mono', 'jetbrains-mono-latin-wght-normal.woff2'),
};
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: Display; src: url(${fonts.display}); font-weight: 200 800; }
@font-face { font-family: Body; src: url(${fonts.body}); font-weight: 100 900; }
@font-face { font-family: Mono; src: url(${fonts.mono}); font-weight: 100 800; }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; overflow: hidden; font-family: Body;
  background: radial-gradient(700px 420px at 100% 0%, rgba(15,148,132,.45), transparent 60%),
              radial-gradient(600px 420px at 0% 100%, rgba(124,58,237,.4), transparent 60%), #3f35c9; color: #fff; }
.wrap { position: absolute; inset: 0; padding: 72px 80px; display: flex; flex-direction: column; justify-content: space-between; }
.brand { display: flex; align-items: center; gap: 18px; font-family: Display; font-weight: 800; font-size: 44px; letter-spacing: -1px; }
.brand .chip { width: 72px; height: 72px; background: #fff; border-radius: 18px; display: grid; place-items: center; }
.brand svg { width: 52px; height: 52px; }
h1 { font-family: Display; font-weight: 800; font-size: 76px; line-height: 1.02; letter-spacing: -2.6px; max-width: 760px; }
h1 span { color: #ffcf4a; }
.foot { font-family: Mono; font-size: 24px; letter-spacing: 1px; color: rgba(255,255,255,.85); }
.receipt { position: absolute; right: 70px; top: 120px; width: 300px; background: #fffdf8; color: #24252f; font-family: Mono;
  font-size: 18px; padding: 26px 26px 34px; transform: rotate(4deg); box-shadow: 0 30px 60px rgba(0,0,0,.35); line-height: 1.6; }
.receipt hr { border: 0; border-top: 2px dashed rgba(36,37,47,.25); margin: 12px 0; }
.row { display: flex; justify-content: space-between; } .ok { color: #0b7f72; font-weight: 700; }
.t { font-weight: 800; font-size: 22px; }
</style></head><body><div class="wrap">
<div class="brand"><div class="chip">${mark.toString()}</div>Organizae</div>
<h1>Vendas, estoque e caixa da sua loja <span>no mesmo lugar.</span></h1>
<div class="foot">SISTEMA DE GESTÃO DE LOJAS · ORGANIZAE.APP.BR</div>
</div>
<div class="receipt">
<div class="row"><span>2x Camiseta</span><span>119,80</span></div>
<div class="row"><span>1x Bolsa</span><span>89,90</span></div>
<div class="row"><span>1x Brinco</span><span>34,90</span></div>
<hr><div class="row t"><span>TOTAL</span><span>244,60</span></div><hr>
<div class="row"><span>Estoque</span><span class="ok">✓</span></div>
<div class="row"><span>Caixa</span><span class="ok">✓</span></div>
</div></body></html>`;

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const png = await page.screenshot({ type: 'png' });
  await writeFile(pub('og-image.png'), await sharp(png).png({ compressionLevel: 9, palette: false }).toBuffer());
} finally {
  await browser.close();
}

console.log('Icons and og-image written to public/.');
