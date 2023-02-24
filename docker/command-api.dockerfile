FROM node:16-alpine as deps
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci

FROM deps
WORKDIR /usr/src/app
COPY . .
RUN npm run build command-api
EXPOSE 3333
CMD ["node", "dist/apps/command-api/main.js"]
