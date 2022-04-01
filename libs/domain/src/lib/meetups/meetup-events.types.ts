export enum MeetupEventEnum {
  MEETUP_CREATED = 1,
  USER_RSVP_CHANGED,
  USER_CREATED_POLL,
}
export type MeetupEventType = keyof typeof MeetupEventEnum;
