import { Injectable } from '@nestjs/common';
import { MeetupsMappings } from '../meetups/mappings';
import { UserMappings } from '../users/mappings';
import { RoomMappings } from '../rooms/mappings';
@Injectable()
export class Mapper {
  user = {
    fromDocument: {
      ToUser: UserMappings.fromDocumentToEntity
    },
    fromDocuments: {
      ToUsers: UserMappings.fromDocumentsToEntities
    }
  };
  meetups = {
    fromDocument: {
      ToMeetup: MeetupsMappings.fromDocumentToEntity
    },
    fromDocuments: {
      ToMeetups: MeetupsMappings.fromDocumentsToEntities
    }
  };
  room = {
    fromDocument: {
      toRoomWithItems: RoomMappings.ToRoomWithItems
    },
    fromDocuments: {
      toRoomsWithLastItem: RoomMappings.ToRoomsWithLastItem
    }
  };
}
