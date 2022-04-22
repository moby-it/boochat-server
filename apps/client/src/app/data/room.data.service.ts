import { Room, RoomId } from '@boochat/domain';
import { fetchWithAuth } from './http-service';

async function fetchOne(roomId: RoomId) {
  return await fetchWithAuth<Room>(`/rooms/getOne/${roomId}`);
}
const RoomDataService = { fetchOne };
export default RoomDataService;
