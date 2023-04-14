// src/actions/chatActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ChatMessageRouter } from '../../services/routers/chatMessageRouter';

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (message: string, { extra }) => {
    const chatApi = extra as ChatMessageRouter;
    // Pass the message as an object with the correct key
    const response = await chatApi.sendMessage({ input: message });
    return response;
  }
);

export const addChatMessage = createAsyncThunk(
  'chat/addChatMessage',
  async (input: { conversationId: string; speaker: 'user' | 'chatbot'; entry: string }, { extra }) => {
    const chatApi = extra as ChatMessageRouter;
    // Pass the input object with the correct key
    const newMessage = await chatApi.addChatMessage({ input });
    return newMessage;
  }
);

// Add more actions for getChatMessagesByConversation and deleteChatMessage if needed
