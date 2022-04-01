import { Document, Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { BaseEvent } from '@boochat/domain';
import { Injectable } from '@nestjs/common';
@Injectable()
export abstract class EventsStoreService<T extends Document> {
  protected abstract storeModel: Model<T>;
  async create(dto: BaseEvent) {
    const storeEntry = new this.storeModel({
      _id: uuid(),
      ...dto
    });
    await storeEntry.save();
  }
};
