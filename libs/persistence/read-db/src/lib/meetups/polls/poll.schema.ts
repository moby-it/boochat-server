import { PollStatusEnum, PollTypeEnum } from '@boochat/domain';
import { Prop, Schema } from '@nestjs/mongoose';
import { MongoEntity } from '../../common';
import { Types, Document } from 'mongoose';
export type PollDocument = Poll & Document;
export interface PollVote {
  userId: string;
  choiceIndex: number;
}

@Schema({ timestamps: true })
export class Poll extends MongoEntity {
  @Prop({ type: Number })
  type!: PollTypeEnum;
  @Prop({ type: Number })
  status!: PollStatusEnum;
  @Prop({ default: [], type: Types.Array })
  participantIds!: string[];
  @Prop({ required: true, type: Types.Array })
  votes!: PollVote[];
  @Prop({ default: [], required: true })
  creatorId!: string;
  @Prop()
  description!: string;
  @Prop({ required: true, type: Types.Array })
  pollChoices!: string[];
}
