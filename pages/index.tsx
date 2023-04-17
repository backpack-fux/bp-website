// pages/index.tsx
import { useState, useEffect } from 'react';
import { trpcNext } from '../services/utils/trpc/trpcNext';
import ChatInterface from './components/ChatInterface';

const IndexPage = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const { data: user } = trpcNext.useQuery(['conversation.getConversationsByUser', userId], {
    enabled: !!userId,
  });

  useEffect(() => {
    // Generate a unique user ID for demo purposes
    const randomUserId = `user-${Date.now()}`;
    setUserId(randomUserId);
  }, []);

  if (!userId || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {userId}!</h1>
      <ChatInterface userId={userId} />
    </div>
  );
};

export default IndexPage;
