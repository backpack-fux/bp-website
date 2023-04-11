// components/Chat/ChatWindow.tsx

import React from 'react';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

interface ChatWindowProps {
  messages: ChatMessage[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 h-96 overflow-y-auto">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`${
            message.sender === 'user' ? 'text-right' : ''
          } mb-3`}
        >
          <span
            className={`${
              message.sender === 'user'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 text-gray-900'
            } inline-block rounded-md px-4 py-2`}
          >
            {message.text}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
