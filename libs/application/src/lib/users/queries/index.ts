import { GetUserByIdQueryHandler } from './get-user-by-id.query';
import { GetUsersQueryHandler } from './get-users.query';
export * from './get-user-by-id.query';
export * from './get-users.query';
export const UserQueryHandlers = [GetUserByIdQueryHandler, GetUsersQueryHandler];
