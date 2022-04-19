import { useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader';
import { io } from 'socket.io-client';
import { environment } from '../environments/environment';
import { Sidenav } from './components/sidenav';
import { Login } from './pages/login';
import { MainContainer } from './pages/main-container';
import { setCommandSocket, setQuerySocket } from './shared/socket-manager';
import { selectLoggedIn, selectToken, setCurrentUser } from './store/auth/auth.reducer';
import { useAppDispatch, useAppSelector } from './store/hooks';
export function App() {
  const loggedIn = useAppSelector(selectLoggedIn);
  const token = useAppSelector(selectToken);
  const [appReady, setAppReady] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    async function login() {
      const response = await fetch(`${environment.production ? 'https://' : 'http://'}://${environment.commandApiUrl}/auth`, {
        body: JSON.stringify({
          name: 'yuisef',
          googleId: 'geyuisefyuisefiorgio',
          imageUrl: 'https://i1.sndcdn.com/artworks-Y2H0i0iv6zGLcE04-ku70JA-t500x500.jpg'
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST'
      });
      const result = await response.json();
      console.log(result);
      dispatch(setCurrentUser(result));
    }
    login();
  }, []);
  useEffect(() => {
    if (!token) return;
    const commandSocket = io(environment.commandApiUrl + `?token=${token}`, { transports: ['websocket'] }).connect();
    const querySocket = io(environment.queryApiUrl + `?token=${token}`, { transports: ['websocket'] }).connect();
    setQuerySocket(querySocket, dispatch);
    setCommandSocket(commandSocket);
    setAppReady(true);
  }, [token]);
  if (!loggedIn) return <Login />;
  if (!appReady) return <ContentLoader />;
  return (
    <div className="app-shell">
      <Sidenav />
      <div className="main-container">
        <MainContainer />
      </div>
    </div>
  );
}

export default App;
