import { MeetupAlertEnum } from '@boochat/domain';
export interface MeetupAlert {
  type: MeetupAlertEnum;
  payload: unknown;
}
