# Project Description

Boochat is a chat and meetups application developed as a hobby for my friends.

The project is inspired by ideas from [Event-driven Architecture](https://en.wikipedia.org/wiki/Event-driven_architecture) and [Event Sourcing](https://martinfowler.com/eaaDev/EventSourcing.html).

# How to run

1. Make sure you have docker installed on your machine, with docker-compose. [Install guide](https://docs.docker.com/engine/)
2. Create two copies of the file `.env.example` and name them `.env` and `.local.env`. The local env file should have the variables that affect the local serve of the app and the `.env` file should have the variables that affect the docker serve of the app. The .env.example file is a valid .env file, so that should work out of the box.
3. Run `docker-compose up -d` inside the root directory of the project.
4. For watching logs, run `docker-compose logs --follow`

You should a working local version of the whole stack.

# Technology Stack



## Backend

1.  [NestJs](https://docs.nestjs.com/) - Opinionated Node.js framework for building server-side applications.
2.  [MongoDB](https://www.mongodb.com/) - Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas.
3.  [RabbitMQ](https://www.rabbitmq.com/) - RabbitMQ is the most widely deployed open source message broker.

## FrontEnd

React or Angular (still haven't decided)
# Workflow

![workflow Diagram](https://drive.google.com/uc?export=view&id=1q62mHldFfE58FSGk1AmAc2_ivdUsDYws)

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

#### Message Properties:

- sender: **User**
- content: string
- dateSent: Date
- room: **Room**

### Meetup

A **Meetup** describes a gathering to take place on a specific Date by specific attendees at a specific location. A **Meetup** is always related with a **Room**.

#### Meetup Properties:

- name :string
- organizer: **User**
- location: string
- attendants: **User** Array
- takesPlaceOn: Date
- room: **Room**

## _Events_

Every _Event_ is dispatched by a **User**. Every so every _Event_ is a _User Event_. 

Every *Event* has a ```userId``` property and a ```type``` property. The ```type`` property is a enum lookup.

Events are seperated into three categories: 
1. Room Events
2. Meetup Events
3. Application Events

 ### _Room Events_ Table

| A User (Event Name) | Payload |
| ------------------------- | ------------------------------- |
|*sends a **Message*** | [Send Message Payload](#Send-Message-Payload) |
| *invites a **User** to a **Room***| [Invite User To Room Payload](#Invite-User-To-Room-Payload) |
| *leaves a **Room*** | [User Left Room Paylod](#User-Left-Room-Payload) |
| *created a **Room*** | [User Created Room Payload](#User-Created-Room-Payload) |
| *closed **Room*** | [User Closed Room Payload](#user-closed-room-payload) |

#### Room Events Enum
```typescript
enum RoomEventEnum {
  ROOM_CREATED = 1,
  USER_INVITED_ROOM = 2,
  USER_LEFT_ROOM = 3,
  USER_CLOSED_ROOM = 4,
  USER_SENT_MESSAGE = 5
}
```

### _Meetup Events_ Table

| A User (Event Name) | Payload |
| ------------------------- | ------------------------------- |
|*created a **Meetup***|[User Created Meetup Payload](#user-created-meetup-payload)|
|*changed rsvp* | [User Changed Rsvp Payload](#user-changed-rsvp-payload)|
|*created Poll* | [User Created Poll Payload](#user-created-poll-payload)|
|*cast Poll vote* | [User Cast Poll Vote Payload](#user-cast-poll-vote-payload)|

#### Meetup Events Enum
```typescript
enum MeetupEventEnum {
  MEETUP_CREATED = 1,
  USER_CHANGED_RSVP = 2,
  USER_CREATED_POLL = 3,
  USER_VOTED_ON_POLL = 4
}
```

### _Application Events_ Table

| A User (Event Name) | Payload |
| ------------------------- | ------------------------------- |
| *connected* | [User Connected Payload](#user-connected-payload) |
| *disconnected* | [User Connected Payload](#user-disconnected-payload) |

```typescript
enum ApplicationEventEnum {
  USER_CONNECTED = 1,
  USER_DISCONNECTED = 2
}
```
### Payloads

#### Send Message Payload

- senderId: string
- roomId: string
- content: string

#### Invite User To Room Payload

- userId: string;
- inviteeId: string;
- roomId: string;
#### User left Room Payload

- userId: string;
- roomId: string;
#### User Created Room Payload
  - userId: string;
  - roomName: string;
  - userIds: string[];
#### User Closed Room Payload
  - userId: string
  - roomId: string
  - timestamp: Date
#### User Connected Payload
  - userId: string
#### User Disconnected Payload
  - userId: string
#### User Created Meetup Payload
  - userId: string
  - name: string
  - attendees: string array
  - location: string
  - organizerId: string
  - takesPlaceOn: Date

#### User Changed Rsvp Payload
  - userId: string
  - meetupId: string
  - rsvp: number
#### User Created Poll Payload
  - userId: string,
  - meetupId: string,
  - description: string,
  - pollChoices: string[]
#### User Cast Poll Vote Payload
  - userId: string
  - pollId: string
  - pollChoiceIndex: number
