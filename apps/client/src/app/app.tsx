import './app.module.css';
import { Sidenav } from './sidenav/Sidenav';
import { RoomListContainer } from './rooms/room-list-container';
import { ActiveRoomContainer } from './active-room/active-room-container';
import { MeetupsContainer } from './meetups/meetups-container';
export function App() {
  return (
    <div className="app-shell">
      <Sidenav />
      <div className="main-container">
        <RoomListContainer />
        <ActiveRoomContainer />
        <MeetupsContainer />
      </div>
    </div>
  );
}

export default App;
