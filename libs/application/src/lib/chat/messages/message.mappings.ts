import { Message } from '@oursocial/domain';
import { MessageDto } from '@oursocial/persistence';

export function MessageDtoToMessage(dbMessage: MessageDto): Message {
  if (!dbMessage.id) throw new Error('cannot convert dbMessage to message with no id');
  const message = Message.create({
    content: dbMessage.content,
    dateSent: dbMessage.createdAt,
    sender: { id: dbMessage.senderId },
    room: { id: dbMessage.roomId }
  }, dbMessage.id);
  return message;
}
