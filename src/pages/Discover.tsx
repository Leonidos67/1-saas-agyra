import React, { useState } from 'react';

interface Community {
  id: number;
  name: string;
  handle: string;
  description: string;
  members: number;
  category: string;
  avatar: string;
  isVerified: boolean;
}

const Discover: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const communities = [
    {
      id: 1,
      name: "Alpha Trading Vault",
      handle: "alphatrading",
      description: "Premium futures & technical analysis signals with high accuracy. We provide daily trading signals, market analysis, and educational content for traders of all levels. Join our community to stay ahead of the market.",
      members: 12480,
      category: "Futures",
      avatar: "https://i.pravatar.cc/150?img=3",
      isVerified: true,
    },
    {
      id: 2,
      name: "Memecoin Hunters",
      handle: "memehunters",
      description: "Early calls on Solana and Base memecoins. We find the next 100x memecoins before they pump. Our community has made significant profits from early entries.",
      members: 8730,
      category: "Memecoins",
      avatar: "https://i.pravatar.cc/150?img=45",
      isVerified: false,
    },
    {
      id: 3,
      name: "On-Chain Alpha",
      handle: "onchainalpha",
      description: "Smart money tracking and wallet analysis. Follow the whales and insiders with our advanced on-chain analytics tools.",
      members: 5420,
      category: "On-Chain",
      avatar: "https://i.pravatar.cc/150?img=67",
      isVerified: true,
    },
    {
      id: 4,
      name: "Airdrop University",
      handle: "airdropuni",
      description: "Best airdrop farming strategies and guides. Learn how to maximize your airdrop rewards with our proven strategies.",
      members: 15900,
      category: "Airdrops",
      avatar: "https://i.pravatar.cc/150?img=12",
      isVerified: true,
    },
  ];

  const filteredCommunities = communities.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (community: Community) => {
    setSelectedCommunity(community);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCommunity(null);
  };

  const handleJoin = () => {
    // Handle join logic here
    console.log(`Joining community: ${selectedCommunity?.name}`);
    closeModal();
  };

  return (
    <div className="px-6 py-4">
      <div className="mb-2 mt-6 text-center">
        <h1 className="text-4xl font-bold text-gray-900">Discover</h1>
        <p className="text-gray-600 mt-1">Find communities and creators worth following</p>
      </div>

      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search communities, traders, or keywords..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-xl px-5 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 mb-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCommunities.map((community) => (
          <div
            key={community.id}
            className="bg-white border border-gray-200 rounded-3xl p-4 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer"
            onClick={() => openModal(community)}
          >
            <div className="flex items-start gap-4">
              <img src={community.avatar} alt={community.name} className="w-14 h-14 rounded-full" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg">{community.name}</h3>
                  {community.isVerified && <span className="text-blue-500 text-lg">✓</span>}
                </div>
                <p className="text-gray-500">@{community.handle}</p>
                <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                  {community.description}
                </p>
              </div>
            </div>

            <button 
              className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-2xl transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                openModal(community);
              }}
            >
              View Community
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedCommunity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl animate-in slide-in-from-bottom-10 duration-300">
            {/* Modal Header */}
            <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="flex items-center gap-4">
                <img 
                  src={selectedCommunity.avatar} 
                  alt={selectedCommunity.name} 
                  className="w-16 h-16 rounded-full border-2 border-white"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold">{selectedCommunity.name}</h2>
                    {selectedCommunity.isVerified && <span className="text-white text-lg">✓</span>}
                  </div>
                  <p className="text-blue-100">@{selectedCommunity.handle}</p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">About</h3>
                <p className="text-gray-700 leading-relaxed">
                  {selectedCommunity.description}
                </p>
              </div>

              <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-2xl">
                <div>
                  <p className="text-xs text-gray-500">Members</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedCommunity.members.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Category</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedCommunity.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Verified</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedCommunity.isVerified ? 'Yes' : 'No'}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={handleJoin}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl transition-colors"
                >
                  Join Community
                </button>
                <button 
                  onClick={closeModal}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-2xl transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add line-clamp utility if not already in your CSS */}
      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Discover;