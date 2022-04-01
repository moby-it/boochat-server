export enum MeetupEventEnum {
  MEETUP_CREATED = 1,
  USER_CHANGED_RSVP,
  USER_CREATED_POLL
}
export type MeetupEventType = keyof typeof MeetupEventEnum;
