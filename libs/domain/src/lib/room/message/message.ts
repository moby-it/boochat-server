import { Expose } from 'class-transformer';
import { Entity, Guard } from '../../common';
import { User } from '../../user';
import { Room } from '../room';
interface MessageProps {
  readonly sender: Partial<User> & Pick<User, 'id'>;
  readonly content: string;
  readonly dateSent: Date;
  readonly room: Partial<Room> & Pick<Room, 'id'>;
}
export class Message extends Entity<MessageProps> {
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
  get timestamp() {
    return this._props.dateSent;
  }

  @Expose()
  get roomId() {
    return this._props.room.id;
  }
  private constructor(props: MessageProps, id: string) {
    super(props, id);
  }

  public static create(props: MessageProps, id: string) {
    Guard.AgainstNullOrUndefined([
      { propName: 'sender.id', value: props.sender.id },
      { propName: 'content', value: props.content },
      { propName: 'room.id', value: props.room.id }
    ]);
    return new Message({ ...props }, id);
  }
}
