import { IEvent } from "@nestjs/cqrs";

export interface BaseEvent extends IEvent {
  type: number;
  name: string;
  userId: string;
  createdAt: Date;
}
