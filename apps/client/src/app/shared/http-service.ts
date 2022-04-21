import { UserDto } from '@boochat/domain';
import jwtDecode from 'jwt-decode';
import { environment } from '../../environments/environment';
import { AuthResponse } from './auth.response.model';
const urlPrefix = environment.production ? 'https://' : 'http://';
async function login(googleToken: string) {
  const user = jwtDecode(googleToken) as { sub: string; name: string; picture: string };
  const dto: UserDto = {
    googleId: user.sub,
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
