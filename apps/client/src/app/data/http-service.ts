import { environment } from '../../environments/environment';
import AuthService from './auth.data.service';
import RoomDataService from './room.data.service';
import { urlPrefix } from './variable';
async function getWithAuth<T>(endpoint: string): Promise<T> {
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
async function postWithAuth<T, K>(endpoint: string, body: K): Promise<T> {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Token not present. Cannot send request');
  return fetch(urlPrefix + environment.queryApiUrl + endpoint, {
    method: 'POST',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }),
    body: JSON.stringify(body)
  }).then(async (response) => (await response.json()) as T);
}
async function get<T>(endpoint: string): Promise<T> {
  return fetch(urlPrefix + environment.queryApiUrl + endpoint, {
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    })
  }).then(async (response) => (await response.json()) as T);
}
async function post<T, K>(endpoint: string, body: K): Promise<T> {
  return fetch(urlPrefix + environment.queryApiUrl + endpoint, {
    body: JSON.stringify(body),
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    })
  }).then(async (response) => (await response.json()) as T);
}
export const http = {
  get,
  post,
  postWithAuth,
  getWithAuth,
  auth: AuthService,
  rooms: RoomDataService
};
