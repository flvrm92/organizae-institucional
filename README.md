# organizae-institucional

Site público do Organizae, servido em **organizae.app.br**. É uma página única, estática e otimizada
para SEO, com as seções Início, Como funciona, Para quem é, Fale conosco e FAQ. O sistema em si
(organizae-client) fica em **painel.organizae.app.br**.

## Stack

- [Astro](https://astro.build) gerando HTML estático, com Tailwind CSS 4.
- Fontes auto-hospedadas via Fontsource: Bricolage Grotesque, Inter e JetBrains Mono.
- JavaScript só para o tema claro/escuro, o menu mobile e o destaque da seção ativa.

## Comandos

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # astro check + build em dist/
npm run preview   # serve o build
npm run icons     # regenera favicon/ícones/og-image a partir de src/assets/brand/mark.svg
```

## Configuração

Os valores abaixo entram no HTML em tempo de build (veja `.env.example`):

| Variável           | Padrão                            | Uso                                          |
| ------------------ | --------------------------------- | -------------------------------------------- |
| `PUBLIC_SITE_URL`  | `https://organizae.app.br`        | URL canônica, sitemap, Open Graph            |
| `PUBLIC_PANEL_URL` | `https://painel.organizae.app.br` | Botão "Entrar" e redirect de `/login`         |

Só a origem de produção (`https://organizae.app.br`) é indexável. Qualquer outra (dev, previews)
sai com `noindex` e com `robots.txt` bloqueando tudo.

O WhatsApp, as perguntas do FAQ e os textos de SEO ficam em `src/config/site.ts`. O JSON-LD
`FAQPage` é gerado a partir desses mesmos dados.

## Docker

```bash
# produção
docker build -t organizae-institucional .
# dev
docker build -t organizae-institucional:dev \
  --build-arg PUBLIC_SITE_URL=https://dev.organizae.app.br \
  --build-arg PUBLIC_PANEL_URL=https://painel.dev.organizae.app.br .
docker run -p 8080:80 organizae-institucional
```

O nginx (`nginx/default.conf.template`) faz o seguinte:
- serve o build com cache imutável para `/_astro/*`;
- adiciona headers de segurança;
- redireciona `/login` e `/esqueci-senha` (endereços antigos do app) para o painel.

A Content-Security-Policy é emitida pelo próprio Astro numa tag `<meta>`, com os hashes dos scripts.
Por isso não use `style="..."` inline nem scripts externos sem ajustar `security.csp` em `astro.config.mjs`.
