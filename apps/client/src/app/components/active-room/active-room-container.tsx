import { isMessage, RoomItem } from '@boochat/domain';
import { QuerySocketEventsEnum } from '@boochat/shared';
import { createRef, useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader';
import { useParams } from 'react-router-dom';
import { http } from '../../data';
import SocketManager from '../../data/socket-manager';
import { selectActiveRoom, setActiveRoom, useAppDispatch, useAppSelector } from '../../store';
import './active-room.css';
import { Announcement } from './announcement';
import { Message } from './message';
import MessageInput from './message-input';
export function ActiveRoomContainer() {
  const { roomId } = useParams();
  const [loading, setLoading] = useState(false);
  const activeRoom = useAppSelector(selectActiveRoom);
  const [roomItems, setRoomItems] = useState<RoomItem[]>([]);
  const messageListRef = createRef<HTMLDivElement>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    messageListRef.current?.scrollIntoView();
  }, [activeRoom, messageListRef]);
  useEffect(() => {
    SocketManager.querySocket?.on(QuerySocketEventsEnum.NEW_ROOM_ITEM, (item: RoomItem) => {
      if (item.roomId === activeRoom?.id) {
        setRoomItems([...roomItems, item]);
      }
    });
  });
  useEffect(() => {
    if (roomId) {
      setLoading(true);
      http.rooms.fetchOne(roomId).then((room) => {
        dispatch(setActiveRoom(room));
        setRoomItems(room.items);
        setLoading(false);
      });
    }
  }, [roomId, dispatch]);
  return (
    <div className="room-window">
      {!activeRoom && <h2>No Room selected</h2>}
      {loading && <ContentLoader />}
      {activeRoom && !loading && (
        <>
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
        </>
      )}
    </div>
  );
}
export default ActiveRoomContainer;
