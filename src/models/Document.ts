// src/models/Document.ts
export interface Document {
    id: string;
    title: string;
    content: string;
    tags?: string[];
  }