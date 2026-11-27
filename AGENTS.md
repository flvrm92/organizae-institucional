# AGENTS.md — organizae-institucional

Site público (marketing/SEO) do Organizae. As convenções transversais estão no repositório agregador
`organizae` (`../organizae/AGENTS.md`).

- **Stack:** Astro (saída estática) + Tailwind 4. Não adicione framework de UI.
- **Conteúdo:** pt-BR. Descreva só funcionalidades que existem no organizae-client. Exemplo: NF-e é
  *importação de XML de compra*, não emissão.
- **Fonte única:** URLs, WhatsApp, FAQ e textos de SEO ficam em `src/config/site.ts`.
- **Âncoras:** os ids das seções (`#inicio`, `#como-funciona`, `#para-quem-e`, `#fale-conosco`, `#faq`)
  fazem parte da URL pública. Não os renomeie.
- **CSP:** o Astro gera a CSP com hashes. Sem `style="..."` inline e sem assets como `data:` URI.
- **Tema:** tokens em `src/styles/global.css` (`:root` e `.dark`). Toda cor nova precisa das duas variantes.
- **Validação:** `npm run build` (inclui `astro check`) e conferência visual em 360/768/1280px, nos dois temas.
