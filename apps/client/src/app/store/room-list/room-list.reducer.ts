import { Room } from '@boochat/domain';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface RoomListState {
  rooms: Room[];
}
const initialState: RoomListState = {
  rooms: []
};
const roomListSlice = createSlice({
  name: 'roomList',
  initialState,
  reducers: {
    setRoomList: (state, action: PayloadAction<Room[]>) => {
      state.rooms = action.payload;
    }
  }
});

export const { setRoomList } = roomListSlice.actions;

export const selectRoomList = (state: RootState) => state.roomList.rooms;

export default roomListSlice.reducer;
