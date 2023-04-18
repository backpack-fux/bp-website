// pages/index.tsx
import Head from 'next/head';
import React from 'react';
import ChatInterface from './components/ChatInterface';

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>ChatGPT</title>
        <meta name="description" content="ChatGPT powered by Your Mom" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ChatInterface />
      </main>
    </div>
  );
};

export default Home;
