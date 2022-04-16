import { Meetup } from '@boochat/domain';
import { MeetupDocument } from '@boochat/persistence/read-db';
import { fromDocumentsToEntities as convertAlerts } from './alert.mappings';
import { fromDocumentsToEntities as convertPolls } from './poll.mappings';
export function fromDocumentToEntity(document: MeetupDocument): Meetup {
  return Meetup.create(
    {
      name: document.name,
      location: document.location,
      organizer: { id: document.organizerId },
      takesPlaceOn: document.takesPlaceOn,
      alerts: convertAlerts(document.alerts),
      polls: convertPolls(document.polls, document.id),
      room: { id: document.roomId },
      attendants: document.attendeeIds.map((id) => ({ id }))
    },
    document._id
  );
}

export function fromDocumentsToEntities(documents: MeetupDocument[]): Meetup[] {
  return documents.map((document) => fromDocumentToEntity(document));
}
