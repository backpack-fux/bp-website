// src/reducers/chatSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { sendMessage, addChatMessage } from '../actions/chatActions';

export interface ChatMessage {
  id: string;
  speaker: 'user' | 'chatbot';
  content: string;
}

interface ChatState {
  messages: ChatMessage[];
}

const initialState: ChatState = {
  messages: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sendMessage.fulfilled, (state, action: PayloadAction<string>) => {
      state.messages.push({ id: Date.now().toString(), speaker: 'chatbot', content: action.payload });
    });
    builder.addCase(addChatMessage.fulfilled, (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload);
    });
  },
});

export const selectMessages = (state: RootState) => state.chat.messages;

export default chatSlice.reducer;
