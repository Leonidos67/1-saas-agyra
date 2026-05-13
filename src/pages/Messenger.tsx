// pages/Messenger.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Search, Send, MoreVertical, Phone, Video, Info, ArrowLeft, Paperclip, Smile, Check, CheckCheck, Clock, MessageCircle, Lock, ChevronRight } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support' | 'mnoonx';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
}

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline?: boolean;
  messages: Message[];
  type: 'support' | 'official';
  isReadOnly?: boolean;
  officialChannel?: boolean;
}

const Messenger: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chats with welcome messages
  useEffect(() => {
    const hasReceivedMnoonxWelcome = localStorage.getItem('mnoonxWelcomeSent');
    const hasReceivedSupportWelcome = localStorage.getItem('supportWelcomeSent');
    
    const initialChats: Chat[] = [
      {
        id: 'mnoonx',
        name: "Team Mnoonx",
        avatar: "https://ui-avatars.com/api/?background=000000&color=fff&name=MN",
        lastMessage: "Welcome to MNOONX! Thousands of internet entrepreneurs like you...",
        lastMessageTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        unreadCount: hasReceivedMnoonxWelcome ? 0 : 1,
        isOnline: true,
        type: 'official',
        isReadOnly: true,
        officialChannel: true,
        messages: [
          {
            id: '1',
            text: "Welcome to MNOONX!\n\nThousands of internet entrepreneurs like you launch their businesses on MNOONX every day. You're just 3 steps away from joining them:\n\n1. Add apps to your mnoonx\n2. Set up Whop Payments\n3. Invite your first user\n\nIf you have any questions, please contact our Support Team.\n\nWe're excited to see what you build! 🚀",
            sender: 'mnoonx',
            timestamp: new Date(),
            status: 'read'
          }
        ]
      },
      {
        id: 'support',
        name: "Mnoonx Support",
        avatar: "https://ui-avatars.com/api/?background=6366f1&color=fff&name=MS",
        lastMessage: "Hello! I am a Mnoonx support bot. I will be glad to help you 🙂",
        lastMessageTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        unreadCount: hasReceivedSupportWelcome ? 0 : 1,
        isOnline: true,
        type: 'support',
        isReadOnly: false,
        messages: [
          {
            id: '1',
            text: "Hello! I am a Mnoonx support bot. I will be glad to help you 🙂\n\nI will tell you how to add and configure an organization's card, subscribe to an Advertising subscription, and answer your other questions about Mnoonx.\n\nChoose a suitable topic or write your question in the chat.",
            sender: 'support',
            timestamp: new Date(),
            status: 'read'
          }
        ]
      }
    ];

    setChats(initialChats);
    
    if (!hasReceivedMnoonxWelcome) {
      localStorage.setItem('mnoonxWelcomeSent', 'true');
    }
    if (!hasReceivedSupportWelcome) {
      localStorage.setItem('supportWelcomeSent', 'true');
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedChat?.messages]);

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedChat || selectedChat.isReadOnly) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
      status: 'sent'
    };

    const updatedChats = chats.map(chat => {
      if (chat.id === selectedChat.id) {
        return {
          ...chat,
          messages: [...chat.messages, newMsg],
          lastMessage: newMessage,
          lastMessageTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          unreadCount: 0
        };
      }
      return chat;
    });

    setChats(updatedChats);
    setSelectedChat(updatedChats.find(c => c.id === selectedChat.id) || null);
    setNewMessage('');

    // Auto-reply for support chat
    if (selectedChat.id === 'support') {
      setTimeout(() => {
        const autoReply: Message = {
          id: (Date.now() + 1).toString(),
          text: "Thanks for your message! Our support team will get back to you shortly. Typical response time is under 2 hours.\n\nIn the meantime, you can check our FAQ section for quick answers!",
          sender: 'support',
          timestamp: new Date(),
          status: 'delivered'
        };

        const updatedChatsWithReply = chats.map(chat => {
          if (chat.id === 'support') {
            const updatedMessages = [...chat.messages, newMsg, autoReply];
            return {
              ...chat,
              messages: updatedMessages,
              lastMessage: autoReply.text,
              lastMessageTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
          }
          return chat;
        });

        setChats(updatedChatsWithReply);
        setSelectedChat(updatedChatsWithReply.find(c => c.id === 'support') || null);
      }, 1000);
    }
  };

  const openChat = (chat: Chat) => {
    const updatedChats = chats.map(c => {
      if (c.id === chat.id) {
        return { ...c, unreadCount: 0 };
      }
      return c;
    });
    setChats(updatedChats);
    setSelectedChat({ ...chat, unreadCount: 0 });
  };

  const handleSupportLinkClick = () => {
    const supportChat = chats.find(c => c.id === 'support');
    if (supportChat) {
      openChat(supportChat);
    }
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatMessageTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = diff / (1000 * 60 * 60);
    
    if (hours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (hours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const getMessageStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'sent':
        return <Check className="h-3 w-3" />;
      case 'delivered':
        return <CheckCheck className="h-3 w-3" />;
      case 'read':
        return <CheckCheck className="h-3 w-3 text-blue-500" />;
      default:
        return <Clock className="h-3 w-3" />;
    }
  };

  const formatMessageText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      let formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>');
      
      if (line.match(/^\d+\./)) {
        return <div key={idx} className="flex items-start gap-2 mt-1">
          <ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <span dangerouslySetInnerHTML={{ __html: formattedLine.replace(/^\d+\.\s/, '') }} />
        </div>;
      }
      
      if (formattedLine.includes('Support Team')) {
        return <div key={idx} className="mt-2">
          <button 
            onClick={handleSupportLinkClick}
            className="text-blue-400 hover:text-blue-300 underline font-medium inline-flex items-center gap-1"
          >
            Support Team
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>;
      }
      
      if (formattedLine.trim() === '') return <div key={idx} className="h-2" />;
      
      return <div key={idx} dangerouslySetInnerHTML={{ __html: formattedLine }} className="mt-1" />;
    });
  };

  return (
    <div className="flex h-full">
      {/* Chat List Sidebar */}
      <div className="w-96 border-r border-neutral-200 flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-neutral-200 flex-shrink-0">
          <h1 className="text-xl font-semibold text-neutral-800">Messages</h1>
          <div className="mt-3 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {filteredChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => openChat(chat)}
              className={`w-full p-4 flex items-start gap-3 hover:bg-neutral-50 transition-colors border-b border-neutral-100 text-left ${
                selectedChat?.id === chat.id ? 'bg-neutral-50' : ''
              }`}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-12 h-12 rounded-full"
                />
                {chat.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-neutral-800 truncate">{chat.name}</h3>
                  <span className="text-xs text-neutral-400 flex-shrink-0 ml-2">{chat.lastMessageTime}</span>
                </div>
                <p className="text-sm text-neutral-500 truncate mt-1">{chat.lastMessage}</p>
              </div>
              {chat.unreadCount > 0 && (
                <div className="bg-black text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center flex-shrink-0">
                  {chat.unreadCount}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {selectedChat ? (
        <div className="flex-1 flex flex-col h-full">
          {/* Chat Header */}
          <div className="p-4 border-b border-neutral-200  flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <button className="lg:hidden flex-shrink-0" onClick={() => setSelectedChat(null)}>
                <ArrowLeft className="h-5 w-5" />
              </button>
              <img
                src={selectedChat.avatar}
                alt={selectedChat.name}
                className="w-10 h-10 rounded-full flex-shrink-0"
              />
              <div className="min-w-0">
                <h2 className="font-semibold text-neutral-800 truncate">{selectedChat.name}</h2>
                {selectedChat.isOnline && (
                  <p className="text-xs text-green-500">Online</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
                <Phone className="h-5 w-5 text-neutral-600" />
              </button>
              <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
                <Video className="h-5 w-5 text-neutral-600" />
              </button>
              <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
                <Info className="h-5 w-5 text-neutral-600" />
              </button>
              <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
                <MoreVertical className="h-5 w-5 text-neutral-600" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {selectedChat.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender !== 'user' && (
                  <img
                    src={selectedChat.avatar}
                    alt={message.sender === 'mnoonx' ? 'MNOONX' : 'Support'}
                    className="w-8 h-8 rounded-full mr-2 self-end flex-shrink-0"
                  />
                )}
                <div className={`max-w-[70%] ${message.sender === 'user' ? 'order-1' : ''}`}>
                  <div
                    className={`rounded-2xl px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-black text-white'
                        : message.sender === 'mnoonx'
                        ? 'bg-neutral-100 text-neutral-800'
                        : 'bg-neutral-100 text-neutral-800'
                    }`}
                  >
                    <div className="text-sm whitespace-pre-wrap break-words">
                      {message.sender === 'mnoonx' && message.id === '1' 
                        ? formatMessageText(message.text)
                        : message.text.split('\n').map((line, i) => (
                            <div key={i}>
                              {line}
                              {i < message.text.split('\n').length - 1 && <br />}
                            </div>
                          ))
                      }
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 mt-1 text-xs text-neutral-400 ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}>
                    <span>{formatMessageTime(message.timestamp)}</span>
                    {message.sender === 'user' && getMessageStatusIcon(message.status)}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input or Official Channel Footer */}
          {selectedChat.isReadOnly ? (
            <div className="border-t border-neutral-200 bg-neutral-50 flex-shrink-0">
              <div className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Lock className="h-4 w-4 text-neutral-500" />
                  <span className="text-sm font-medium text-neutral-600">Official MNOONX Channel</span>
                </div>
                <p className="text-xs text-neutral-500">
                  This is the official MNOONX notification channel.<br />
                  MNOONX will always use verified accounts to communicate with you.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex-shrink-0">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-black/5 rounded-full transition-colors flex-shrink-0">
                  <Paperclip className="h-5 w-5 text-neutral-600" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type a message..."
                    className="w-full px-4 py-2 border border-neutral-200 rounded-full focus:outline-none focus:ring-2 focus:ring-black/10 pr-12"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-black/5 rounded-full">
                    <Smile className="h-5 w-5 text-neutral-400" />
                  </button>
                </div>
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-10 w-10 text-neutral-400" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-800">Your Messages</h3>
            <p className="text-neutral-500 mt-1">Select a conversation to start chatting</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messenger;