FROM oursocial.azurecr.io/oursocial-dependencies:latest
COPY . .
RUN npm run build events-api
WORKDIR dist/apps/events/events-api
EXPOSE 3333
CMD ["node", "main.js"]
