import { prisma } from '../../prisma/prisma';
import { ChatSession } from '../models/ChatSession';

export async function createChatSession(userId: string): Promise<ChatSession> {
  return await prisma.chatSession.create({
    data: {
      userId,
    },
  });
}

export async function getChatSession(id: string): Promise<ChatSession | null> {
  return await prisma.chatSession.findUnique({
    where: { id },
  });
}

export async function updateChatSession(id: string, data: Partial<ChatSession>): Promise<ChatSession | null> {
  return await prisma.chatSession.update({
    where: { id },
    data,
  });
}

export async function deleteChatSession(id: string): Promise<boolean> {
  await prisma.chatSession.delete({
    where: { id },
  });
  return true;
}
