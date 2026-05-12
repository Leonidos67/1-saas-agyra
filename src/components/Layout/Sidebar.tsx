import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Compass,
  LogOut,
  HouseHeart,
  SendHorizontal,
  Plus,
  Users as UsersIcon
} from 'lucide-react';
import { View } from '../../types';
import { mockViews } from '../../data/mockData';

interface SidebarProps {
  views?: View[];
}

const Sidebar: React.FC<SidebarProps> = ({ views = mockViews }) => {
  const location = useLocation();
  const [ setExpandedSections] = useState<Record<string, boolean>>({
    tickets: true,
    views: true,
    categories: false,
    priorities: false,
    communities: true
  });

  const navItems = [
    { name: 'Home', icon: HouseHeart, path: '/' },
    { name: 'Discover', icon: Compass, path: '/app' },
    { name: 'Airdrop Hub', icon: SendHorizontal, path: '/ai-agent' },
  ];

  // Пример сообществ (можно заменить на реальные данные)
  const myCommunities = [
    { name: 'Web3 Innovators', members: 234, path: '/community/web3' },
  ];

  return (
    <div className="w-64 bg-neutral-50 flex flex-col h-full">
      {/* Navigation */}
      <nav className="flex-1 py-2 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center p-3 rounded-xl transition-all duration-200 active:bg-black/10 active:scale-95 ${
                  location.pathname === item.path
                    ? 'bg-black/10 font-semibold' 
                    : 'hover:bg-black/5'
                  }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* My Communities Section */}
        <div className="mt-2 px-2">
          <div className="flex items-center justify-between px-2 py-2">
            <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              My Communities
            </h2>
          </div>

          {/* Communities List */}
          <ul className="mt-1 space-y-1">
            {myCommunities.map((community) => (
              <li key={community.name}>
                <Link
                  to={community.path}
                  className={`flex items-center justify-between p-2 rounded-xl hover:bg-black/5 transition-colors ${
                    location.pathname === community.path ? 'bg-black/10 font-medium' : ''
                  }`}
                >
                  <div className="flex items-center">
                    <div className='bg-black/10 p-1 rounded-md mr-2'>
                      <UsersIcon className="h-4 w-4 text-neutral-500" />
                    </div>
                    <span className="text-sm">{community.name}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {/* Start a Community Button */}
          <button className="mt-2 flex items-center px-3 py-1 rounded-md transition-colors bg-black text-white font-semibold">
            <Plus className="h-4 w-4 mr-1" />
            <span>Start a Community</span>
          </button>
        </div>
        
      </nav>
    </div>
  );
};

export default Sidebar;