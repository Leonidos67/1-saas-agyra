// components/Layout/Header.tsx
import React from 'react';
import { Bell, MessageCircle, User } from 'lucide-react';
import SearchBar from '../Common/SearchBar';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onSearch?: (query: string, category?: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  return (
    <header className="bg-neutral-50 px-6 flex items-center justify-between flex-shrink-0 h-[60px]">
      <div className="flex-1 max-w-2xl">
        <SearchBar 
          onSearch={onSearch}
          placeholder="Search for communities, businesses, or people..."
        />
      </div>
      
      <div className="flex items-center space-x-2 ml-4">
        <Link to={"/messenger"} className="p-2 text-neutral-600 border hover:text-neutral-700 hover:bg-black/10 rounded-full active:scale-[0.95] transition-all">
          <MessageCircle className="h-5 w-5" />
        </Link>
        <button className="p-2 text-neutral-600 border hover:text-neutral-700 hover:bg-black/10 rounded-full active:scale-[0.95] transition-all">
          <Bell className="h-5 w-5" />
        </button>
        <button className="p-2 text-neutral-600 border hover:text-neutral-700 hover:bg-black/10 rounded-full active:scale-[0.95] transition-all">
          <User className="h-5 w-5" />
        </button>
        <Link to={"/dashboard"} className="text-neutral-600 border hover:text-neutral-700 hover:bg-black/10 rounded-full px-4 py-2 active:scale-[0.95] transition-all">
          Dashboard
        </Link>
      </div>
    </header>
  );
};

export default Header;