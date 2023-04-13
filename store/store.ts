// src/store.ts
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import chatReducer from './reducers/chatSlice';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: { extraArgument: { /* Add your ChatMessageRouter instance here */ } } }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
