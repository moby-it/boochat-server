import { Room } from '@boochat/domain';
import RoomSlot from './room-slot';

interface RoomListProps {
  rooms: Room[];
}
export function RoomList(props: RoomListProps) {
  return (
    <div className="room-list">
      {props.rooms.map((room) => (
        <RoomSlot room={room} key={room.id} />
      ))}
    </div>
  );
}
export default RoomList;
