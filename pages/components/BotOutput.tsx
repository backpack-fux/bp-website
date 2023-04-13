// src/components/BotOutput.tsx
import React from 'react';

interface ChatMessage {
  id: string;
  speaker: 'user' | 'chatbot';
  content: string;
}

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
          {message.content}
        </div>
      ))}
    </div>
  );
};

export default BotOutput;
