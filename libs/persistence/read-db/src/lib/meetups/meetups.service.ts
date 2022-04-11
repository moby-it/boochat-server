import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { READ_DB_CONNECTION_NAME } from '../common';
import { Meetup, MeetupDocument } from './meetup.schema';
@Injectable()
export class MeetupService {
  private model: Model<MeetupDocument>;
  constructor(@InjectConnection(READ_DB_CONNECTION_NAME) private connection: Connection) {
    this.model = this.connection.model(Meetup.name);
  }
  async createMeetup() {
    throw new NotImplementedException();
  }
}
