FROM boochat.azurecr.io/dependencies:latest
WORKDIR /usr/src/app
COPY . .
RUN npm run build command-api
EXPOSE 3333
CMD ["node", "dist/apps/command-api/main.js"]
