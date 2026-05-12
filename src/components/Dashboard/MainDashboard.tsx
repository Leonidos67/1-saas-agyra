import React, { useState } from 'react';
import AppLayout from '../Layout/AppLayout';
import { MessageCircle, Heart, Repeat2, Bookmark, Share, ArrowLeft, X } from 'lucide-react';

interface Post {
  id: number;
  author: string;
  avatar: string;
  handle: string;
  time: string;
  content: string;
  image?: string;
  likes: number;
  reposts: number;
  comments: number;
  type: 'signal' | 'post' | 'lecture';
  ticker?: string;
}

const mockPosts: Post[] = [
  {
    id: 1,
    author: "0xVitalik",
    avatar: "https://i.pravatar.cc/150?img=1",
    handle: "@0xVitalik",
    time: "12m",
    content: "BTC готовится к прорыву $112k. На дневном графике формируется бычий флаг. Цель — $118k-$122k в ближайшие 3-4 недели.",
    image: "https://picsum.photos/id/1015/800/450",
    likes: 1240,
    reposts: 234,
    comments: 87,
    type: "signal",
    ticker: "BTC"
  },
  {
    id: 2,
    author: "CryptoWhale",
    avatar: "https://i.pravatar.cc/150?img=68",
    handle: "@CryptoWhale",
    time: "47m",
    content: "Зашёл в SOL long с левериджем 15x. Entry 178.40$. TP1 185$, TP2 192$. SL 172$.",
    likes: 342,
    reposts: 98,
    comments: 54,
    type: "signal",
    ticker: "SOL"
  },
  {
    id: 3,
    author: "Alpha Analyst",
    avatar: "https://i.pravatar.cc/150?img=12",
    handle: "@AlphaAnalyst",
    time: "2h",
    content: "Подробный разбор токеномики LayerZero V2. Почему токен может сделать x8–12 при успешном запуске.",
    image: "https://picsum.photos/id/237/800/450",
    likes: 678,
    reposts: 145,
    comments: 92,
    type: "lecture"
  },
];

