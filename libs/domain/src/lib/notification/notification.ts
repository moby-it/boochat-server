import { ValueObject } from '../common';
export enum NotificationType {
  INFO,
  WARN,
  ERROR
}
interface NotificationProps {
  type: NotificationType;
  timestamp: Date;
  content: string;
}
export class Notification extends ValueObject<NotificationProps> {
  constructor(props: NotificationProps) {
    super(props);
  }
}
