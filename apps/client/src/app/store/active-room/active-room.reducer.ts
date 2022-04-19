import { Room } from '@boochat/domain';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface ActiveRoomState {
  room: Room | null;
}
const initialState: ActiveRoomState = {
  room: null
};

const activeRoomSlice = createSlice({
  name: 'activeRoom',
  initialState,
  reducers: {
    setActiveRoom: (state, action: PayloadAction<Room>) => {
      state.room = action.payload;
    }
  }
});
export const { setActiveRoom } = activeRoomSlice.actions;
export const selectActiveRoom = (state: RootState) => state.activeRoom.room;

export default activeRoomSlice.reducer;
