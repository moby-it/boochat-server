interface AnnouncementProps {
  content: string;
}
export function Announcement(props: AnnouncementProps) {
  return (
    <div className="announcement">
      <span>{props.content}</span>
    </div>
  );
}
