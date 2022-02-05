FROM node:16-alpine as dependencies

WORKDIR usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

FROM dependencies as build

RUN npm run build chat-api

FROM base as release

COPY --from=build dist/apps/chat-api .

EXPOSE 3333

RUN node main.js

