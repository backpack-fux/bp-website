//pages/index.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import ChatInterface from './components/ChatInterface';
import { setConversation, addChatMessage } from '../store/reducers/chatSlice';
import { sendMessage } from '../store/actions/chatActions';
import { trpcClient } from '../services/utils/trpc/trpcClient';

const IndexPage: React.FC = () => {
  const dispatch = useDispatch();
  const conversation = useSelector((state: RootState) => state.chatbot.conversation);

  // Fetch conversation by ID and set it in the Redux store
  useEffect(() => {
    const fetchConversation = async () => {
      const conversationId = 'your-conversation-id'; // Replace with the actual conversation ID
      const fetchedConversation = await trpcClient.query('chatMessage.getChatMessagesByConversation', conversationId);
      dispatch(setConversation(fetchedConversation));
    };

    fetchConversation();
  }, [dispatch]);

  const handleSendMessage = async (message: string) => {
    const userId = 'your-user-id'; // Replace with the actual user ID

    // Send the message to the backend and get the chatbot's response
    const response = await dispatch(sendMessage(message));
    const chatbotResponseText = response.payload;

    // Add the user's message to the Redux store and save it to the database
    const userMessage = {
      conversationId: conversation.id,
      speaker: 'user',
      entry: message,
    };
    dispatch(addChatMessage(userMessage));
    await trpcClient.mutation('chatMessage.addChatMessage', userMessage);

    // Add the chatbot's response to the Redux store and save it to the database
    const chatbotResponse = {
      conversationId: conversation.id,
      speaker: 'chatbot',
      entry: chatbotResponseText,
    };
    dispatch(addChatMessage(chatbotResponse));
    await trpcClient.mutation('chatMessage.addChatMessage', chatbotResponse);
  };

  return (
    <div>
      <ChatInterface
        messages={conversation.messages}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default IndexPage;
