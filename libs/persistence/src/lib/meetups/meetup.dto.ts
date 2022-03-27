import { Guard } from "@oursocial/domain";

export interface MeetupDto {
  id?: string;
  name: string;
  organizer: string;
  attendees: string[];
  takesPlaceOn: Date;
  room: string;
}
export interface CreateMeetupDto extends MeetupDto {

}
export interface UpdateMeetupDto extends Partial<MeetupDto> {

}

export function validateCreateDto(meetupDto: CreateMeetupDto): void {
  Guard.AgainstNullOrUndefined([{
    propName: 'name',
    value: meetupDto.name
  },
  {
    propName: 'organizer',
    value: meetupDto.organizer
  },
  {
    propName: 'takesPlaceOn',
    value: meetupDto.takesPlaceOn,
  }
  ]);
  Guard.AgainstEmptyArray({ value: meetupDto.attendees, propName: 'attendees' });
}
export function validateUpdateDto(meetupDto: UpdateMeetupDto) {
  Guard.AgainstNullOrUndefined([{
    propName: 'id',
    value: meetupDto.id
  }]);
}
