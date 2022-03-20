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
