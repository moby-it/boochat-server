import { BaseEvent } from '../../../common';

export interface CreateMessageDto extends BaseEvent {
  senderId: string;
  roomId: string;
  content: string;
}
