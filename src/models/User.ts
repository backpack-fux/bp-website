// src/models/User.ts
export interface User {
    id: string;
    name: string;
    email: string;
    role: 'visitor' | 'customer' | 'builder' | 'community';
  }