# Project Description

Wanting to learn more about WebSockets, CQRS and Event Driven architectures, I thought of implementing a chat/meetups application for my friends.

The project uses https://nx.dev/, https://nestjs.com/ with https://www.mongodb.com/ and https://angular.io/ .


# TODO

## Persistence

Implement Event entity DTO
Implement Event entity Service

## Roadmap
Implement events, commands and queries for event entity
REMAME EVENT ENTITIES TO OCCASIONS

### Docker notes

Build dependencies
docker build . -f docker/oursocial-dependencies.dockerfile -t oursocial.azurecr.io/oursocial-dependencies:latest
docker push oursocial.azurecr.io/oursocial-dependencies:latest
