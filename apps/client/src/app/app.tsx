import { useEffect, useRef, useState } from 'react';
import ContentLoader from 'react-content-loader';
import { io, Socket } from 'socket.io-client';
import { environment } from '../environments/environment';
import { ActiveRoomContainer } from './active-room/active-room-container';
import './app.module.css';
import Login from './login/login';
import { MeetupsContainer } from './meetups/meetups-container';
import { RoomListContainer } from './rooms/room-list-container';
import { Sidenav } from './sidenav/Sidenav';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhmYWU2ZDQzLWEyNDgtNGIwNS1hZDdhLTBkZTM3N2VjYTA4MiIsImdvb2dsZUlkIjoiZ2V5dWlzZWZ5dWlzZWZpb3JnaW8iLCJuYW1lIjoieXVpc2VmIiwiaW1hZ2VVcmwiOiJodHRwczovL2kxLnNuZGNkbi5jb20vYXJ0d29ya3MtWTJIMGkwaXY2ekdMY0UwNC1rdTcwSkEtdDUwMHg1MDAuanBnIiwiaWF0IjoxNjUwMjg4OTg4LCJleHAiOjE2NTAzMDMzODh9.YSpFTiw2Cu6EoEMrxVJzspaQJ1eqxLSEem7aZqhJ6yg';
export function App() {
  const [isLoggedIn, logIn] = useState(false);
  const [connected, connect] = useState(false);

  useEffect(() => {
    commandSocket = io(environment.commandApiUrl, {
      extraHeaders: {
        authorization: ''
      }
    }).connect();
    querySocket = io(environment.queryApiUrl + `?token=${token}`, {
      transports: ['websocket']
    }).connect();
    // querySocket.on('ALL_USERS', (users) => {
    //   console.log(users);
    // });
  }, []);
  if (!isLoggedIn) return <Login />;
  if (!connected) return <ContentLoader />;
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
