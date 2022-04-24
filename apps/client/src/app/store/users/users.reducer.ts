import { Room, User, GoogleId } from '@boochat/domain';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface UsersState {
  users: User[];
  activeUsers: string[];
}
const initialState: UsersState = {
  users: [],
  activeUsers: []
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = [...action.payload];
    },
    setActiveUsers: (state, action: PayloadAction<GoogleId[]>) => {
      state.activeUsers = action.payload;
    }
  }
});
export const { setUsers, setActiveUsers } = usersSlice.actions;
export const selectAllUsers = (state: RootState) => state.users.users;
export const selectUserIsActive = (room: Room) => (state: RootState) => {
  if (room.participants.length > 2) return false;
  const currentUserId = state.auth.user?.id;
  const otherParticipant = room.participants.filter((p) => p.id !== currentUserId)[0];
  return !!state.users.activeUsers.find((id) => id === otherParticipant.id);
};

export default usersSlice.reducer;
