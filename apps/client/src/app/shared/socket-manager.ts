import { WebsocketEventsEnum } from '@boochat/shared';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { AppDispatch } from '../store/store';
import { setUsers } from '../store/users/users.reducer';
let commandSocket: Socket | undefined;
let querySocket: Socket | undefined;
function initializeQuerySocketEventListeners(dispatch: AppDispatch) {
  querySocket = querySocket as Socket;
  querySocket.on(WebsocketEventsEnum.ALL_USERS, (users) => {
    console.log('ALL USERS', users);
    dispatch(setUsers(users));
  });
  querySocket.on(WebsocketEventsEnum.ACTIVE_USER_LIST, (activeUsers) => {
    console.log('ACTIVE USERS', activeUsers);
  });
  querySocket.on(WebsocketEventsEnum.MEETUP_LIST, (meetups) => {
    console.log('MEETUPS LIST', meetups);
  });
  querySocket.on(WebsocketEventsEnum.ROOM_LIST, (rooms) => {
    console.log('ROOMS LIST', rooms);
  });
}
function initializeSocketManager(dispatch: AppDispatch, token: string) {
  if (!querySocket) {
    querySocket = io(environment.queryApiUrl + `?token=${token}`, { transports: ['websocket'] }).connect();
    initializeQuerySocketEventListeners(dispatch);
  }
  if (!commandSocket) commandSocket = io(environment.commandApiUrl + `?token=${token}`, { transports: ['websocket'] }).connect();
}
export const SocketManager = {
  initializeSocketManager
};
