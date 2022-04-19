import { useAppSelector } from '../../store/hooks';
import { selectRoomList } from '../../store/room-list/room-list.reducer';
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
