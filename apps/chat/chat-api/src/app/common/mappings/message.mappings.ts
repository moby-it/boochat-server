import { GoogleId, Message, Room, User } from '@oursocial/domain';
import { DbMessage, MessageDto, PopulatedMessage } from '@oursocial/persistence';
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
export function dbMessageDocumentToMessage(dbMessage: MessageDto): Message {
  if (!dbMessage.id) throw new Error('cannot convert dbMessage to message with no id');
  const message = Message.create({
    content: dbMessage.content,
    dateSent: dbMessage.createdAt,
    sender: { id: dbMessage.senderId },
    room: { id: dbMessage.roomId }
  }, dbMessage.id);
  return message;
}
