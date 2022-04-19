import { UserDto } from '@boochat/domain';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { environment } from '../../environments/environment';
import { selectLoggedIn, setCurrentUser, setGoogleToken } from '../store/auth/auth.reducer';
import { useAppDispatch, useAppSelector } from '../store/hooks';
export function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(selectLoggedIn);

  return (
    <>
      <div className="g_id_signin" data-type="standard"></div>
    </>
  );

  async function handleLogin(dto: UserDto) {
    if (!isLoggedIn) {
      const response = await fetch(
        `${environment.production ? 'https' : 'http'}://${environment.commandApiUrl}/auth`,
        {
          body: JSON.stringify({
            ...dto
          }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST'
        }
      );
      const result = await response.json();
      console.log(result);
      dispatch(setCurrentUser(result));
      navigate('/');
    }
  }
}

export default Login;
