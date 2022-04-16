import { CreateMeetupDto, CreatePollDto, MeetupId, PollId, Rsvp, UserId } from '@boochat/domain';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { READ_DB_CONNECTION_NAME } from '../common';
import { Meetup, MeetupDocument } from './meetup.schema';
import { Poll, PollDocument } from './polls';
@Injectable()
export class MeetupsRepository {
  private meetupModel: Model<MeetupDocument>;
  constructor(@InjectConnection(READ_DB_CONNECTION_NAME) connection: Connection) {
    this.meetupModel = connection.model(Meetup.name);
  }
  async createMeetup(dto: CreateMeetupDto) {
    const meetup = new this.meetupModel({
      ...dto,
      attendance: dto.attendeeIds.map((id) => ({ userId: id, rsvp: Rsvp.NotResponded }))
    });
    await meetup.save();
  }
  async findByUserId(userId: UserId): Promise<MeetupDocument[]> {
    return await this.meetupModel.find({ attendeeIds: [userId] }).exec();
  }
  async findById(meetupId: MeetupId): Promise<MeetupDocument | null> {
    return await this.meetupModel.findOne({ _id: meetupId }).exec();
  }
  async voteOnPoll(userId: UserId, pollId: PollId, choiceIndex: number) {
    await this.meetupModel.updateOne(
      { polls: { id: pollId } },
      { polls: { votes: { $push: { userId, choiceIndex } } } }
    );
  }
  async changeRsvp(userId: UserId, meetupId: MeetupId, rsvp: Rsvp) {
    await this.meetupModel.updateOne(
      { id: meetupId, 'attendance.userId': userId },
      { $set: { 'attendance.$.rsvp': rsvp } }
    );
  }
  async createPoll(dto: CreatePollDto) {
    const poll: Partial<Poll> = {
      _id: dto._id,
      type: dto.pollType,
      participantIds: dto.participantIds,
      creatorId: dto.userId,
      description: dto.description,
      pollChoices: dto.pollChoices
    };
    await this.meetupModel.updateOne(
      { id: dto.meetupId },
      {
        polls: {
          $push: poll
        }
      }
    );
  }
}
