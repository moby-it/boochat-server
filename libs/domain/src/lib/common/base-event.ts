import { IEvent } from '@nestjs/cqrs';

export interface BaseEvent extends IEvent {
  // readonly correlationId: string;
  readonly type: number;
  readonly userId: string;
  readonly createdAt: Date;
}
