import { BaseEvent } from '@boochat/domain';
import { Injectable } from '@nestjs/common';
import { Connection, Document, Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
@Injectable()
export abstract class EventsStoreService<T extends Document> {
  protected storeModel: Model<T>;
  constructor(connection: Connection, modelName: string) {
    this.storeModel = connection.model(modelName);
  }
  async create(dto: BaseEvent) {
    const storeEntry = new this.storeModel({
      _id: uuid(),
      ...dto
    });
    await storeEntry.save();
  }
}
