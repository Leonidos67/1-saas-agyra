import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Home,
  Plus,
  Search,
  MoreHorizontal,
  Shield,
  Bell,
  UserPlus,
  Copy,
  MessageCircle,
  Package,
  Info,
  House,
  HouseHeart,
} from "lucide-react";

const CommunityPage: React.FC = () => {
  const { handle } = useParams<{ handle: string }>();
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen">
      <div className="max-w-[1600px] mx-auto grid grid-cols-[320px_1fr_360px] gap-4 p-2">
        {/* LEFT SIDEBAR */}
        <div className="bg-white border border-[#e7e7e7] rounded-[32px] h-[calc(100vh-70px)] sticky top-0 overflow-hidden">
          <div className="p-5 border-b border-[#ececec]">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#f3f3f3] flex items-center justify-center font-semibold">
                A
              </div>

              <div>
                <h2 className="font-semibold text-[18px] leading-none">
                  @{handle}
                </h2>

                <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-sm text-green-600">
                            1 online
                        </span>
                    </div>
                </div>
            </div>
          </div>

          {/* NAVIGATION */}
          <div className="p-1 space-y-1">
            <button className="w-full h-8 rounded bg-[#eef2ff] text-[#315efb] flex items-center gap-2 px-3 font-medium">
              <HouseHeart size={18} />
              Home
            </button>

            <button className="w-full h-8 rounded hover:bg-[#f5f5f5] flex items-center gap-2 px-3 text-[#666] font-medium transition-all">
              <Plus size={18} />
              Add app
            </button>
          </div>
        </div>

        {/* CENTER */}
        <div className="space-y-4">
          {/* HEADER */}
          <div className="bg-white border border-[#e7e7e7] rounded-[32px] overflow-hidden">
            {/* BANNER */}
            <div className="h-[250px] bg-[#ececec] relative">
              <button className="absolute top-5 right-5 h-11 px-5 rounded-2xl bg-white/90 backdrop-blur border border-white font-medium hover:bg-white transition-all">
                Edit banner
              </button>
            </div>

            {/* COMMUNITY INFO */}
            <div className="px-7 pb-7 relative">
              <div className="w-[120px] h-[120px] rounded-[36px] bg-[#f3f3f3] border-[6px] border-white absolute -top-16 flex items-center justify-center text-5xl font-semibold">
                A
              </div>

              <div className="pt-16 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-[42px] tracking-[-0.05em] leading-none font-semibold">
                      @{handle}
                    </h1>

                    <button className="h-9 px-4 rounded-xl border border-[#e5e5e5] text-sm font-medium hover:bg-[#f5f5f5] transition-all">
                      Edit
                    </button>
                  </div>

                  <p className="text-[#888] text-[18px] mt-5 italic">
                    Set a description...
                  </p>

                  <div className="flex items-center gap-3 mt-5 text-[15px] text-[#666] flex-wrap">
                    <span>📍 Enschede, NL</span>

                    <span>•</span>

                    <button className="hover:text-black transition-all">
                      + Add social links
                    </button>

                    <span>•</span>

                    <span>
                      Created by <b>MakTraxer</b>
                    </span>
                  </div>

                  <p className="mt-5 text-[16px] text-[#444]">
                    0 members
                  </p>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-3">
                  <button className="w-12 h-12 rounded-2xl bg-[#f5f5f5] hover:bg-[#ececec] flex items-center justify-center transition-all">
                    <UserPlus size={20} />
                  </button>

                  <button className="w-12 h-12 rounded-2xl bg-[#f5f5f5] hover:bg-[#ececec] flex items-center justify-center transition-all">
                    <Bell size={20} />
                  </button>

                  <button className="h-12 px-5 rounded-2xl bg-[#edf2ff] text-[#315efb] font-medium hover:bg-[#dfe7ff] transition-all flex items-center gap-2">
                    Add team
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              {/* TABS */}
              <div className="flex gap-10 mt-10 border-b border-[#ececec]">
                {[
                  {
                    key: "home",
                    label: "Home",
                  },
                  {
                    key: "chats",
                    label: "Chats",
                  },
                  {
                    key: "apps",
                    label: "Apps",
                  },
                  {
                    key: "products",
                    label: "Products",
                  },
                  {
                    key: "about",
                    label: "About",
                  },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`pb-5 text-[17px] font-medium border-b-2 transition-all ${
                      activeTab === tab.key
                        ? "border-[#315efb] text-black"
                        : "border-transparent text-[#777]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CREATE POST */}
          <div className="bg-white border border-[#e7e7e7] rounded-[32px] overflow-hidden">
            <div className="p-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-[#ececec] flex-shrink-0" />

                <div className="flex-1">
                  <input
                    placeholder="What's on your mind?"
                    className="w-full h-12 bg-transparent outline-none text-[18px] placeholder:text-[#999]"
                  />

                  <div className="flex justify-between items-center mt-6">
                    <div className="flex gap-5 text-[#315efb] text-xl">
                      <button>🖼️</button>
                      <button>😊</button>
                      <button>📊</button>
                      <button>💰</button>
                    </div>

                    <div className="flex items-center gap-3">
                      <button className="h-11 px-5 rounded-2xl bg-[#ffe9ea] text-[#e5484d] font-medium">
                        🎥 Go live
                      </button>

                      <button className="h-11 px-6 rounded-2xl bg-[#315efb] text-white font-medium">
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EMPTY STATE */}
          <div className="bg-white border border-[#e7e7e7] rounded-[32px] h-[300px] flex items-center justify-center text-[#999] text-[17px]">
            Community feed is empty
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-4">
          {/* SEARCH */}
          <div className="bg-white border border-[#e7e7e7] rounded-[24px] p-4">
            <div className="h-12 rounded-2xl bg-[#f5f5f5] px-4 flex items-center gap-3">
              <Search size={18} className="text-[#777]" />

              <input
                placeholder={`Search ${handle}`}
                className="bg-transparent outline-none flex-1 text-[15px]"
              />

              <span className="text-[#999] text-sm">
                ⌘K
              </span>
            </div>

            <div className="mt-6 space-y-5">
              <button className="flex items-center gap-3 text-[16px] text-[#444] hover:text-black transition-all">
                <Package size={18} />
                Products
              </button>

              <button className="flex items-center gap-3 text-[16px] text-[#444] hover:text-black transition-all">
                📣 Ads
              </button>

              <button className="flex items-center gap-3 text-[16px] text-[#444] hover:text-black transition-all">
                🤝 Affiliates
              </button>
            </div>
          </div>

          {/* PEOPLE */}
          <div className="bg-white border border-[#e7e7e7] rounded-[32px] overflow-hidden">
            <div className="p-6 border-b border-[#ececec] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-[20px] font-semibold">
                  People
                </h3>

                <span className="text-[#888]">
                  0
                </span>
              </div>

              <button className="text-[#315efb] font-medium">
                See all
              </button>
            </div>

            <div className="p-6">
              <p className="text-sm tracking-[0.08em] text-[#999] uppercase mb-5">
                Team
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#5d6472] flex items-center justify-center text-white text-lg">
                    MA
                  </div>

                  <div>
                    <p className="font-medium">
                      MakTraxer
                    </p>

                    <p className="text-sm text-[#777]">
                      @maktraxer
                    </p>
                  </div>
                </div>

                <div className="px-3 h-8 rounded-full bg-[#f5f5f5] flex items-center text-sm font-medium">
                  staff
                </div>
              </div>

              <button className="w-full h-12 rounded-2xl bg-[#f5f5f5] hover:bg-[#ececec] transition-all mt-6 font-medium flex items-center justify-center gap-2">
                <Copy size={16} />
                Copy invite link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;