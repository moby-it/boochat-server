import { User } from '@boochat/domain';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface UsersState {
  users: User[];
}
const initialState: UsersState = {
  users: []
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = [...action.payload];
    }
  }
});
export const { setUsers } = usersSlice.actions;
export const selectUsers = (state: RootState) => state.users.users;

export default usersSlice.reducer;
