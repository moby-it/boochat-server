import ActiveRoomContainer from '../components/active-room-container';
import MeetupsContainer from '../components/meetups-container';
import RoomListContainer from '../components/room-list-container';

export function MainContainer() {
  return (
    <>
      <RoomListContainer />
      <ActiveRoomContainer />
      <MeetupsContainer />
    </>
  );
}
