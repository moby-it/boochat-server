export interface CreatePollDto {
  userId: string;
  description: string;
  pollChoices: string[];
  meetupId: string;
}
