import { Room, RoomItem } from '@boochat/domain';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface RoomsState {
  roomList: Room[];
  activeRoom: Room | null;
}
const initialState: RoomsState = {
  roomList: [],
  activeRoom: null
};
const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setRoomList: (state, action: PayloadAction<Room[]>) => {
      state.roomList = action.payload;
    },
    appendRoomItem: (state, action: PayloadAction<RoomItem>) => {
      const item = action.payload;
      const room = state.roomList.find((room) => room.id === item.roomId);
      if (room) {
        room.items = [item];
        room.hasUnreadMessage = state.activeRoom?.id !== item.roomId;
      }
      state.roomList.sort((a, b) => (a.items[0].timestamp < b.items[0].timestamp ? 1 : -1));
    },
    setActiveRoom: (state, action: PayloadAction<Room>) => {
      state.activeRoom = action.payload;
    }
  }
});

export const { setRoomList, appendRoomItem, setActiveRoom } = roomsSlice.actions;

export const selectRoomList = (state: RootState) => state.rooms.roomList;
export const selectActiveRoom = (state: RootState) => state.rooms.activeRoom;

export default roomsSlice.reducer;
