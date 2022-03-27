# Project Description

Wanting to learn more about WebSockets, CQRS and Event Driven architectures, I thought of implementing a chat/meetups application for my friends.

The project uses https://nx.dev/, https://nestjs.com/ with https://www.mongodb.com/ and https://angular.io/ .


# TODO

## Persistence
### Create event stores for Event Sourcing
1. Rename EventLogs collection to RoomsEventStore
2. Aside from the enum, **always add event name to an EventStore**
3. Create a MeetupsEventStore
4. Consider implementing a redis service for creating snapshots of Rooms and Meetups
  1. This would imply that you could even maybe drop Meetups and Rooms Collections

### Docker notes

Build dependencies
docker build . -f docker/oursocial-dependencies.dockerfile -t oursocial.azurecr.io/oursocial-dependencies:latest
docker push oursocial.azurecr.io/oursocial-dependencies:latest
