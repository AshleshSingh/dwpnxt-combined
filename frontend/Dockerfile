
FROM node:20-bookworm-slim

RUN apt-get update && apt-get install -y \
    bash \
    python3 \
    python3-pip \
    build-essential \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN       if [ -f yarn.lock ]; then yarn --frozen-lockfile;       elif [ -f pnpm-lock.yaml ]; then npm i -g pnpm && pnpm i --frozen-lockfile;       else npm ci; fi || npm install
COPY . .
EXPOSE 3000
CMD ["npm","run","dev"]
