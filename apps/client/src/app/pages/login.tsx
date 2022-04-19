import { useNavigate } from 'react-router-dom';
import { environment } from '../../environments/environment';
import { selectLoggedIn, setCurrentUser } from '../store/auth/auth.reducer';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(selectLoggedIn);
  async function handleLogin() {
    if (!isLoggedIn) {
      const response = await fetch(`${environment.production ? 'https' : 'http'}://${environment.commandApiUrl}/auth`, {
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
      navigate('/');
    }
  }
  return (
    <button type="button" style={{ alignSelf: 'center' }} onClick={handleLogin}>
      Login
    </button>
  );
}
export default Login;
