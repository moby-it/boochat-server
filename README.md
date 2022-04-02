# Project Description

Wanting to learn more about WebSockets, CQRS and Event Driven architectures, I thought of implementing a chat/meetups application for my friends.

The project uses https://nx.dev/, https://nestjs.com/ with https://www.mongodb.com/ and https://angular.io/ .

# TODO

## CQRS, Event Sourcing Logic

1. add correlation id to all events that is create by the UI

Consider introducing commands in the future

### Docker notes

Build dependencies
docker build . -f docker/boochat-dependencies.dockerfile -t boochat.azurecr.io/boochat-dependencies:latest
docker push boochat.azurecr.io/boochat-dependencies:latest
