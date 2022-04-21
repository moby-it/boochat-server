import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { http } from './data';
import { MainPage } from './pages';
import { setCurrentUser, setGoogleToken, useAppDispatch } from './store';
export function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    window.addEventListener('onGoogleLogin', async (event: unknown) => {
      const googleToken = (event as CustomEvent<{ credential: string }>).detail.credential;
      dispatch(setGoogleToken(googleToken));
      const result = await http.auth.login(googleToken);
      dispatch(setCurrentUser(result));
    });
  });

  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
