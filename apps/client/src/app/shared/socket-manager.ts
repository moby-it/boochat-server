import { Socket } from 'socket.io-client';
import { AppDispatch } from '../store/store';
import { setUsers } from '../store/users/users.reducer';
import { WebsocketEventsEnum } from '@boochat/shared';
export let commandSocket: Socket;
export let querySocket: Socket;
export function setQuerySocket(socket: Socket, dispatch: AppDispatch) {
  querySocket = socket;

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
export function setCommandSocket(socket: Socket) {
  commandSocket = socket;
}
