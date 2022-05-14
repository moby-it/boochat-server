import { Expose } from 'class-transformer';
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
  navigateUrl: string;
}
export class Notification extends ValueObject<NotificationProps> {
  constructor(props: NotificationProps) {
    super(props);
  }
  @Expose()
  get title() {
    return this._props.title;
  }
  @Expose()
  get message() {
    return this._props.message;
  }
  @Expose()
  get timestamp() {
    return this._props.timestamp;
  }
  @Expose()
  get type() {
    return this._props.type;
  }
  @Expose()
  get navigateUrl() {
    return this._props.navigateUrl;
  }
  static createError(title: string, message: string) {
    return new Notification({
      title,
      message,
      timestamp: new Date(),
      type: NotificationType.ERROR,
      navigateUrl: ''
    });
  }
  static createWarning(title: string, message: string) {
    return new Notification({
      title,
      message,
      timestamp: new Date(),
      type: NotificationType.WARN,
      navigateUrl: ''
    });
  }
  static createInfo(title: string, message: string, navigateUrl = '') {
    return new Notification({
      title,
      message,
      timestamp: new Date(),
      type: NotificationType.INFO,
      navigateUrl
    });
  }
  toFirebaseNotification(): Record<string, string> {
    return {
      title: this.title,
      message: this.message,
      timestamp: this.timestamp.toDateString(),
      type: this.type.toString()
    };
  }
}
