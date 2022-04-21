import { isMessage } from '@boochat/domain';
import { createRef, useEffect } from 'react';
import { selectActiveRoom, useAppSelector } from '../../store';
import './active-room.css';
import { Announcement } from './announcement';
import { Message } from './message';
import MessageInput from './message-input';
export function ActiveRoomContainer() {
  const room = useAppSelector(selectActiveRoom);
  const messageListRef = createRef<HTMLDivElement>();
  useEffect(() => {
    messageListRef.current?.scrollIntoView();
  }, [room, messageListRef]);
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
        <div id="message-end-ref" ref={messageListRef}></div>
      </div>
      <MessageInput />
    </div>
  );
}
export default ActiveRoomContainer;
