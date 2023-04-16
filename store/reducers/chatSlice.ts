//store/reducers/chatSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatMessageType } from '../../services/models/chatMessage';
import { ConversationType } from '../../services/models/conversation';

// Use the imported ChatMessage type in ChatBotState
export interface ChatBotState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  conversation: ConversationType; // Use ConversationType here
  error: string | null;
}

const initialState: ChatBotState = {
  conversation: {
    id: '',
    userId: '',
    user: {
      id: '',
      fingerprint: '',
      conversations: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    messages: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  status: 'idle',
  error: null,
};

export const chatbotSlice = createSlice({
  name: 'chatbot',
  initialState,
  reducers: {
    // Use the imported ConversationType in the PayloadAction
    setConversation: (state, action: PayloadAction<ConversationType>) => {
      state.conversation = action.payload;
    },
    addChatMessage: (state, action: PayloadAction<ChatMessageType>) => {
      state.conversation.messages.push(action.payload);
    },
    setStatus: (state, action: PayloadAction<ChatBotState['status']>) => {
      state.status = action.payload;
    },
  },
});

export const { setConversation, addChatMessage, setStatus } = chatbotSlice.actions;

export default chatbotSlice.reducer;
