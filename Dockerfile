FROM node:20-bookworm-slim AS base

WORKDIR /app

ENV NODE_ENV=development

RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

COPY package.json tsconfig.base.json ./
COPY apps/api/package.json apps/api/package.json
COPY apps/web/package.json apps/web/package.json
COPY packages/types/package.json packages/types/package.json

RUN npm install

COPY . .

RUN npm --workspace @prodarte/api run db:generate

FROM base AS api-dev

EXPOSE 3001

CMD ["npm", "--workspace", "@prodarte/api", "run", "dev"]

FROM base AS web-dev

EXPOSE 3000

CMD ["npm", "--workspace", "@prodarte/web", "run", "dev", "--", "--hostname", "0.0.0.0"]
