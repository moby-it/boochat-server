import { CommandSocketEventsEnum } from '@boochat/shared';
import { ChangeEvent, useState } from 'react';
import SocketManager from '../../shared/socket-manager';
import { selectActiveRoom, useAppSelector } from '../../store';

export function MessageInput() {
  const activeRoom = useAppSelector(selectActiveRoom);
  const [inputValue, setInputValue] = useState('');
  function handleUserInput(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      const commandSocket = SocketManager.commandSocket;
      commandSocket?.emit(CommandSocketEventsEnum.SEND_MESSAGE, {
        content: inputValue,
        roomId: activeRoom?.id
      });
      setInputValue('');
    }
  }
  return (
    <div className="message-input">
      <input
        type="text"
        placeholder="Type your message and press Enter"
        onKeyDown={handleKeyDown}
        value={inputValue}
        onChange={handleUserInput}
      />
    </div>
  );
}
export default MessageInput;
