FROM boochat.azurecr.io/dependencies:latest
WORKDIR /usr/src/app
COPY . .
RUN npm run build query-api
EXPOSE 3333
CMD ["node", "dist/apps/query-api/main.js"]
