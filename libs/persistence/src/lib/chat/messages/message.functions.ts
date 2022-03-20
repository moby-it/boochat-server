import { PopulatedMessageDto } from "./message.dto";
import { PopulatedDbMessage } from "./message.schema";

export function populatedMessageToMessageDto(populatedMessage: PopulatedDbMessage): PopulatedMessageDto {
  return {
    content: populatedMessage.content,
    createdAt: populatedMessage.createdAt,
    id: populatedMessage._id.toString(),
    room: {
      name: populatedMessage.room.name,
      id: populatedMessage.room._id.toString(),
      userIds: populatedMessage.room.users.map(u => u._id.toString())
    },
    sender: {
      googleId: populatedMessage.sender.googleId,
      name: populatedMessage.sender.name,
      id: populatedMessage.sender._id.toString()
    },
    roomId: populatedMessage.room._id.toString(),
    senderId: populatedMessage.sender._id.toString()
  };
}
