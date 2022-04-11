import { ValueObject } from '../common';

export enum MeetupAlertEnum {
  PENDING_POLL,
  PENDING_RESCHEDULE_POLL,
  PENDING_RELOCATION_POLL
}
interface MeetupAlertProps {
  type: MeetupAlertEnum;
  payload: unknown;
}
export class MeetupAlert extends ValueObject<MeetupAlertProps> {
  constructor(props: MeetupAlertProps) {
    super(props);
  }
  public get type() {
    return this._props.type;
  }
  public get payload() {
    return this._props.payload;
  }
}
