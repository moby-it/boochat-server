import { useAppSelector, selectRoomList } from '../../store';
import { RoomList } from './room-list';
import './room-list.css';
export function RoomListContainer() {
  const rooms = useAppSelector(selectRoomList);
  return (
    <div className="room-list-window">
      <div className="room-list-nav"></div>
      <RoomList rooms={rooms} />
    </div>
  );
}
export default RoomListContainer;
