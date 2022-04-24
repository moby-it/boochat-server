import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth.reducer';
import layoutReducer from './layout/layout.reducer';
import roomReducer from './rooms/room.reducer';
import usersReducer from './users/users.reducer';
// ...

// Infer the `RootState` and `AppDispatch` types from the store itself
export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    rooms: roomReducer,
    layout: layoutReducer
  }
});
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
