import { configureStore } from '@reduxjs/toolkit';
import typingSlice from './slices/typing-slice';

export const store = configureStore({
  reducer: {
    typing: typingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
