export enum UserEventEnum {
  USER_AUTHENTICATED,
  USER_UPDATED
}
export type UserEventType = keyof typeof UserEventEnum;
