// This is a custom hook that is used to fetch chat messages and send messages
// It is used in the Chatbot component
// It is also used in the Chatbot component to add a new message to the chat history
// This is the only place where the addChatMessage mutation is used
// The mutation is defined in the trpcContext.ts file
// services/utils/trpc/trpcContext.ts
import { trpcNext } from '../trpc/trpcNext';

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
