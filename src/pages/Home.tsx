import React, { useState } from 'react';
import { MessageCircle, Heart, Repeat2, Bookmark, Share, ArrowLeft, X, MoreHorizontal } from 'lucide-react';

const Home: React.FC = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const mockPosts = [
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
      ticker: "SOL"
    }
  ];

  return (
    <div className="max-w-[1200px] mx-auto flex gap-6 px-0 py-4">
      {/* Центральная колонка */}
      <div className="flex-1 max-w-[620px]">
        {/* Табы */}
        <div className="flex mb-6 border-b border-gray-200">
          <button className="px-6 py-2.5 bg-gray-100 font-medium">Everyone</button>
          <button className="px-6 py-2.5 text-gray-600 hover:bg-gray-50 font-medium">Following</button>
          <button className="px-6 py-2.5 text-gray-600 hover:bg-gray-50 font-medium">My Communities</button>
        </div>

        {/* Create Post */}
        {!isCreateOpen ? (
          <div 
            onClick={() => setIsCreateOpen(true)}
            className="bg-white border border-gray-200 hover:border-gray-300 rounded-3xl p-5 mb-6 shadow-sm flex items-center gap-4 cursor-pointer transition-all hover:shadow"
          >
            <div className="w-11 h-11 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl font-light">+</div>
            <div>
              <p className="font-medium text-gray-800">Create a post</p>
              <p className="text-sm text-gray-500">Share signals, thoughts or analysis</p>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-3xl p-6 mb-8 shadow-sm relative">
            <button onClick={() => setIsCreateOpen(false)} className="absolute top-5 right-5 text-gray-400 hover:text-gray-700">
              <X size={26} />
            </button>
            <textarea
              placeholder="Drop something worth talking about..."
              className="w-full bg-transparent text-[17px] placeholder-gray-400 focus:outline-none resize-none min-h-[120px]"
            />
            <div className="flex justify-end mt-6 pt-4 border-t border-gray-100">
              <button className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl">
                Post
              </button>
            </div>
          </div>
        )}

        {/* Posts Feed */}
        <div className="space-y-6">
          {mockPosts.map(post => (
            <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className={`bg-white border rounded-3xl transition-all duration-200 p-6 cursor-pointer
                    ${
                    selectedPost?.id === post.id
                        ? 'bg-gray-50'
                        : 'border-gray-200'
                    }
                `}
                >
              <div className="flex gap-4">
                <img src={post.avatar} className="w-11 h-11 rounded-full" alt="" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{post.author}</span>
                    <span className="text-gray-500">{post.handle}</span>
                    <span className="text-gray-400">· {post.time}</span>
                  </div>
                  {post.ticker && <span className="text-blue-600 text-sm font-medium">{post.ticker}</span>}
                  <p className="mt-3 text-[15.5px] leading-relaxed text-gray-800">{post.content}</p>
                  {post.image && <img src={post.image} className="mt-4 rounded-2xl" alt="" />}

                  <div className="flex gap-4 mt-6 text-gray-500">
                    <button className="flex items-center gap-2 active:scale-[0.95]"><Heart size={20} /></button>
                    <button className="flex items-center gap-2 active:scale-[0.95]"><MessageCircle size={20} /></button>
                    <button className="flex items-center gap-2 active:scale-[0.95]"><Repeat2 size={20} /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Правый блок */}
      <div className="w-[380px] hidden lg:block">
        <div className="sticky top-6 h-[calc(100vh-100px)]">
          {selectedPost ? (
            <div className="bg-white border border-gray-200 rounded-3xl h-full flex flex-col">
              <div className="p-5 border-b">
                <button onClick={() => setSelectedPost(null)} className="text-gray-500 hover:text-black">← Back</button>
              </div>
              <div className="p-6 flex-1 overflow-auto">
                <p>{selectedPost.content}</p>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-3xl h-full flex items-center justify-center text-gray-500">
              Select a post to view thread
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;