FROM oursocial.azurecr.io/oursocial-dependencies:latest
COPY . .
RUN npm run build chat-api
WORKDIR dist/apps/chat/chat-api
EXPOSE 3333
CMD ["node", "main.js"]
