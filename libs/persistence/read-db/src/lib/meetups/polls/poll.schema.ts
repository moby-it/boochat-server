import { PollStatusEnum, PollTypeEnum } from '@boochat/domain';
import { Prop, Schema } from '@nestjs/mongoose';
import { MongoEntity } from '../../common';

export interface PollVote {
  userId: string;
  pollId: string;
  choiceIndex: number;
}

@Schema({ timestamps: true })
export class Poll extends MongoEntity {
  @Prop({ type: Number })
  type!: PollTypeEnum;
  @Prop({ type: Number })
  status!: PollStatusEnum;
  @Prop({ default: [] })
  votes!: PollVote[];
  @Prop({ required: true })
  creatorId!: string;
  @Prop()
  description!: string;
  @Prop({ required: true })
  pollChoices!: string[];
}
