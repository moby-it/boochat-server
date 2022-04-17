export interface AlertDto {
  type: AlertEnum;
}
import { ValueObject } from '../../common';

export enum AlertEnum {
  PENDING_POLL,
  PENDING_RESCHEDULE_POLL,
  PENDING_RELOCATION_POLL
}
interface AlertProps {
  type: AlertEnum;
  payload: unknown;
}
export class Alert extends ValueObject<AlertProps> {
  constructor(props: AlertProps) {
    super(props);
  }
  public get type() {
    return this._props.type;
  }
  public get payload() {
    return this._props.payload;
  }
}
