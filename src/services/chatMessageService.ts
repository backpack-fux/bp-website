import { prisma } from '../../prisma/prisma';
import { ChatMessage } from '../models/ChatMessage';

export const createChatMessage = async (data: Omit<ChatMessage, 'id'>): Promise<ChatMessage> => {
  const createdChatMessage = await prisma.chatMessage.create({ data });
  return createdChatMessage as ChatMessage;
};

export const getChatMessage = async (id: string): Promise<ChatMessage | null> => {
  const chatMessage = await prisma.chatMessage.findUnique({ where: { id } });
  return chatMessage as ChatMessage | null;
};

export const updateChatMessage = async (id: string, data: Partial<ChatMessage>): Promise<ChatMessage | null> => {
  const updatedChatMessage = await prisma.chatMessage.update({ where: { id }, data });
  return updatedChatMessage as ChatMessage | null;
};

export const deleteChatMessage = async (id: string): Promise<boolean> => {
  await prisma.chatMessage.delete({ where: { id } });
  return true;
};
