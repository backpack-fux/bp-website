// pages/index.tsx
import React, { useState } from 'react';
import MainLayout from './components/MainLayout';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import { randomUUID } from 'crypto';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

const HomePage = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = async (text: string) => {
    const newMessage: Message = {
      id: randomUUID(),
      text,
      sender: 'user',
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleReceiveMessage = (text: string) => {
    const newMessage: Message = {
      id: randomUUID(),
      text,
      sender: 'bot',
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-4">Chat with ChatGPT</h1>
      <ChatWindow messages={messages} />
      <ChatInput
        onSendMessage={handleSendMessage}
        onReceiveMessage={handleReceiveMessage}
      />
    </MainLayout>
  );
};

export default HomePage;
