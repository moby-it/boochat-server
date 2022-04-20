import { UserDto } from '@boochat/domain';
import { environment } from '../../environments/environment';
import { setCurrentUser } from '../store/auth/auth.reducer';
import { AppDispatch } from '../store/store';
const urlPrefix = environment.production ? 'https://' : 'http://';
async function login(dto: UserDto, dispatch: AppDispatch) {
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
  const result = await response.json();
  localStorage.setItem('token', result.token);
  dispatch(setCurrentUser(result));
}
async function fetchWithAuth<T>(endpoint: string): Promise<T> {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Token not present. Cannot send request');
  return fetch(urlPrefix + environment.queryApiUrl + endpoint, {
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
  }).then(async (response) => (await response.json()) as T);
}
export const http = {
  login,
  fetchWithAuth
};
