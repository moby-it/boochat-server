export interface CreateMessageDto {
  _id: string;
  senderId: string;
  roomId: string;
  content: string;
}
