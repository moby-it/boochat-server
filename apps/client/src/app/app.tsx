import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/main-page';
import { http } from './shared/http-service';
import { setCurrentUser, setGoogleToken } from './store/auth/auth.reducer';
import { useAppDispatch } from './store/hooks';
export function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    window.addEventListener('onGoogleLogin', async (event: unknown) => {
      const googleToken = (event as CustomEvent<{ credential: string }>).detail.credential;
      dispatch(setGoogleToken(googleToken));
      const result = await http.login(googleToken);
      dispatch(setCurrentUser(result.user));
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
