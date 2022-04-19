import { UserDto } from '@boochat/domain';
import jwtDecode from 'jwt-decode';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/main-page';
import { login } from './shared/login';
import { setGoogleToken } from './store/auth/auth.reducer';
import { useAppDispatch } from './store/hooks';
export function App() {
  const dispatch = useAppDispatch();
  window.addEventListener('onGoogleLogin', (event: unknown) => {
    const e = event as { detail: { credential: string } };
    const credential = e.detail.credential;
    dispatch(setGoogleToken(credential));
    const user = jwtDecode(credential) as { sub: string; name: string; picture: string };
    console.log(user);
    const dto: UserDto = {
      googleId: user.sub,
      imageUrl: user.picture,
      name: user.name
    };
    login(dto, dispatch);
  });
  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
