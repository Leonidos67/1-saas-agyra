import React, { useState } from 'react';
import SearchBar from '../Common/SearchBar';

const TicketsLayout: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const communities = [
    {
      id: 1,
      name: "Alpha Trading Vault",
      handle: "@alphatrading",
      description: "Premium futures & technical analysis signals",
      members: 12480,
      category: "Futures",
      avatar: "https://i.pravatar.cc/150?img=3",
      isVerified: true,
    },
    {
      id: 2,
      name: "Memecoin Hunters",
      handle: "@memehunters",
      description: "Early calls on Solana memecoins",
      members: 8730,
      category: "Memecoins",
      avatar: "https://i.pravatar.cc/150?img=45",
      isVerified: false,
    },
    {
      id: 3,
      name: "On-Chain Alpha",
      handle: "@onchainalpha",
      description: "Smart money tracking & wallet analysis",
      members: 5420,
      category: "On-Chain",
      avatar: "https://i.pravatar.cc/150?img=67",
      isVerified: true,
    },
    {
      id: 4,
      name: "Airdrop University",
      handle: "@airdropuni",
      description: "Best airdrop farming strategies",
      members: 15900,
      category: "Airdrops",
      avatar: "https://i.pravatar.cc/150?img=12",
      isVerified: true,
    },
  ];

  const filteredCommunities = communities.filter(community =>
    community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    community.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className=" mx-auto px-0 py-0">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Discover</h1>
        <p className="text-gray-600 mt-1">Find communities and creators worth following</p>
      </div>

      {/* Search Bar */}
      <div className="mb-10">
        <SearchBar 
          value={searchQuery} 
          onChange={setSearchQuery} 
          placeholder="Search communities, traders, or keywords..." 
        />
      </div>

      {/* Communities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCommunities.map((community) => (
          <div
            key={community.id}
            className="bg-white border border-gray-200 rounded-3xl p-6 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-start gap-4">
              <img
                src={community.avatar}
                alt={community.name}
                className="w-14 h-14 rounded-2xl"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg truncate">{community.name}</h3>
                  {community.isVerified && <span className="text-blue-500">✓</span>}
                </div>
                <p className="text-gray-500 text-sm">{community.handle}</p>
                <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                  {community.description}
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Members</p>
                <p className="font-semibold text-gray-900">
                  {community.members.toLocaleString()}
                </p>
              </div>
              <span className="text-xs font-medium px-4 py-1.5 bg-gray-100 rounded-2xl">
                {community.category}
              </span>
            </div>

            <button className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-2xl transition-colors">
              Join Community
            </button>
          </div>
        ))}
      </div>

      {filteredCommunities.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No communities found for "{searchQuery}"
        </div>
      )}
    </div>
  );
};

export default TicketsLayout;