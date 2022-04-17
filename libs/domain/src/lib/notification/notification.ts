import { ValueObject } from '../common';
export enum NotificationType {
  INFO,
  WARN,
  ERROR
}
interface NotificationProps {
  type: NotificationType;
  timestamp: Date;
  message: string;
}
export class Notification extends ValueObject<NotificationProps> {
  constructor(props: NotificationProps) {
    super(props);
  }
  static createError(message: string) {
    return new Notification({ message, timestamp: new Date(), type: NotificationType.ERROR });
  }
  static createWarning(message: string) {
    return new Notification({ message, timestamp: new Date(), type: NotificationType.WARN });
  }
  static createInfo(message: string) {
    return new Notification({ message, timestamp: new Date(), type: NotificationType.INFO });
  }
}
