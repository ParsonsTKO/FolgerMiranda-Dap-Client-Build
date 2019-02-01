FROM node:11.1.0-alpine

WORKDIR /app

COPY package.json package-lock.jso[n] ./
RUN if [ -f package-lock.json ]; then npm ci; else npm i; fi

COPY .babelrc .eslintrc .sass-lint.yml .stylintrc gulpfile.js patternlab-config.json ./
COPY src ./src

LABEL maintainer="FOLGER" description="FOLGER DAPClient Frontend App"