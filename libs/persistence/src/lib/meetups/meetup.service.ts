import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from 'mongoose';
import { Attendee, AttendeeDtoToAttendee } from "./attendee";
import { CreateMeetupDto, MeetupDto, UpdateMeetupDto, validateCreateDto, validateUpdateDto } from "./meetup.dto";
import { Meetup } from "./meetup.schema";
@Injectable()
export class MeetupPersistenceService {
  constructor(@InjectModel(Meetup.name) private meetupModel: Model<Meetup>) { }
  async create(meetupDto: CreateMeetupDto): Promise<MeetupDto> {
    validateCreateDto(meetupDto);
    const { name, attendees, organizer, takesPlaceOn } = meetupDto;
    const createdMeetup = new this.meetupModel({
      name,
      organizer: new Types.ObjectId(organizer),
      takesPlaceOn,
      attendees: AttendeeDtoToAttendee(attendees),
      room: new Types.ObjectId(meetupDto.room),
    });
    await createdMeetup.save();
    return {
      ...meetupDto,
      id: createdMeetup._id.toString()
    };
  }
  async updateOne(meetupDto: UpdateMeetupDto): Promise<string> {
    validateUpdateDto(meetupDto);
    const { name, takesPlaceOn, id } = meetupDto;
    const attendees = AttendeeDtoToAttendee(meetupDto.attendees);
    const organizer = new Types.ObjectId(meetupDto.organizer);
    const room = new Types.ObjectId(meetupDto.room);
    const result = await this.meetupModel.updateOne({ _id: new Types.ObjectId(id) }, { name, attendees, organizer, takesPlaceOn, room });
    return result.upsertedId.toJSON();
  }
}
