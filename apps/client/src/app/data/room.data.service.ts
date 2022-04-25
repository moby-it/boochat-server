import { Room, RoomId } from '@boochat/domain';
import { http } from './http-service';

async function fetchOne(roomId: RoomId) {
  return await http.getWithAuth<Room>(`/rooms/getOne/${roomId}`);
}
const RoomDataService = { fetchOne };
export default RoomDataService;
