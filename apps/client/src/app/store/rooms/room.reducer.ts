import { Room, RoomItem } from '@boochat/domain';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';
import { RootState } from '../store';

interface RoomsState {
  roomList: Room[];
  activeRoom: Room | null;
}
const initialState: RoomsState = {
  roomList: [],
  activeRoom: null
};
function sortRoomFn(a: WritableDraft<Room>, b: WritableDraft<Room>) {
  return a.items[0].timestamp < b.items[0].timestamp ? 1 : -1;
}
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
      if (room?.items) state.roomList = state.roomList.sort(sortRoomFn);
    },
    setActiveRoom: (state, action: PayloadAction<Room>) => {
      state.activeRoom = action.payload;
    },
    addRoom: (state, action: PayloadAction<Room>) => {
      state.roomList.unshift(action.payload);
      state.roomList = [...state.roomList];
    }
  }
});

export const { setRoomList, appendRoomItem, setActiveRoom, addRoom } = roomsSlice.actions;

export const selectRoomList = (state: RootState) => state.rooms.roomList;
export const selectActiveRoom = (state: RootState) => state.rooms.activeRoom;

export default roomsSlice.reducer;
