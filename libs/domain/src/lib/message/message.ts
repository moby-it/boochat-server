import { Entity, Guard } from "../common";
import { Room } from '../room';
import { User } from "../user";
import { Expose } from 'class-transformer';
interface MessageProps {
  readonly sender: User;
  readonly content: string;
  readonly dateSent: Date;
  readonly room: Room;
}
export class Message extends Entity<MessageProps>{

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
      { propName: 'sender', value: props.sender },
      { propName: 'content', value: props.content },
      { propName: 'room', value: props.room },
    ]);
    return new Message({ ...props }, id);
  }
}
