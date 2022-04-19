import { RoomAnnouncement } from '@boochat/domain';

interface AnnouncementProps {
  announcement: RoomAnnouncement;
}
export function Announcement(props: AnnouncementProps) {
  return (
    <div className="announcement">
      <span>{props.announcement.content}</span>
    </div>
  );
}
