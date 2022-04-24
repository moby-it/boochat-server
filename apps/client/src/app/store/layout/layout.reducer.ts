import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DOCUMENT_TITLE } from '../../shared/variable';
import { RootState } from '../store';

interface LayoutState {
  notificationsCount: number;
  hasNotification: boolean;
  viewWidth: number | null;
  viewHeight: number | null;
}
const initialState: LayoutState = {
  hasNotification: false,
  viewHeight: null,
  viewWidth: null,
  notificationsCount: 0
};
export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    notify: (state) => {
      state.hasNotification = true;
      state.notificationsCount++;
      document.title = `(${state.notificationsCount})) ${DOCUMENT_TITLE}`;
    },
    clearNotifications: (state) => {
      state.notificationsCount--;
      state.hasNotification = state.notificationsCount > 0;
    }
  }
});
export const { clearNotifications, notify } = layoutSlice.actions;
export const selectHasNotification = (state: RootState) => state.layout.hasNotification;

export default layoutSlice.reducer;