const MainDashboard: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'everyone' | 'following' | 'communities'>('everyone');

  return (
    <AppLayout title="Home">
      <div className="max-w-[1200px] mx-auto flex gap-6">
        
        {/* Центральная колонка */}
        <div className="flex-1 max-w-[620px]">
          
          {/* Табы фильтрации постов */}
          <div className="flex gap-2 mb-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('everyone')}
              className={`px-6 py-2 font-medium transition-all ${
                activeTab === 'everyone' 
                  ? 'bg-black/5' 
                  : 'text-black'
              }`}
            >
              Everyone
            </button>
            <button
              onClick={() => setActiveTab('following')}
              className={`px-6 py-2 font-medium transition-all ${
                activeTab === 'following' 
                  ? 'bg-black/5' 
                  : 'text-black'
              }`}
            >
              Following
            </button>
            <button
              onClick={() => setActiveTab('communities')}
              className={`px-6 py-2 font-medium transition-all ${
                activeTab === 'communities' 
                  ? 'bg-black/5' 
                  : 'text-black'
              }`}
            >
              My Communities
            </button>
          </div>

          {/* Кнопка создания поста */}
          {!isCreateOpen ? (
            <div 
              onClick={() => setIsCreateOpen(true)}
              className="bg-white border border-gray-200 hover:border-gray-300 rounded-3xl p-4 mb-6 shadow-sm flex items-center gap-4 cursor-pointer transition-all hover:shadow"
            >
              <div className="w-11 h-11 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl font-light">
                +
              </div>
              <div>
                <p className="font-medium text-gray-800">Create a post</p>
                <p className="text-sm text-gray-500">Share signals, thoughts or analysis</p>
              </div>
            </div>
          ) : (
            /* Блок создания поста */
            <div className="bg-white border border-gray-200 rounded-3xl p-6 mb-4 shadow-sm relative">
              <button
                onClick={() => setIsCreateOpen(false)}
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-700"
              >
                <X size={26} />
              </button>

              <div className="flex gap-4">
                <textarea
                  placeholder="Drop something worth talking about..."
                  className="flex-1 bg-transparent text-[17px] placeholder-gray-400 focus:outline-none resize-none min-h-[110px] mt-1"
                />
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-100">
                <button className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl transition-colors">
                  Post
                </button>
              </div>
            </div>
          )}

          {/* Лента постов */}
          <div className="space-y-6">
            {mockPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="bg-white border border-gray-200 rounded-3xl p-6 hover:border-gray-300 hover:shadow transition-all cursor-pointer"
              >
                <div className="flex gap-4">
                  <img
                    src={post.avatar}
                    alt={post.author}
                    className="w-11 h-11 rounded-full flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">{post.author}</span>
                      <span className="text-gray-500">{post.handle}</span>
                      <span className="text-gray-400">·</span>
                      <span className="text-gray-500">{post.time}</span>
                    </div>

                    {post.ticker && (
                      <span className="inline-block mt-1 px-3 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-full">
                        {post.ticker}
                      </span>
                    )}

                    <p className="mt-3 text-[15.5px] leading-relaxed text-gray-800">
                      {post.content}
                    </p>

                    {post.image && (
                      <img
                        src={post.image}
                        className="mt-4 rounded-2xl w-full"
                        alt="post"
                      />
                    )}

                    {/* === ИЗМЕНЁННЫЙ БЛОК ДЕЙСТВИЙ === */}
                    <div className="flex items-center justify-start gap-8 mt-6 text-gray-500">
                      <button 
                        onClick={(e) => { e.stopPropagation(); alert('Comment'); }}
                        className="flex items-center gap-2 hover:text-blue-600 transition-colors"
                      >
                        <MessageCircle size={20} /> 
                        <span>{post.comments}</span>
                      </button>

                      <button 
                        onClick={(e) => { e.stopPropagation(); alert('Repost'); }}
                        className="flex items-center gap-2 hover:text-green-600 transition-colors"
                      >
                        <Repeat2 size={20} /> 
                        <span>{post.reposts}</span>
                      </button>

                      <button 
                        onClick={(e) => { e.stopPropagation(); alert('Like'); }}
                        className="flex items-center gap-2 hover:text-red-600 transition-colors"
                      >
                        <Heart size={20} /> 
                        <span>{post.likes}</span>
                      </button>

                      <button 
                        onClick={(e) => { e.stopPropagation(); alert('Bookmark'); }}
                        className="hover:text-gray-700 transition-colors"
                      >
                        <Bookmark size={20} />
                      </button>

                      <button 
                        onClick={(e) => { e.stopPropagation(); alert('Share'); }}
                        className="hover:text-gray-700 transition-colors"
                      >
                        <Share size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Правый блок */}
        <div className="w-[380px] hidden lg:block">
          <div className="sticky top-6 h-[calc(100vh-110px)] flex flex-col">
            {selectedPost ? (
              <div className="bg-white border border-gray-200 rounded-3xl shadow-sm flex-1 flex flex-col overflow-hidden">
                <div className="p-5 border-b">
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-900"
                  >
                    <ArrowLeft size={18} />
                    Back to feed
                  </button>
                </div>

                <div className="p-6 flex-1 overflow-auto">
                  <p className="text-[15.5px] leading-relaxed text-gray-800">
                    {selectedPost.content}
                  </p>
                  {selectedPost.image && (
                    <img src={selectedPost.image} className="mt-5 rounded-2xl" alt="" />
                  )}
                </div>

                <div className="p-6 border-t bg-gray-50 flex-1 overflow-auto">
                  <h3 className="font-medium mb-4">Comments ({selectedPost.comments})</h3>
                  <div className="space-y-5 text-sm">
                    <div>
                      <span className="font-medium">@smartmoneyflow</span>
                      <p className="text-gray-600 mt-1">Very strong analysis</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-3xl p-8 text-center h-full flex flex-col justify-center">
                <p className="text-gray-500">Select a post to view the thread</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default MainDashboard;