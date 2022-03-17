import { MessageDto, MessagePersistenceService, shouldCreateRoom, PopulatedMessage } from './lib/messages';
import { RoomDto, RoomsPersistenceService, LastRoomVisitDto } from './lib/rooms';
import { UserRoomVisitPersistenceService } from './lib/userRoomVisit';
import { UserDto, UserPersistenceService } from './lib/users';

export * from './lib/persistence.module';
export { ActiveUsersStore } from './lib/users';
export { UserPersistenceService, RoomsPersistenceService, MessagePersistenceService, UserRoomVisitPersistenceService };
export { Message as DbMessage } from './lib/messages/message.schema';
export { Room as DbRoom } from './lib/rooms/room.schema';
export { User as DbUser } from './lib/users/user.schema';
export { UserRoomVisit as DbUserRoomVisit } from './lib/userRoomVisit/userRoomVisit.schema';
export { MessageDto, RoomDto, LastRoomVisitDto, UserDto, PopulatedMessage };
export { shouldCreateRoom };
