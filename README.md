# Project Description

Wanting to learn more about WebSockets, CQRS and Event Driven architectures, I thought of implementing a chat/meetups application for my friends.

The project uses https://nx.dev/, https://nestjs.com/ with https://www.mongodb.com/ and https://angular.io/ .

# TODO

## CQRS, Event Sourcing Logic

1. Web Api is essentialy the way the FE creates commands.
2. Command Handlers contain business logic and raise events.
3. Event handlers write to store.
4. There should be a base event handlers that writes to db and after that emits to rmq

### Docker notes

Build dependencies
docker build . -f docker/boochat-dependencies.dockerfile -t boochat.azurecr.io/boochat-dependencies:latest
docker push boochat.azurecr.io/boochat-dependencies:latest
