import { selectActiveRoom, selectRoomList, useAppSelector } from '../../store';
import './room-list.css';
import RoomSlot from './room-slot';
export function RoomListContainer() {
  const rooms = useAppSelector(selectRoomList);
  return (
    <div className="room-list-window">
      <div className="room-list-nav"></div>
      <div className="room-list">
        {rooms.map((room) => (
          <RoomSlot room={room} key={room.id} />
        ))}
      </div>
    </div>
  );
}
export default RoomListContainer;
