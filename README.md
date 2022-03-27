# Project Description

Wanting to learn more about WebSockets, CQRS and Event Driven architectures, I thought of implementing a chat/meetups application for my friends.

The project uses https://nx.dev/, https://nestjs.com/ with https://www.mongodb.com/ and https://angular.io/ .


# TODO

## Persistence
### Create event stores for Event Sourcing
1. Create entity event stores
2. Implement the command logic that writes to the event stores.
3. After writing to the event, the app should update the read dbs (rooms,users,meetups etc)
4. After updating read dbs probably emit notification.


### Docker notes

Build dependencies
docker build . -f docker/oursocial-dependencies.dockerfile -t oursocial.azurecr.io/oursocial-dependencies:latest
docker push oursocial.azurecr.io/oursocial-dependencies:latest
