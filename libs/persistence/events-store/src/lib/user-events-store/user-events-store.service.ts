import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { EVENTS_STORE_DB_CONNECTION_NAME } from '../common';
import { EventsStoreService } from '../common/events-store.service';
import { UserEvent, UserEventDocument } from './user-events.schema';

@Injectable()
export class UserEventsStoreService extends EventsStoreService<UserEventDocument> {
  constructor(@InjectConnection(EVENTS_STORE_DB_CONNECTION_NAME) connection: Connection) {
    super(connection, UserEvent.name);
  }
}
