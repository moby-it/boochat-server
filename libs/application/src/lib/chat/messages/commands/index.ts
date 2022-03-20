import { CreateMessageCommandHandler } from './create-message.command';
import { EmitMessageCommandHandler } from './emit-message.command';

export * from './create-message.command';
export * from './emit-message.command';
export const MessageCommandHandlers = [
  CreateMessageCommandHandler, EmitMessageCommandHandler
];
