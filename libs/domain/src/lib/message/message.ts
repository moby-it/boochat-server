import { v4 as uuid } from 'uuid';
import { Entity, Guard } from "../common";
import { User } from "../user";
interface MessageProps {
  readonly sender: User;
  readonly receiver: User;
  readonly content: string;
  readonly dateSent: Date;
  dateRead: Date | undefined;
  readonly roomId: string;
}
export class Message extends Entity<MessageProps>{

  private constructor(props: MessageProps, id: string) {
    super(props, id);
  }
  setRead() {
    this.props.dateRead = new Date();
  }
  public static create(props: MessageProps) {
    Guard.AgainstNullOrUndefined([
      { propName: 'sender', value: props.sender },
      { propName: 'receiver', value: props.receiver },
      { propName: 'roomId', value: props.roomId },
    ]);
    return new Message({ ...props, dateSent: new Date() }, uuid());
  }
}
