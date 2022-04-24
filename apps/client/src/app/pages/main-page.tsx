import { useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ActiveRoomContainer from '../components/active-room/active-room-container';
import MeetupsContainer from '../components/meetups/meetups-container';
import RoomListContainer from '../components/room-list/room-list-container';
import Sidenav from '../components/sidenav';
import SocketManager from '../data/socket-manager';
import { selectCurrentUser, selectToken } from '../store/auth/auth.reducer';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export function MainPage() {
  const [loading, setLoading] = useState(true);
  const token = useAppSelector(selectToken);
  const currentUser = useAppSelector(selectCurrentUser);
  const navitate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (token && currentUser) {
      SocketManager.initializeSocketManager({ dispatch, token, currentUser });
      setLoading(false);
    }
  }, [token, navitate, dispatch, currentUser]);
  if (loading) return <ContentLoader />;
  return (
    <>
      <Sidenav />
      <div className="main-container">
        <RoomListContainer />
        <Routes>
          <Route path="/room/:roomId" element={<ActiveRoomContainer />} />
          <Route
            path="*"
            element={
              <div className="room-window">
                <h2>No Room Selected</h2>
              </div>
            }
          />
        </Routes>
        <MeetupsContainer />
      </div>
    </>
  );
}
export default MainPage;
