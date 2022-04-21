import { Room, RoomId, User } from '@boochat/domain';
import { http } from '../../data';
import {
  setActiveRoom,
  useAppDispatch,
  useAppSelector,
  selectCurrentUser,
  selectUserIsActive,
  selectUsers
} from '../../store';
interface RoomSlotProps {
  room: Room;
}
function twoPeopleRoom(room: Room) {
  return room.participants.length === 2;
}
function getRoomImage(room: Room, allUsers: User[], currentUser: User) {
  let roomImage = room.imageUrl;
  if (twoPeopleRoom(room)) {
    const otherUser = room.participants.filter((participant) => participant.id !== currentUser?.id)[0];
    const otherUserImage = allUsers.find((user) => user.id === otherUser.id)?.imageUrl;
    if (otherUserImage) roomImage = otherUserImage;
  }
  return roomImage;
}
export function RoomSlot(props: RoomSlotProps) {
  const dispath = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser) as User;
  const allUsers = useAppSelector(selectUsers);
  const { room } = props;
  const userIsActive = useAppSelector(selectUserIsActive(room));
  const roomImage = getRoomImage(room, allUsers, currentUser);
  return (
    <div className="room-slot" onClick={() => chooseRoom(props.room.id)}>
      <div className="avatar">
        <img alt="profile" src={roomImage} className="avatar-md" />
        {userIsActive && <span className="active-user"></span>}
      </div>
      <div className="room-slot-txt">
        <div>{room.name}</div>
        <div>{room.items[0].content}</div>
      </div>
    </div>
  );
  async function chooseRoom(roomId: RoomId) {
    const room: Room = await http.rooms.fetchOne(roomId);
    dispath(setActiveRoom(room));
  }
}
export default RoomSlot;
