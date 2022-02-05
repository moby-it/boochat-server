export class Message {
  readonly sender: string;
  readonly receiver: string;
  readonly content: string;
  readonly dateSent: Date;
  dateRead: Date | undefined;

  constructor(sender: string, receiver: string, content: string, dateRead = undefined) {
    this.sender = sender;
    this.receiver = receiver;
    this.content = content;
    this.dateSent = new Date();
    this.dateRead = dateRead;
  }

  setRead() {
    this.dateRead = new Date();
  }
}
