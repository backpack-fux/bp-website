//pages/components/ChatInterface.tsx
import React, { useState } from 'react';
import './ChatInterface.css';
import UserInput from './UserInput';
import BotOutput from './BotOutput';

interface ChatMessage {
  id: string;
  speaker: 'user' | 'chatbot';
  content: string;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');

  // TODO: Implement the function to handle user input and send messages to the chatbot

  return (
    <div className="chat-interface">
      <BotOutput messages={messages} />
      <UserInput input={input} setInput={setInput} onSendMessage={() => {}} />
    </div>
  );
};

export default ChatInterface;
