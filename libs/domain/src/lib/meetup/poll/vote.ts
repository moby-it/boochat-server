import { PollId, UserId, ValueObject } from '../../common';

interface PollVoteProps {
  userId: UserId;
  choiceIndex: number;
  pollId: PollId;
}
export class PollVote extends ValueObject<PollVoteProps> implements Record<string, unknown> {
  constructor(props: PollVoteProps) {
    super(props);
  }
  [x: string]: unknown;
}
