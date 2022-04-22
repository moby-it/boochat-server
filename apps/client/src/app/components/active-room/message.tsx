import { Message as DomainMessage } from '@boochat/domain';
import { selectCurrentUser, useAppSelector } from '../../store';
import moment from 'moment';
interface MessageProps {
  message: DomainMessage;
}
export function Message(props: MessageProps) {
  const currentUser = useAppSelector(selectCurrentUser);
  const { message } = props;
  const isSent = message.sender.id === currentUser?.id;
  return (
    <div className={`message ${isSent ? ' sent-message' : ' received-message'}`}>
      {!isSent && (
        <img
          alt="profile"
          className="sender-avatar"
          src="https://images.unsplash.com/photo-1624431776357-e0fc5d4ed301?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=769&q=80"
        />
      )}
      <div className="message-text">
        <span>{message.content}</span>
      </div>
      <div className="timestamp">
        <span>{moment(message.timestamp).format('hh:mm')}</span>
      </div>
    </div>
  );
}
