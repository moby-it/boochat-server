FROM node:16-alpine as deps
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci

FROM deps
WORKDIR /usr/src/app
COPY . .
RUN npm run build query-api
EXPOSE 4444
CMD ["node", "dist/apps/query-api/main.js"]
