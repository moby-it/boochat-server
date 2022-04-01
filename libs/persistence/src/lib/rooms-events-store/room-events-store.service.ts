import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { EVENTS_STORE_DB_CONNECTION_NAME } from '../common';
import { EventsStoreService } from '../common/events-store.service';
import { RoomEvent, RoomEventDocument } from './room-events.schema';

@Injectable()
export class RoomEventsStoreService extends EventsStoreService<RoomEventDocument> {
  constructor(@InjectConnection(EVENTS_STORE_DB_CONNECTION_NAME) connection: Connection) {
    super(connection, RoomEvent.name);
  }
}
