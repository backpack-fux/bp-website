// pages/components/ChatInterface.tsx
import React, { useState, useEffect } from 'react';
import './ChatInterface.css';
import UserInput from './UserInput';
import BotOutput from './BotOutput';
import { trpcNext } from '../../services/utils/trpc/trpcNext';
import { useChatMessages } from '../../services/utils/hooks/useChatMessages';

interface ChatMessage {
  id: string;
  speaker: 'user' | 'chatbot';
  content: string;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { sendMessage, getChatHistory } = useChatMessages();
  const conversationId = 'TODO: Replace with the conversation ID';
  const { data: chatHistory, refetch: refetchChatHistory } = getChatHistory(['chatmessage.getChatHistory', conversationId]);

  useEffect(() => {
    if (chatHistory) {
      setMessages(chatHistory);
    }
  }, [chatHistory]);

  const onSendMessage = async () => {
    if (input.trim()) {
      setError(null);
      setIsLoading(true);
      try {
        const chatbotResponse = await sendMessage.mutateAsync({ message: input, userId: 'TODO: Replace with the user ID' });

        setMessages((prevMessages) => [
          ...prevMessages,
          { id: generateId(), speaker: 'user', content: input },
          { id: generateId(), speaker: 'chatbot', content: chatbotResponse },
        ]);

        setInput('');
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Helper function to generate unique message IDs
  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  return (
    <div className="chat-interface">
      <BotOutput messages={messages} />
      {isLoading && <div className="loading-indicator">Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      <UserInput input={input} setInput={setInput} onSendMessage={onSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatInterface;
