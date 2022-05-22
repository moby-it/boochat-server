import { MeetupId, Poll, PollVote } from '@boochat/domain';
import { PollDocument } from '@boochat/persistence/read-db';

export function fromDocumentToEntity(document: PollDocument, meetupId: MeetupId): Poll {
  const props = {
    creatorId: document.creatorId,
    dateCreated: document.createdAt,
    description: document.description,
    meetupId,
    participantIds: document.participantIds,
    pollChoices: document.pollChoices,
    status: document.status,
    type: document.type,
    votes: document.votes.map(
      (vote) => new PollVote({ pollId: document.id, userId: vote.userId, choiceIndex: vote.choiceIndex })
    )
  };
  return Poll.create(props, document._id);
}

export function fromDocumentsToEntities(documents: PollDocument[], meetupsId: MeetupId): Poll[] {
  return documents.map((document) => fromDocumentToEntity(document, meetupsId));
}
