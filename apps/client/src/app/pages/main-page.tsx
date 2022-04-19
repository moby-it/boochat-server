import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ActiveRoomContainer from '../components/active-room/active-room-container';
import MeetupsContainer from '../components/meetups/meetups-container';
import RoomListContainer from '../components/room-list/room-list-container';
import Sidenav from '../components/sidenav';
import { SocketManager } from '../shared/socket-manager';
import { selectToken } from '../store/auth/auth.reducer';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export function MainPage() {
  const token = useAppSelector(selectToken);
  const navitate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!token) {
      navitate('/login');
      return;
    } else {
      SocketManager.initializeSocketManager(dispatch, token);
    }
  }, [token, navitate, dispatch]);
  return (
    <>
      <Sidenav />
      <div className="main-container">
        <RoomListContainer />
        <ActiveRoomContainer />
        <MeetupsContainer />
      </div>
    </>
  );
}
export default MainPage;
