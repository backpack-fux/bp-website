// hooks/useChatMessages.ts
import { trpcNext } from '../trpc/trpcNext';

export const useChatMessages = () => {
  const sendMessage = (trpcNext as any).useMutation('chatmessage.sendMessage');
  const getChatHistory = (trpcNext as any).useQuery;

  return { sendMessage, getChatHistory };
};
