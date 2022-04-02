export interface CreatePollDto {
  id: string;
  userId: string;
  description: string;
  pollChoices: string[];
  meetupId: string;
}
