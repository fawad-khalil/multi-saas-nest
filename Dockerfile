FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN apt-get update -y && apt-get install -y openssl
WORKDIR /app
COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install
COPY ./ .
COPY ./.docker.dev.env ./.env

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile
FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

RUN npx prisma generate
RUN pnpm run build
EXPOSE 3000
CMD ["pnpm", "run", "start:prod"]
