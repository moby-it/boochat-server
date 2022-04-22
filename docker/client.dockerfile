FROM boochat.azurecr.io/dependencies:latest as build
WORKDIR /usr/src/app
COPY . .
RUN npm run build:client:dev

FROM nginx:alpine
COPY --from=build /usr/src/app/dist/apps/client /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
