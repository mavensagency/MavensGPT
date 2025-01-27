import React from 'react';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp: string;
}

export function ChatMessage({ message, isBot, timestamp }: ChatMessageProps) {
  return (
    <div className={`flex gap-4 p-6 ${isBot ? 'bg-gray-50' : 'bg-white'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isBot ? 'bg-green-500' : 'bg-blue-500'}`}>
        {isBot ? <Bot className="w-5 h-5 text-white" /> : <User className="w-5 h-5 text-white" />}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{isBot ? 'AI Assistant' : 'You'}</span>
          <span className="text-sm text-gray-500">{timestamp}</span>
        </div>
        <p className="mt-1 text-gray-700 leading-relaxed">{message}</p>
      </div>
    </div>
  );
}