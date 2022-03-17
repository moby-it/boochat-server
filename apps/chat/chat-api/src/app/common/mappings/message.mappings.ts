import { GoogleId, Message, Room, User } from '@oursocial/domain';
import { DbMessage, PopulatedMessage } from '@oursocial/persistence';
export function dbMessageToMessage(dbMessage: PopulatedMessage): Message {
  const message = Message.create({
    content: dbMessage.content,
    dateSent: dbMessage.createdAt,
    sender: User.create({
      googleId: GoogleId.create({ id: dbMessage.sender.googleId }),
      name: dbMessage.sender.name
    }),
    room: Room.create({
      name: dbMessage.room.name,
      messages: [],
      users: []
    }, dbMessage.room.id)
  }, dbMessage.id);
  return message;
}
export function dbMessageDocumentToMessage(dbMessage: DbMessage): Message {
  const message = Message.create({
    content: dbMessage.content,
    dateSent: dbMessage.createdAt,
    sender: { id: dbMessage.sender.toString() },
    room: { id: dbMessage.room.toString() }
  }, dbMessage.id);
  return message;
}
