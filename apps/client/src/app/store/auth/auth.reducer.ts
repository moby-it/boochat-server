import { User, UserId } from '@boochat/domain';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponse } from '@boochat/shared';
import { RootState } from '../store';

interface AuthState {
  isLoggedIn: boolean;
  googleToken: string | null;
  token: string | null;
  user: User | null;
}
const initialState: AuthState = {
  isLoggedIn: false,
  googleToken: null,
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
    setGoogleToken: (state, action: PayloadAction<string>) => {
      state.googleToken = action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<AuthResponse>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isLoggedIn = true;
    }
  }
});
export const { logout, setCurrentUser, setGoogleToken } = authSlice.actions;
export const selectLoggedIn = (state: RootState) => {
  console.log('LOGIN CHANGED', state.auth.isLoggedIn);
  return state.auth.isLoggedIn;
};
export const selectToken = (state: RootState) => state.auth.token;
export const selectGoogleToken = (state: RootState) => state.auth.googleToken;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectUserImage = (userId: UserId) => (state: RootState) => {
  const user = state.users.users.find((user) => user.id === userId);
  if (!user) throw new Error('user not found');
  return user.imageUrl;
};

export default authSlice.reducer;
