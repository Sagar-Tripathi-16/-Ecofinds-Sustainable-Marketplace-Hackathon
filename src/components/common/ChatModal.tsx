import React, { useState, useRef, useEffect } from 'react';
import { X, Send, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Message } from '../../types';

export const ChatModal: React.FC = () => {
  const { state, dispatch } = useApp();
  const { isChatOpen, chatWithUser, theme, currentUser } = state;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: chatWithUser || '',
      receiverId: currentUser?.id || '',
      content: "Hello! I'm interested in your product. Is it still available?",
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: '2',
      senderId: currentUser?.id || '',
      receiverId: chatWithUser || '',
      content:
        "Yes, it's still available! Would you like to know more details?",
      timestamp: new Date(Date.now() - 240000),
    },
    {
      id: '3',
      senderId: chatWithUser || '',
      receiverId: currentUser?.id || '',
      content: 'Great! Can you tell me about the condition?',
      timestamp: new Date(Date.now() - 180000),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() && currentUser) {
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: currentUser.id,
        receiverId: chatWithUser || '',
        content: message,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newMessage]);
      setMessage('');

      // Simulate response after 1 second
      setTimeout(() => {
        const response: Message = {
          id: (Date.now() + 1).toString(),
          senderId: chatWithUser || '',
          receiverId: currentUser.id,
          content: "Thanks for your message! I'll get back to you soon.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, response]);
      }, 1000);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isChatOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
        onClick={() => dispatch({ type: 'TOGGLE_CHAT' })}
      />

      {/* Chat Modal */}
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md h-96 z-50 rounded-2xl shadow-2xl ${
          theme === 'dark'
            ? 'bg-gray-900 border-gray-700'
            : 'bg-white border-gray-200'
        } border flex flex-col`}
      >
        {/* Header */}
        <div
          className={`p-4 border-b flex items-center justify-between ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3
                className={`font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                Chat with Seller
              </h3>
              <p
                className={`text-sm ${
                  theme === 'dark' ? 'text-green-400' : 'text-green-600'
                }`}
              >
                Online now
              </p>
            </div>
          </div>
          <button
            onClick={() => dispatch({ type: 'TOGGLE_CHAT' })}
            className={`p-2 rounded-full transition-colors ${
              theme === 'dark'
                ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.senderId === currentUser?.id
                  ? 'justify-end'
                  : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl ${
                  msg.senderId === currentUser?.id
                    ? 'bg-green-500 text-white'
                    : theme === 'dark'
                    ? 'bg-gray-800 text-gray-200'
                    : 'bg-gray-200 text-gray-900'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <p
                  className={`text-xs mt-1 ${
                    msg.senderId === currentUser?.id
                      ? 'text-green-100'
                      : theme === 'dark'
                      ? 'text-gray-400'
                      : 'text-gray-500'
                  }`}
                >
                  {formatTime(msg.timestamp)}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div
          className={`p-4 border-t ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          }`}
        >
          <div className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className={`flex-1 px-4 py-2 rounded-full border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-green-500'
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-green-500'
              }`}
            />
            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
