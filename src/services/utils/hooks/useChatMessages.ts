import { trpcNext } from '../trpc/trpcNext';
import superjson from 'superjson';

export const useChatMessages = () => {
  const sendMessage = trpcNext.chatbot.sendMessage.useMutation();
  const addChatMessage = trpcNext.chatbot.addChatMessage.useMutation(); // Add this line
  const getChatHistory = (conversationId: string) => {
    const query = trpcNext.chatbot.getChatMessagesByConversation.useQuery(conversationId, {
    });
    return {
      data: query.data,
      refetch: query.refetch,
    };
  };

  return { sendMessage, getChatHistory, addChatMessage }; // Include addChatMessage here
};
