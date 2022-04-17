import { RoomId } from '@boochat/domain';
import { Server } from 'socket.io';

export class WsServer {
  private static _instance: Server;
  public static get instance(): Server {
    if (!this._instance) throw new Error('cannot access ws server before set');
    return this._instance;
  }
  public static set instance(value: Server) {
    if (!this._instance && value) this._instance = value;
  }
  static emitToRoom(roomId: RoomId, eventName: string, payload: unknown) {
    if (WsServer._instance) WsServer._instance.to(roomId).emit(eventName, payload);
  }
  static emitToAll(eventName: string, payload: unknown) {
    if (WsServer._instance) WsServer._instance.emit(eventName, payload);
  }
}
