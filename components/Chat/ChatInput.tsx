// components/Chat/ChatInput.tsx
import React, { useState } from 'react';
import { trpc } from '../../lib/trpc/trpc';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  onReceiveMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, onReceiveMessage }) => {
  const [message, setMessage] = useState('');

  const sendMessageQuery = trpc.chatbot.useQuery('sendMessage', { enabled: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() !== '') {
      onSendMessage(message);
      try {
        const response = await sendMessageQuery.refetch({ text: message });
        onReceiveMessage(response.data);
        setMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex mt-4 items-center bg-gray-100 rounded-md"
    >
      <input
        type="text"
        className="w-full px-4 py-2 rounded-md focus:outline-none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none"
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;
