// src/models/Batch.ts
export interface Batch {
    id: string;
    messages: string[];
    status: 'pending' | 'processing' | 'completed';
  }