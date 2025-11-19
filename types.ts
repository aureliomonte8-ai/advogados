import React from 'react';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface PracticeArea {
  title: string;
  description: string;
  icon: React.ElementType;
}

export interface Lawyer {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}