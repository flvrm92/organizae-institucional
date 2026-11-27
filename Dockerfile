# ---- build ----
FROM node:24-alpine AS build
WORKDIR /app

# Baked into the static HTML at build time.
ARG PUBLIC_SITE_URL=https://organizae.app.br
ARG PUBLIC_PANEL_URL=https://painel.organizae.app.br
ENV PUBLIC_SITE_URL=${PUBLIC_SITE_URL} \
    PUBLIC_PANEL_URL=${PUBLIC_PANEL_URL}

COPY package.json package-lock.json ./
# playwright/sharp/png-to-ico are only for `npm run icons`; skip their browser download.
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
RUN npm ci
COPY . .
RUN npm run build

# ---- runtime ----
FROM nginx:alpine
ARG PUBLIC_PANEL_URL=https://painel.organizae.app.br
# Used by the nginx template to redirect old app URLs (/login, /esqueci-senha) to the panel.
ENV PANEL_URL=${PUBLIC_PANEL_URL}
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
