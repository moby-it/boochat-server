# Project Description

Boochat is a chat and meetups application developed as a hobby for my friends.

The project is inspired by ideas from [Event-driven Architecture](https://en.wikipedia.org/wiki/Event-driven_architecture) and [Event Sourcing](https://martinfowler.com/eaaDev/EventSourcing.html).

# How to run

1. Make sure you have docker installed on your machine, with docker-compose. [Install guide](https://docs.docker.com/engine/)
2. Create two copies of the file `.env.example` and name them `.env` and `.local.env`. The local env file should have the variables that affect the local serve of the app and the `.env` file should have the variables that affect the docker serve of the app. The .env.example file is a valid .env file, so that should work out of the box.
3. Run `docker-compose up -d` inside the root directory of the project.
4. For watching logs, run `docker-compose logs --follow`

You should a working local version of the whole stack.

## Technology Stack

### Backend

1.  [NestJs](https://docs.nestjs.com/) - Opinionated Node.js framework for building server-side applications.
2.  [MongoDB](https://www.mongodb.com/) for storing events.
3.  [RabbitMQ](https://www.rabbitmq.com/) as the Event/Message Broker.

### FrontEnd

React or Angular (still haven't decided)

# Domain structure

Following Domain-Driven-Design principles, there will be a description of the entities, events, commands and queries.

Right now there is not command layer, since every command just raises a single event. It will be implemented when/if needed.

- **Everything in Bold reffers to Entities**
- _Everything in Italic reffers to Events_

## Entities

### User

A **User** is anyone who interacts with the UI of the app.

#### User Properties:

- name: string
- googleId: string
- imageUrl: string

### Room

The room is the actual chat room in which people exchange **Messages**. A room has participats that might change as time progresses, since **Users** get _Invited_ or _Leave_ Rooms.

#### Room Properties:

- name: string;
- users: **User** Array
- messages: **Message** Array

### Message

This is probably the most business important entity of the system even though it's contents are self-explained.

#### Properties:

- sender: **User**
- content: string
- dateSent: Date
- room: **Room**

### Meetup

A **Meetup** is the
