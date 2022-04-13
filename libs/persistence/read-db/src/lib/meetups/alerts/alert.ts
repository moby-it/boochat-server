import { AlertEnum } from '@boochat/domain';
import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type AlertDocument = Alert & Document;

@Schema({ strict: false })
export class Alert {
  @Prop({ type: Number })
  type!: AlertEnum;
}
