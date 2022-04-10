import { ValueObject } from '../common';

export enum RoomAlertEnum {
  PENDING_POLL,
  PENDING_RESCHEDULE_POLL,
  PENDING_RELOCATION_POLL
}
export enum RoomAlertStatus {
  INACTIVE,
  ACTIVE
}
interface RoomAlertProps {
  type: RoomAlertEnum;
  status: RoomAlertStatus;
  payload: unknown;
}
export class RoomAlert extends ValueObject<RoomAlertProps> {
  constructor(props: RoomAlertProps) {
    super(props);
  }
  public get type() {
    return this._props.type;
  }
  public get status() {
    return this._props.status;
  }
  public get payload() {
    return this._props.payload;
  }
}
