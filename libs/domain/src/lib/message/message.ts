import { Entity, Guard } from "../common";
import { Room } from '../room';
import { User } from "../user";
interface MessageProps {
  readonly sender: User;
  readonly receiver: User;
  readonly content: string;
  readonly dateSent: Date;
  dateRead: Date | undefined;
  readonly room: Room;
}
export class Message extends Entity<MessageProps>{

  private constructor(props: MessageProps, id: string) {
    super(props, id);
  }
  setRead() {
    this.props.dateRead = new Date();
  }
  public static create(props: MessageProps, id: string) {
    Guard.AgainstNullOrUndefined([
      { propName: 'sender', value: props.sender },
      { propName: 'receiver', value: props.receiver },
      { propName: 'room', value: props.room },
    ]);
    return new Message({ ...props, dateSent: new Date() }, id);
  }
}
