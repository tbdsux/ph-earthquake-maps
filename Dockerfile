ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-slim AS slim

# Setup pnpm and turbo on the slim base
FROM slim AS base
RUN corepack enable
RUN npm install -g corepack@latest
RUN pnpm config set store-dir ~/.pnpm-store


# 3. Build the project
FROM base AS builder

ENV CI=true

WORKDIR /app

COPY ./ /app

# Install dependencies
RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm install --frozen-lockfile

# Build the specified project
RUN pnpm build



# Production image
FROM nginx:stable-alpine AS production

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]