import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { http } from './data';
import { MainPage } from './pages';
import Offline from './pages/offline';
import { setCurrentUser, setGoogleToken, useAppDispatch } from './store';
let listenersAdded = false;
export function App() {
  const dispatch = useAppDispatch();
  const [online, setOnline] = useState(true);
  useEffect(() => {
    if (!listenersAdded) {
      console.log('adding listener for google login...');
      window.addEventListener('onGoogleLogin', async (event: unknown) => {
        const googleToken = (event as CustomEvent<{ credential: string }>).detail.credential;
        dispatch(setGoogleToken(googleToken));
        const result = await http.auth.login(googleToken);
        dispatch(setCurrentUser(result));
      });
      window.addEventListener('online', () => setOnline(true));
      window.addEventListener('offline', () => setOnline(false));
      listenersAdded = true;
    }
  });
  return (
    <div className="app-shell">
      {online ? (
        <Routes>
          <Route path="*" element={<MainPage />}></Route>
        </Routes>
      ) : (
        <Offline />
      )}
    </div>
  );
}

export default App;
