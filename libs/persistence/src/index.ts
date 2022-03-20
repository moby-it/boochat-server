import { MessageDto, MessagePersistenceService, MessageWithRoomDto, PopulatedMessageDto, shouldCreateRoom } from './lib/messages';
import { LastRoomVisitDto, RoomDto, RoomsPersistenceService } from './lib/rooms';
import { EventLogPersistenceService } from './lib/event-log';
import { UserDto, UserPersistenceService } from './lib/users';

export { Message as DbMessage } from './lib/messages/message.schema';
export * from './lib/persistence.module';
export { Room as DbRoom } from './lib/rooms/room.schema';
export { ActiveUsersStore } from './lib/users';
export { User as DbUser } from './lib/users/user.schema';
export { UserPersistenceService, RoomsPersistenceService, MessagePersistenceService, EventLogPersistenceService as UserRoomVisitPersistenceService };
export { MessageDto, RoomDto, MessageWithRoomDto, LastRoomVisitDto, UserDto, PopulatedMessageDto };
export { shouldCreateRoom };

