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
  title: string;
}
export class Notification extends ValueObject<NotificationProps> {
  constructor(props: NotificationProps) {
    super(props);
  }
  static createError(title: string, message: string) {
    return new Notification({ title, message, timestamp: new Date(), type: NotificationType.ERROR });
  }
  static createWarning(title: string, message: string) {
    return new Notification({ title, message, timestamp: new Date(), type: NotificationType.WARN });
  }
  static createInfo(title: string, message: string) {
    return new Notification({ title, message, timestamp: new Date(), type: NotificationType.INFO });
  }
}
