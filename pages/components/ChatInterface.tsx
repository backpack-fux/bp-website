// pages/components/ChatInterface.tsx
import React, { useState, useEffect } from 'react';
import UserInput from './UserInput';
import BotOutput from './BotOutput';
import styles from './ChatInterface.module.css';
import { useChatMessages } from '../../services/utils/hooks/useChatMessages';
import { ChatMessage } from '@prisma/client';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const { sendMessage, getChatHistory, addChatMessage } = useChatMessages(); // Add addChatMessage here
  const conversationId = 'TODO: Replace with the conversation ID';
  const { data: chatHistory, refetch: refetchChatHistory } = getChatHistory(`chatmessage.getChatMessagesByConversation.${conversationId}`);

  // Get the user's fingerprint and set it as the user ID
  useEffect(() => {
    const fetchFingerprint = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setUserId(result.visitorId);
    };

    fetchFingerprint();
  }, []);

  useEffect(() => {
    console.log('chatHistory:', chatHistory);
    if (chatHistory) {
      setMessages(chatHistory);
    }
  }, [chatHistory]);

  const onSendMessage = async () => {
    if (input.trim()) {
      setError(null);
      setIsLoading(true);
      try {
        console.log('Sending message:', input);
        const chatbotResponse = await sendMessage.mutateAsync({ message: input, userId: userId || 'fallback-user-id' });
        console.log('Received chatbot response:', chatbotResponse);

        // Save user message to the database
        await addChatMessage.mutateAsync({
          conversationId,
          speaker: 'user',
          entry: input,
        });

        // Save chatbot message to the database
        await addChatMessage.mutateAsync({
          conversationId,
          speaker: 'chatbot',
          entry: chatbotResponse,
        });

        // Refetch the chat history
        await refetchChatHistory();

        setInput('');
      } catch (err) {
        console.error('Error while sending message:', err);
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className={styles.chatInterface}>
      <BotOutput messages={messages} />
      {isLoading && <div className={styles.loadingIndicator}>Loading...</div>}
      {error && <div className={styles.errorMessage}>{error}</div>}
      <UserInput input={input} setInput={setInput} onSendMessage={onSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatInterface;
