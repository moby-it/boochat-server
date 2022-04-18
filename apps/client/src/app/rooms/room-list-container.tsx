import './room-list.css';
import { RoomList } from './room-list';
export function RoomListContainer() {
  return (
    <div className="room-list-window">
      <div className="room-list-nav"></div>
      <RoomList />
    </div>
  );
}
export default RoomListContainer;
