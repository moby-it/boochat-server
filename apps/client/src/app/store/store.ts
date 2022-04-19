import { configureStore } from '@reduxjs/toolkit';
import activeRoomReducer from './active-room/active-room.reducer';
import authReducer from './auth/auth.reducer';
import roomListReducer from './room-list/room-list.reducer';
import usersReducer from './users/users.reducer';
// ...

// Infer the `RootState` and `AppDispatch` types from the store itself
export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    activeRoom: activeRoomReducer,
    roomList: roomListReducer
  }
});
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
