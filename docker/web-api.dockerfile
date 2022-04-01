FROM boochat.azurecr.io/boochat-dependencies:latest
COPY . .
RUN npm run build web-api
WORKDIR /dist/apps/web-api
EXPOSE 3333
CMD ["node", "main.js"]
