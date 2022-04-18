import ContentLoader from 'react-content-loader';
import { RoomList } from './room-list';
import './room-list.css';
export function RoomListContainer() {
  const loading = true;
  return (
    <div className="room-list-window">
      <div className="room-list-nav"></div>
      {loading ? <ContentLoader /> : <RoomList rooms={[]} />}
    </div>
  );
}
export default RoomListContainer;
