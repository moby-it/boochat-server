import { Room } from '@boochat/domain';
import { useAppSelector } from '../../store/hooks';
import { selectUserIsActive } from '../../store/users/users.reducer';
interface RoomSlotProps {
  room: Room;
}
export function RoomSlot(props: RoomSlotProps) {
  const { room } = props;
  const userIsActive = useAppSelector(selectUserIsActive(room));
  return (
    <div className="room-slot">
      <div className="avatar">
        <img alt="profile" src={room.imageUrl} className="avatar-md" />
        {userIsActive && <span hidden className="active-user"></span>}
      </div>
      <div className="room-slot-txt">
        <div>{room.name}</div>
        <div>{room.items[0].content}</div>
      </div>
    </div>
  );
}
export default RoomSlot;
