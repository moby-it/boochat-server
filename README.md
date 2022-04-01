# Project Description

Wanting to learn more about WebSockets, CQRS and Event Driven architectures, I thought of implementing a chat/meetups application for my friends.

The project uses https://nx.dev/, https://nestjs.com/ with https://www.mongodb.com/ and https://angular.io/ .

# TODO

## CQRS, Event Sourcing Logic

1. Transfer Users Collection to SharedDB.
2. Create application_events queue in rmq
3. Create adapter
4. Consider either creating application events store

### Docker notes

Build dependencies
docker build . -f docker/boochat-dependencies.dockerfile -t boochat.azurecr.io/boochat-dependencies:latest
docker push boochat.azurecr.io/boochat-dependencies:latest
