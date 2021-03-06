export enum MeetupEventEnum {
  MEETUP_CREATED = 1,
  USER_CHANGED_RSVP,
  USER_CREATED_POLL,
  USER_VOTED_ON_POLL,
  USER_CHANGED_MEETUP_IMAGE,
  POLL_CLOSED
}
export type MeetupEventType = keyof typeof MeetupEventEnum;
