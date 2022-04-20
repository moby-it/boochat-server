import { UserDto } from '@boochat/domain';
import { environment } from '../../environments/environment';
import { setCurrentUser } from '../store/auth/auth.reducer';
import { AppDispatch } from '../store/store';

export async function login(dto: UserDto, dispatch: AppDispatch) {
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
}
