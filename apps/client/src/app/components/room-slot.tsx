import { Room } from '@boochat/domain';
interface RoomSlotProps {
  room: Room;
}
export function RoomSlot(props: RoomSlotProps) {
  const { room } = props;
  return (
    <div className="room-slot">
      <div className="avatar">
        <img alt="profile" src={room.imageUrl} className="avatar-md" />
        <span hidden className="active-user"></span>
      </div>
      <div className="room-slot-txt">
        <div>{room.name}</div>
        <div>{room.items[0]}</div>
      </div>
    </div>
  );
}
export default RoomSlot;
