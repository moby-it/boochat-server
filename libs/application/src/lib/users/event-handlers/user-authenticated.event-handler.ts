import { UserAuthenticatedEvent } from '@boochat/domain';
import { UserRepository } from '@boochat/persistence/read-db';
import { QuerySocketEventsEnum } from '@boochat/shared';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { transformToPlain, WsServer } from '../../common';
import { Mapper } from '../../mapper';

@EventsHandler(UserAuthenticatedEvent)
export class UserAuthenticatedEventHandler implements IEventHandler<UserAuthenticatedEvent> {
  constructor(private repository: UserRepository, private mapper: Mapper) {}
  async handle(event: UserAuthenticatedEvent) {
    let userDocument = await this.repository.findById(event.userId);
    if (!userDocument) {
      userDocument = await this.repository.create({
        id: event.userId,
        email: event.email,
        imageUrl: event.imageUrl,
        name: event.name
      });
      const allUserDocuments = await this.repository.findAll();
      const allUsers = this.mapper.user.fromDocuments.ToUsers(allUserDocuments);
      WsServer.emitToAll(QuerySocketEventsEnum.ALL_USERS, transformToPlain(allUsers));
    }
  }
}
