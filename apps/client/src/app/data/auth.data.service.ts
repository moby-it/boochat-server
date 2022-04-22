import { UserDto } from '@boochat/domain';
import jwtDecode from 'jwt-decode';
import { environment } from '../../environments/environment';
import { AuthResponse } from '@boochat/shared';
import { urlPrefix } from './variable';

async function login(googleToken: string) {
  const user = jwtDecode(googleToken) as { sub: string; name: string; picture: string };
  const dto: UserDto = {
    id: user.sub,
    imageUrl: user.picture,
    name: user.name
  };
  const response = await fetch(`${urlPrefix}${environment.commandApiUrl}/auth`, {
    body: JSON.stringify({
      ...dto
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST'
  });
  const result: AuthResponse = await response.json();
  localStorage.setItem('token', result.token);
  return result;
}
const AuthService = {
  login
};
export default AuthService;
