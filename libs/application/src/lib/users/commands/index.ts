import { AuthenticateCommandHandler } from './authenticate-user.command';

export { AuthenticateCommand, AuthenticateCommandResult } from './authenticate-user.command';
export const UserCommandHandlers = [AuthenticateCommandHandler];
