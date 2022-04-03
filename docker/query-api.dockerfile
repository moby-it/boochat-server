FROM boochat.azurecr.io/dependencies:latest
WORKDIR /usr/src/app
COPY . .
RUN npm run build query-api
EXPOSE 4444
CMD ["node", "dist/apps/query-api/main.js"]
