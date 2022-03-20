import { Entity, Guard } from "../../common";
import { Room } from '../room';
import { User } from "../../user";
import { Expose } from 'class-transformer';
interface MessageProps {
  readonly sender: Partial<User>;
  readonly content: string;
  readonly dateSent: Date;
  readonly room: Partial<Room>;
}
export class Message extends Entity<MessageProps>{
  @Expose()
  get id() {
    return this._id;
  }
  @Expose()
  get sender() {
    return this._props.sender;
  }

  @Expose()
  get content() {
    return this._props.content;
  }

  @Expose()
  get dateSent() {
    return this._props.dateSent;
  }

  @Expose()
  get room() {
    return this._props.room;
  }
  private constructor(props: MessageProps, id: string) {
    super(props, id);
  }

  public static create(props: MessageProps, id: string) {
    Guard.AgainstNullOrUndefined([
      { propName: 'sender.id', value: props.sender.id },
      { propName: 'content', value: props.content },
      { propName: 'room.id', value: props.room.id },
    ]);
    return new Message({ ...props }, id);
  }
}
