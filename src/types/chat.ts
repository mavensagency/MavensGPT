export interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: string;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
}