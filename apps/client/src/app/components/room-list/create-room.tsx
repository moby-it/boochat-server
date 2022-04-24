import { CreateRoomDto } from '@boochat/domain';
import { CommandSocketEventsEnum } from '@boochat/shared';
import React, { FormEvent, useState } from 'react';
import Select, { MultiValue } from 'react-select';
import SocketManager from '../../data/socket-manager';
import { selectCurrentUser, selectAllUsers, useAppSelector } from '../../store';
import './create-room.css';
type Option = { label: string; value: string };
interface FormState {
  name: string;
  participants: Option[];
}
function CreateRoomForm() {
  const allUsers = useAppSelector(selectAllUsers);
  const currentUser = useAppSelector(selectCurrentUser);
  const [state, setState] = useState<FormState>({
    name: '',
    participants: []
  });
  const options = allUsers
    .filter((user) => user.id !== currentUser?.id)
    .map((user) => ({ label: user.name, value: user.id }));
  function handleInput(value: string) {
    console.log(value);
    setState({
      ...state,
      name: value
    });
  }
  function handleSelect(users: MultiValue<Option>) {
    setState({
      ...state,
      participants: [...users]
    });
  }
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { name, participants } = state;
    if (name && participants.length) {
      if (!currentUser) throw new Error('Current User Does not exist!');
      const dto: CreateRoomDto = {
        name,
        participantIds: [...participants.map((p) => p.value), currentUser.id],
        imageUrl:
          'https://www.pngkey.com/png/full/470-4703342_generic-placeholder-image-conference-room-free-icon.png'
      };
      SocketManager.commandSocket?.emit(CommandSocketEventsEnum.CREATE_ROOM, dto);
      setState({
        name: '',
        participants: []
      });
    }
    console.log('form submitted', state);
  }
  return (
    <form className="room-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Insert Room Name"
        name="name"
        value={state.name}
        onChange={(event) => handleInput(event.target.value)}
      />
      <Select
        isMulti
        options={options}
        value={state.participants}
        onChange={(e) => {
          handleSelect(e);
        }}
      />
      <input type="submit" value="Submit" />
    </form>
  );
}
export default CreateRoomForm;
