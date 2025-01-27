import React from 'react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { MessageSquare } from 'lucide-react';
import { useChat } from './hooks/useChat';

function App() {
  const { messages, isLoading, sendMessage } = useChat();

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-blue-500" />
          <h1 className="text-xl font-semibold">Mavens AI Chat</h1>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.text}
              isBot={message.isBot}
              timestamp={message.timestamp}
            />
          ))}
          {isLoading && (
            <div className="p-4 text-center text-gray-500">
              AI is thinking...
            </div>
          )}
        </div>
      </div>

      {/* Chat Input */}
      <ChatInput onSendMessage={sendMessage} disabled={isLoading} />
    </div>
  );
}

export default App;