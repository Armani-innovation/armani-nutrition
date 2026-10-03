# =============================================================================
# Frontend image — Nuxt 4 SSR (multi-stage)
# Yarn 4 Berry (node-modules linker), Node 22 LTS.
# Stages: deps → build → runner
# =============================================================================

# ---------- Stage 1: dependencies ----------
FROM docker-mirror.liara.ir/node:22-slim AS deps

RUN corepack enable

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./

RUN yarn install --immutable --network-timeout 600000

# ---------- Stage 2: build ----------
FROM docker-mirror.liara.ir/node:22-slim AS build

RUN corepack enable

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Public browser base must be origin-relative (/api → nginx → backend).
# SSR nitro proxy target must be the internal Docker service (baked at build).
ARG NUXT_PUBLIC_API_BASE=/api
ARG NUXT_SSR_API_BASE=http://backend:8000
ENV NUXT_PUBLIC_API_BASE=${NUXT_PUBLIC_API_BASE} \
    NUXT_SSR_API_BASE=${NUXT_SSR_API_BASE}

RUN yarn build

# ---------- Stage 3: runner ----------
FROM docker-mirror.liara.ir/node:22-slim AS runner

WORKDIR /app

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000 \
    NUXT_HOST=0.0.0.0 \
    NUXT_PORT=3000 \
    NUXT_PUBLIC_API_BASE=/api \
    NUXT_SSR_API_BASE=http://backend:8000

COPY --from=build /app/.output ./.output
COPY --from=build /app/package.json ./package.json

RUN groupadd -r nuxt && useradd -r -g nuxt -d /app -s /sbin/nologin nuxt \
    && chown -R nuxt:nuxt /app
USER nuxt

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
    CMD node -e "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", ".output/server/index.mjs"]
