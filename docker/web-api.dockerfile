FROM boochat.azurecr.io/dependencies:latest
WORKDIR /usr/src/app
COPY . .
RUN npm run build web-api
EXPOSE 3333
CMD ["node", "dist/apps/web-api/main.js"]
