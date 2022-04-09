import { BaseEvent } from '@boochat/domain';
import { Injectable } from '@nestjs/common';
import { Connection, Document, Model } from 'mongoose';
@Injectable()
export abstract class EventsStoreService<T extends Document> {
  protected storeModel: Model<T>;
  constructor(connection: Connection, modelName: string) {
    this.storeModel = connection.model(modelName);
  }
  async create(event: BaseEvent) {
    const storeEntry = new this.storeModel({
      ...event
    });
    await storeEntry.save();
  }
}
