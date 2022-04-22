import { isMessage, RoomItem } from '@boochat/domain';
import { createRef, useEffect } from 'react';
import { selectActiveRoom, useAppSelector } from '../../store';
import './active-room.css';
import { Announcement } from './announcement';
import { Message } from './message';
import MessageInput from './message-input';
import SocketManager from '../../shared/socket-manager';
import { QuerySocketEventsEnum } from '@boochat/shared';
import { useState } from 'react';
export function ActiveRoomContainer() {
  const room = useAppSelector(selectActiveRoom);
  const [roomItems, setRoomItems] = useState<RoomItem[]>([]);
  const messageListRef = createRef<HTMLDivElement>();
  useEffect(() => {
    messageListRef.current?.scrollIntoView();
  }, [room, messageListRef]);
  useEffect(() => {
    SocketManager.querySocket?.on(QuerySocketEventsEnum.NEW_ROOM_ITEM, (item: RoomItem) => {
      if (item.roomId === room?.id) {
        setRoomItems([...roomItems, item]);
      }
    });
  });
  useEffect(() => {
    if (room) {
      setRoomItems(room.items);
    }
  }, [room]);
  return (
    <div className="room-window">
      <div className="message-list">
        {roomItems.map((item) =>
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
