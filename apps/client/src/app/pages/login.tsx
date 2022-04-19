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
    <GoogleLogin
      clientId={environment.googleClientId}
      buttonText="Login with Google"
      cookiePolicy={'single_host_origin'}
      onSuccess={onLoginSucceded}
      onFailure={onLoginFailed}
    />
  );
  async function onLoginSucceded(response: GoogleLoginResponse | GoogleLoginResponseOffline) {
    if (response.code) throw new Error('failed to login');
    response = response as GoogleLoginResponse;
    const { googleId, tokenId } = response;
    dispatch(setGoogleToken(tokenId));
    const basicProfile = response.getBasicProfile();
    const name = basicProfile.getName();
    const imageUrl = basicProfile.getImageUrl();
    const dto: UserDto = {
      googleId,
      name,
      imageUrl
    };
    await handleLogin(dto);
  }
  function onLoginFailed(error: unknown) {
    console.error('Error logging to Google', error);
  }
  async function handleLogin(dto: UserDto) {
    if (!isLoggedIn) {
      const response = await fetch(`${environment.production ? 'https' : 'http'}://${environment.commandApiUrl}/auth`, {
        body: JSON.stringify({
          ...dto
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
      navigate('/');
    }
  }
}

export default Login;
