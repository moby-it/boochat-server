# Project Description

Wanting to learn more about WebSockets, CQRS and Event Driven architectures, I thought of implementing a chat/meetups application for my friends.

The project uses https://nx.dev/, https://nestjs.com/ with https://www.mongodb.com/ and https://angular.io/ (maybe react as well).

## CQRS, Event Sourcing Logic

### Docker notes

Build dependencies
docker build . -f docker/boochat-dependencies.dockerfile -t boochat.azurecr.io/boochat-dependencies:latest
docker push boochat.azurecr.io/boochat-dependencies:latest
