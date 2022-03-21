FROM oursocial.azurecr.io/oursocial-dependencies:latest
COPY . .
RUN npm run build meetups-api
WORKDIR dist/apps/meetups/meetups-api
EXPOSE 3333
CMD ["node", "main.js"]
