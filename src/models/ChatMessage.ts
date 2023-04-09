// src/models/ChatMessage.ts
export interface ChatMessage {
    id: string;
    sessionId: string;
    userId: string;
    content: string;
    timestamp: Date;
    responseType: 'original' | 'GPT-response';
  }
  