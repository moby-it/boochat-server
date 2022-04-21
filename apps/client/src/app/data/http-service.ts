import { environment } from '../../environments/environment';
import AuthService from './auth.data.service';
import RoomDataService from './room.data.service';
import { urlPrefix } from './variable';
export async function fetchWithAuth<T>(endpoint: string): Promise<T> {
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
export async function simpleFetch<T>(endpoint: string): Promise<T> {
  return fetch(urlPrefix + environment.queryApiUrl + endpoint, {
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    })
  }).then(async (response) => (await response.json()) as T);
}
export const http = {
  simpleFetch,
  auth: AuthService,
  rooms: RoomDataService
};
