import { Prop } from "@nestjs/mongoose";
export abstract class BaseEntity {
    @Prop({ default: Date.now() })
    timestamp: Date;

}