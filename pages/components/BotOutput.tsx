// pages/components/BotOutput.tsx
import React from 'react';
import { ChatMessage } from '@prisma/client';

interface BotOutputProps {
  messages: ChatMessage[];
}

const BotOutput: React.FC<BotOutputProps> = ({ messages }) => {
  return (
    <div className="chat-area">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`message ${message.speaker === 'user' ? 'user-message' : 'chatbot-message'}`}
        >
          {message.entry}
        </div>
      ))}
    </div>
  );
};

export default BotOutput;
