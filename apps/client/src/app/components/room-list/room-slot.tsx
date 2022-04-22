import { Room, RoomId, User } from '@boochat/domain';
import { CommandSocketEventsEnum } from '@boochat/shared';
import { useState } from 'react';
import { http } from '../../data';
import SocketManager from '../../shared/socket-manager';
import {
  selectActiveRoom,
  selectCurrentUser,
  selectUserIsActive,
  selectUsers,
  setActiveRoom,
  useAppDispatch,
  useAppSelector
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
  const { room } = props;
  const dispath = useAppDispatch();
  const [hasUnreadMessage, setUnreadStatus] = useState(room.hasUnreadMessage);
  const activeRoom = useAppSelector(selectActiveRoom);
  const currentUser = useAppSelector(selectCurrentUser) as User;
  const allUsers = useAppSelector(selectUsers);
  const userIsActive = useAppSelector(selectUserIsActive(room));
  const roomImage = getRoomImage(room, allUsers, currentUser);
  return (
    <div
      className={activeRoom?.id === room.id ? 'room-slot room-slot-selected' : 'room-slot'}
      onClick={() => chooseRoom(props.room.id)}
    >
      <div className="avatar">
        <img alt="profile" src={roomImage} className="avatar-md" />
        {userIsActive && <span className="active-user"></span>}
      </div>
      <div className="room-slot-txt">
        {hasUnreadMessage && <span>HAS UNREAD MESSAGE</span>}
        <div>{room.name}</div>
        <div>{room.items[0].content}</div>
      </div>
    </div>
  );
  async function chooseRoom(roomId: RoomId) {
    if (activeRoom) {
      SocketManager.commandSocket?.emit(CommandSocketEventsEnum.CLOSED_ROOM, { roomId: activeRoom.id });
    }
    const room: Room = await http.rooms.fetchOne(roomId);
    dispath(setActiveRoom(room));
    setUnreadStatus(false);
  }
}
export default RoomSlot;
