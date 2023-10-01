# Project Description

Boochat is a chat and meetups application developed as a hobby for my friends. This repository refers to the server implementation monorepo. For the ui repository check [here](https://github.com/moby-it/boochat-ui)
The project is inspired by ideas from [Event-driven Architecture](https://en.wikipedia.org/wiki/Event-driven_architecture) and [Event Sourcing](https://martinfowler.com/eaaDev/EventSourcing.html).

# How to run

1. Make sure you have docker installed on your machine, with docker-compose. [Install guide](https://docs.docker.com/engine/)
2. Create two copies of the file `.env.example` and name them `.env` and `.local.env`. The local env file should have the variables that affect the local serve of the app. The already existing .docker.env file relates to the docker stack and its variables. Τhe `.env` file should have the variables that affect the release app. The .env.example file is a valid .docker.env file, so that should work out of the box.
3. The app has the potential serve push notifications to android devices leveraging Firebase Cloud messaging. Follow the instruction on how to set this up [here](https://firebase.google.com/docs/admin/setup) and remember to update the respective .env files with `GOOGLE_APPLICATION_CREDENTIALS`. If you just want to run on web, don't worry this step is not mandatory.
4. Run `docker-compose up -d` inside the root directory of the project.
5. For watching logs, run `docker-compose logs --follow`

You should a working local version of the whole stack.

# Technology Stack

## Backend

1.  [NestJs](https://docs.nestjs.com/) - Opinionated Node.js framework for building server-side applications.
2.  [MongoDB](https://www.mongodb.com/) - Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas.
3.  [RabbitMQ](https://www.rabbitmq.com/) - RabbitMQ is the most widely deployed open source message broker.

# Workflow

[Workflow diagram](https://drive.google.com/file/d/1XJzlzoQUj-PqQLEX88pa8PiPA7PyO-d4/view?usp=sharing)

# Domain structure

Following Domain-Driven-Design principles, there will be a description of the entities, events, commands and queries.

- **Everything in Bold reffers to Entities**
- _Everything in Italic reffers to Events_

## Entities

### User

A **User** is anyone who interacts with the UI of the app.

#### User Properties:

- id: string (got from Google Authentication)
- name: string
- imageUrl: string

### Room

The room is the actual chat room in which people exchange **Messages**. A room has participats(in the form of **Users**) that might change as time progresses, since **Users** get _Invited_ or _Leave_ Rooms.

#### Room Properties:

- name: string
- participants: **User** Array
- items: **RoomItem** Array
- imageUrl: string

### Room Item

A **RoomItem** encapsulates two entities, **Messages** and **Announcements**. **Announcements** are stuff like "User left a room", "User was invited to a room", "User created a poll". **Messages** are typical data sent by a specific user. **Announcements** are sent by the system and that's their core difference.

### Message

This is probably the most business important entity of the system even though it's contents are self-explained.

#### Message Properties:

- sender: **User**
- content: string
- dateSent: Date
- room: **Room**


### Announcement

- content: string
- timestamp: Date
- roomId: string

### Meetup

A **Meetup** describes a gathering to take place on a specific Date, by specific attendees, at a specific location. A **Meetup** is always related with a **Room**.

#### Meetup Properties:

- name :string
- organizer: **User**
- location: string
- attendants: **User** Array
- takesPlaceOn: Date
- room: **Room**
- polls: **Poll** array
- alert: **Alert** array

### Alert

An alert typically appears in a room window and it relates to its connected meetup. Below is the alert enum which will explain what an alert might be

#### Alert Enum

``` typescript
enum AlertEnum {
  PENDING_POLL,
  PENDING_RESCHEDULE_POLL,
  PENDING_RELOCATION_POLL
}
```
#### Alert Properties

type: AlertEnum
payload: unknown


### Poll

```typescript
enum PollTypeEnum {
  GENERIC_POLL,
  RESCHEDULE_POLL,
  RELOCATE_POLL
}
```

- participantIds: string array
- type: PollTypeEnum
- status: PollStatusEnum
- votes: **PollVote** array
- creatorId: string (user's google id)
- meetupId: string
- dateCreated: string
- description: string
- pollChoices: string array

### PollVote

A poll vote has to be an independent entity in the database because it triggers workflows. For example if a user casts the last poll vote, the poll might close.

- userId: string
- choiceIndex: number
- pollId: string

## _Events_

Every *Event* has a ```userId``` property and a ```type``` property. The ```type`` property is a enum lookup. Every event tends to have a userId since most events have a creator. A **Message**'s creator is the sender. An announcement's creator is kind of implied. For example when a **Room Announcenent** is created about a new user invitation, the creator is the inviter.

Events are seperated into three categories: 
1. Room Events
2. Meetup Events
3. User Events

 ### _Room Events_ Table

| Event Name | Payload |
| ------------------------- | ------------------------------- |
| ***Room** created* | [User Created Room Payload](#Room-Created-Payload) |
| ***Message** sent* | [Send Message Payload](#Message-Sent-Payload) |
| ***Announcement** Created *| [Announcement Created Payload](#Announcement-Created-Payload) |
| ***User** closed **Room*** | [User Closed Room Payload](#User-Closed-Room-payload) |
| ***User** invited **User** to room event* |[User Invited to Room](#User-Invited-To-Room-Payload) |
| ***User** left**Room*** | [User Left Room Paylod](#User-Left-Room-Payload) |



#### Room Events Enum
```typescript
enum RoomEventEnum {
  ROOM_CREATED = 1,
  USER_INVITED_ROOM,
  USER_LEFT_ROOM,
  USER_CLOSED_ROOM,
  USER_SENT_MESSAGE,
  ANNOUNCEMENT_CREATED
}
```

### _Meetup Events_ Table

| A User (Event Name) | Payload |
| ------------------------- | ------------------------------- |
|***User** created a **Meetup***|[User Created Meetup Payload](#user-created-meetup-payload)|
|*Poll closed*|[Poll Closed Payload](#poll-closed-payload) |
|*User Changed **Meetup** Image closed*|[User Changed Meetup Payload](#meetup-image-changed-payload) |
|***User** changed rsvp* | [User Changed Rsvp Payload](#rsvp-changed-payload)|
|*created Poll* | [User Created Poll Payload](#poll-created-payload)|
|*cast Poll vote* | [User Cast Poll Vote Payload](#poll-vote-payload)|

#### Meetup Events Enum

```typescript
enum MeetupEventEnum {
  MEETUP_CREATED = 1,
  USER_CHANGED_RSVP,
  USER_CREATED_POLL,
  USER_VOTED_ON_POLL,
  USER_CHANGED_MEETUP_IMAGE,
  POLL_CLOSED
}
```

### _User Events_ Table

| Event Name) | Payload |
| ------------------------- | ------------------------------- |
| *authenticated* | [User Authenticated Payload](#user-authenticated-payload) |
| *closed room* |[User Closed Room Payload](#user-closed-room-payload)

```typescript
enum ApplicationEventEnum {
  USER_CONNECTED = 1,
  USER_DISCONNECTED = 2
}
```
### Payloads

#### Room Created Payload
  - userId: string
  - roomName: string
  - userIds: string[]
  - imageUrl: string

#### Message Sent Payload

- senderId: string
- roomId: string
- content: string

#### Announcement Created Payload

- senderId: string
- roomId: string
- content: string


#### User Closed Room Payload
  - userId: string
  - roomId: string
  - timestamp: Date

#### User Invited To Room Payload

- userId: string;
- inviteeId: string;
- roomId: string;


#### User Left Room Payload

- userId: string;
- roomId: string;


#### User Authenticated Payload
  - userId: string
  - imageUrl: string
  - email: string // name should be inside .env for allowing users to auth to the app
  - name: string

#### User Closed Room Payload
  - userId: string
  - roomId: string
  - timestamp: Date


#### User Created Meetup Payload
  - userId: string
  - name: string
  - attendees: string array
  - location: string
  - organizerId: string
  - takesPlaceOn: Date
  - imageUrl: string
  - roomId: string


### Poll Closed Payload

- userId: string
- meetupId: string
- pollId:string

### Meetup Image Changed Payload

- userId: string
- meetupId: string
- pollId:string


### Poll Created Payload

-userId: string
- meetupId:string
- pollType: PoleTypeEnum
- description:string
- pollChoices: string array


#### Rsvp Changed Payload
  - userId: string
  - meetupId: string
  - rsvp: number
  - 
#### Poll Created Payload
  - userId: string,
  - meetupId: string,
  - pollType: PollType
  - description: string,
  - pollChoices: string[]


#### Poll Vote Payload
  - userId: string
  - pollId: string
  - pollChoiceIndex: number

# Rest Endpoints

Even though the application mainly works asynchronously via RabbitMQ and WebSockets, there some Rest Endpoints. 

- The main authentication endpoint resides in the command-api layer. The user grabs an encrypted JWT token that each service knows how to decode by sharing a secret. The encryption is done by the native nodjs encryption libraries.
- When a user clicks a room, the user gets all the roomItems of that specific room. This is an endpoint that resides in query-api.


# Development Roadmap

## 1. Create Command API

- [x] Create Persistence Layer
  - [x] Create Event Store 
- [x] Create Domain Events
- [x] Handle Domain Events in Application Layer
  - [x] Save events to Event Store
  - [x] Emit Event to Message Broker(RabbitMQ)

## 2. Create Query API

- [x] Create Persitence Layer
  - [x] Finalize Database Entities
  - [x] Create Database Architecture for saving denormalized events
- [x] Req/Res Layer
  - [x] Create Queries and Query Handlers
- [x] Web Socket Layer 
  - [x] Emit Web Socket messages after consuming events from Message Broker
