import { GoogleId, Message, Room, User } from '@oursocial/domain';
import { PopulatedMessageDocument } from 'libs/persistence/src/lib/chat/messages/message.schema';
export function dbMessageToMessage(dbMessage: PopulatedMessageDocument): Message {
  const message = Message.create({
    content: dbMessage.content,
    dateSent: dbMessage.createdAt,
    sender: User.create({
      googleId: GoogleId.create({ id: dbMessage.sender.googleId }),
      name: dbMessage.sender.name
    }, dbMessage.sender.id),
    room: Room.create({
      name: dbMessage.room.name,
      messages: [],
      users: []
    }, dbMessage.room.id)
  }, dbMessage.id);
  return message;
}
