import { MeetupAlertEnum } from '@boochat/domain';
import { Prop, Schema } from '@nestjs/mongoose';
@Schema({ strict: false })
export class MeetupAlert {
  @Prop({ type: Number })
  type!: MeetupAlertEnum;
}
