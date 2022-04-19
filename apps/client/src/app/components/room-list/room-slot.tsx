import { Room, UserId } from '@boochat/domain';
import { selectCurrentUser } from '../../store/auth/auth.reducer';
import { useAppSelector } from '../../store/hooks';
import { selectUserIsActive, selectUsers } from '../../store/users/users.reducer';
interface RoomSlotProps {
  room: Room;
}
function twoPeopleRoom(room: Room) {
  return room.participants.length === 2;
}
export function RoomSlot(props: RoomSlotProps) {
  const currentUser = useAppSelector(selectCurrentUser);
  const allUsers = useAppSelector(selectUsers);
  const { room } = props;
  let roomImage = room.imageUrl;
  const userIsActive = useAppSelector(selectUserIsActive(room));
  if (twoPeopleRoom(room)) {
    const otherUser = room.participants.filter((participant) => participant.id !== currentUser?.id)[0];
    const otherUserImage = allUsers.find((user) => user.id === otherUser.id)?.imageUrl;
    if (otherUserImage) roomImage = otherUserImage;
  }
  return (
    <div className="room-slot">
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
}
export default RoomSlot;
