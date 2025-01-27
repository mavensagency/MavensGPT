import { useState, useCallback } from 'react';
import { Message, ChatState } from '../types/chat';
import { getChatResponse } from '../services/gemini';
import { DEFAULT_GREETING } from '../config/constants';

export function useChat() {
  const [state, setState] = useState<ChatState>({
    messages: [
      {
        id: 1,
        text: DEFAULT_GREETING,
        isBot: true,
        timestamp: new Date().toLocaleTimeString(),
      },
    ],
    isLoading: false,
  });

  const addMessage = useCallback((message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      id: Date.now(), // Use timestamp for unique IDs
      timestamp: new Date().toLocaleTimeString(),
      ...message,
    };
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));
  }, []);

  const handleSendMessage = useCallback(async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    addMessage({ text: message, isBot: false });
    
    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      // Get AI response with timeout
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), 30000);
      });

      const response = await Promise.race([
        getChatResponse(message),
        timeoutPromise,
      ]);

      addMessage({ text: response, isBot: true });
    } catch (error) {
      let errorMessage = 'Sorry, I encountered an error. Please try again.';
      
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          errorMessage = 'API key error. Please check the configuration.';
        } else if (error.message.includes('timeout')) {
          errorMessage = 'Request timed out. Please try again.';
        }
      }

      addMessage({
        text: errorMessage,
        isBot: true,
      });
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, [addMessage]);

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    sendMessage: handleSendMessage,
  };
}