# Base
FROM node:18-alpine AS base

RUN apk add --no-cache bash

WORKDIR /code

COPY package.json yarn.lock .yarnrc.yml ./

RUN yarn install --frozen-lockfile

# Development
FROM base AS dev

# NOTE: Not intended to run outside of local dev env
# nosemgrep
CMD ["/bin/bash", "-c", "yarn dev"]

# Build
FROM base as build

WORKDIR /code

COPY ./ ./
RUN yarn build
