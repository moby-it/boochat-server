import { isMessage } from '@boochat/domain';
import { selectActiveRoom } from '../../store/active-room/active-room.reducer';
import { useAppSelector } from '../../store/hooks';
import './active-room.css';
import { Announcement } from './announcement';
import { Message } from './message';
import MessageInput from './message-input';
export function ActiveRoomContainer() {
  const room = useAppSelector(selectActiveRoom);
  return (
    <div className="room-window">
      <div className="message-list">
        {room?.items.map((item) =>
          isMessage(item) ? (
            <Message message={item} key={item.id} />
          ) : (
            <Announcement key={item.id} announcement={item} />
          )
        )}
      </div>
      <MessageInput />
    </div>
  );
}
export default ActiveRoomContainer;
