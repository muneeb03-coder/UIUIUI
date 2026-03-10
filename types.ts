import React from 'react';

export type Language = 'id' | 'en';

export interface Attachment {
  mimeType: string;
  data: string; // base64
  name?: string;
  type: 'image' | 'audio' | 'file';
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  attachments?: Attachment[];
}

export interface BenefitItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface StepItem {
  number: number;
  title: string;
  description: string;
}