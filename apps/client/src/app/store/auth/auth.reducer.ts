import { User } from '@boochat/domain';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  user: User | null;
}
const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
  user: null
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
    },
    setCurrentUser: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isLoggedIn = true;
    }
  }
});
export const { logout, setCurrentUser } = authSlice.actions;
export const selectLoggedIn = (state: RootState) => {
  console.log('LOGIN CHANGED', state.auth.isLoggedIn);
  return state.auth.isLoggedIn;
};
export const selectToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
