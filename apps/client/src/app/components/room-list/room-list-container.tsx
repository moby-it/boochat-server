import { v4 as uuid } from 'uuid';
import { selectRoomList, useAppSelector } from '../../store';
import CreateRoomForm from './create-room';
import './room-list.css';
import RoomSlot from './room-slot';
export function RoomListContainer() {
  const rooms = useAppSelector(selectRoomList);
  return (
    <div className="room-list-window">
      <CreateRoomForm />
      <div className="room-list-nav"></div>
      <div className="room-list">
        {rooms.map((room) => (
          <RoomSlot room={room} key={room.id + room.items[0]?.id ?? uuid()} />
        ))}
      </div>
    </div>
  );
}
export default RoomListContainer;
