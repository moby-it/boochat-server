# https://medium.com/codex/dockerize-angular-application-69e7503d1816
FROM boochat.azurecr.io/dependencies:latest as build
WORKDIR /usr/src/app
COPY . .
EXPOSE 4200
CMD [ "npm","run","start:client" ]
