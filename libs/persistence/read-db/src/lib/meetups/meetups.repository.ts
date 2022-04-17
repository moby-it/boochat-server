import {
  CreateMeetupDto,
  CreatePollDto,
  MeetupId,
  PollId,
  PollStatusEnum,
  Rsvp,
  UserId
} from '@boochat/domain';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { READ_DB_CONNECTION_NAME } from '../common';
import { Meetup, MeetupDocument } from './meetup.schema';
import { Poll } from './polls';
@Injectable()
export class MeetupsRepository {
  private meetupModel: Model<MeetupDocument>;
  constructor(@InjectConnection(READ_DB_CONNECTION_NAME) connection: Connection) {
    this.meetupModel = connection.model(Meetup.name);
  }
  async createMeetup(dto: CreateMeetupDto) {
    const meetup = new this.meetupModel({
      ...dto,
      attendance: dto.attendeeIds.map((id) => {
        const rsvp = id === dto.organizerId ? Rsvp.Yes : Rsvp.NotResponded;
        return { userId: id, rsvp: rsvp };
      })
    });
    await meetup.save();
  }
  async findByUserId(userId: UserId): Promise<MeetupDocument[]> {
    return await this.meetupModel.find({ attendeeIds: [userId] }).exec();
  }
  async findById(meetupId: MeetupId): Promise<MeetupDocument | null> {
    return await this.meetupModel.findOne({ _id: meetupId }).populate('polls').populate('alerts').exec();
  }
  async voteOnPoll(userId: UserId, pollId: PollId, meetupId: MeetupId, choiceIndex: number) {
    await this.meetupModel.updateOne(
      {
        _id: meetupId,
        'polls._id': pollId
      },
      {
        $push: { 'polls.$.votes': { userId, choiceIndex } }
      }
    );
  }
  async changeRsvp(userId: UserId, meetupId: MeetupId, rsvp: Rsvp) {
    await this.meetupModel.updateOne(
      { _id: meetupId, 'attendance.userId': userId },
      { $set: { 'attendance.$.rsvp': rsvp } }
    );
  }
  async createPoll(dto: CreatePollDto) {
    const poll: Partial<Poll> = {
      _id: dto._id,
      type: dto.pollType,
      creatorId: dto.userId,
      description: dto.description,
      pollChoices: dto.pollChoices,
      votes: [],
      status: PollStatusEnum.ACTIVE,
      participantIds: dto.participantIds
    };
    await this.meetupModel.updateOne(
      { _id: dto.meetupId },
      {
        $push: { polls: poll }
      }
    );
  }
  async closePoll(meetupId: MeetupId, pollId: PollId) {
    await this.meetupModel.updateOne(
      { _id: meetupId, 'polls._id': pollId },
      {
        $set: { 'polls.$.status': PollStatusEnum.CLOSED }
      }
    );
  }
}
