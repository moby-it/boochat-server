# https://medium.com/codex/dockerize-angular-application-69e7503d1816
FROM boochat.azurecr.io/dependencies:latest as build
WORKDIR /usr/src/app
COPY . .
RUN npm run build:client

FROM nginx:alpine
COPY --from=build /usr/src/app/dist/apps/client /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
