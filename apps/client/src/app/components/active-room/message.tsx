import { Message as DomainMessage } from '@boochat/domain';
import { selectCurrentUser, selectUserImage, useAppSelector } from '../../store';
import moment from 'moment';
interface MessageProps {
  message: DomainMessage;
}
export function Message(props: MessageProps) {
  const currentUser = useAppSelector(selectCurrentUser);
  const { message } = props;
  const isSent = message.sender.id === currentUser?.id;
  const userImageUrl = useAppSelector(selectUserImage(message.sender.id));
  return (
    <div className={`message ${isSent ? ' sent-message' : ' received-message'}`}>
      {!isSent && <img alt="profile" className="sender-avatar" src={userImageUrl} />}
      <div className="message-text">
        <span>{message.content}</span>
      </div>
      <div className="timestamp">
        <span>{moment(message.timestamp).format('hh:mm')}</span>
      </div>
    </div>
  );
}
