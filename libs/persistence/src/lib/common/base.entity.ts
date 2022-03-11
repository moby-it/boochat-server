import { Prop } from "@nestjs/mongoose";
export abstract class BaseDbEntity {

  @Prop({ default: Date.now() })
  timestamp: Date;

}
