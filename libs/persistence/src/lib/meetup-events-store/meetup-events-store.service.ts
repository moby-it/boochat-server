import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventsStoreService } from '../common/events-store.service';
import {
  MeetupEventDocument,
  MEETUP_EVENTS_COLLECTION_NAME,
} from './meetup-events.schema';

@Injectable()
export class MeetupEventStoreService extends EventsStoreService<MeetupEventDocument> {
  constructor(
    @InjectModel(MEETUP_EVENTS_COLLECTION_NAME)
    protected override storeModel: Model<MeetupEventDocument>
  ) {
    super();
  }
}
