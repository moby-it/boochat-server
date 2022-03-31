import { Document, Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { BaseEvent } from '@oursocial/domain';
export abstract class EventsStoreService<T extends Document> {
  protected abstract storeModel: Model<T>;
  async create(dto: BaseEvent) {
    const storeEntry = new this.storeModel({
      id: uuid(),
      ...dto
    });
    await storeEntry.save();
  }
};
