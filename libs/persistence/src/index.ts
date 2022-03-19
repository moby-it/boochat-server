import { MessageDto, MessagePersistenceService, MessageWithRoomDto, PopulatedMessage, shouldCreateRoom } from './lib/messages';
import { LastRoomVisitDto, RoomDto, RoomsPersistenceService } from './lib/rooms';
import { UserRoomVisitPersistenceService } from './lib/userRoomVisit';
import { UserDto, UserPersistenceService } from './lib/users';

export { Message as DbMessage } from './lib/messages/message.schema';
export * from './lib/persistence.module';
export { Room as DbRoom } from './lib/rooms/room.schema';
export { UserRoomVisit as DbUserRoomVisit } from './lib/userRoomVisit/userRoomVisit.schema';
export { ActiveUsersStore } from './lib/users';
export { User as DbUser } from './lib/users/user.schema';
export { UserPersistenceService, RoomsPersistenceService, MessagePersistenceService, UserRoomVisitPersistenceService };
export { MessageDto, RoomDto, MessageWithRoomDto, LastRoomVisitDto, UserDto, PopulatedMessage };
export { shouldCreateRoom };

