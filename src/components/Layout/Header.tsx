import React from 'react';
import { Bell, MessageCircle, LogIn } from 'lucide-react';
import SearchBar from '../Common/SearchBar';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  onSearch?: (query: string, category?: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const { user } = useAuth();

  return (
    <header className="bg-neutral-50 px-6 flex items-center justify-between flex-shrink-0 h-[60px]">
      <div className="flex-1 max-w-2xl">
        <SearchBar 
          onSearch={onSearch}
          placeholder="Search for communities, businesses, or people..."
        />
      </div>
      
      <div className="flex items-center space-x-2 ml-4">
        <Link 
          to="/messenger" 
          className="p-2 text-neutral-600 border hover:text-neutral-700 hover:bg-black/10 rounded-full active:scale-[0.95] transition-all"
        >
          <MessageCircle className="h-5 w-5" />
        </Link>
        <Link 
          to="/notifications" 
          className="p-2 text-neutral-600 border hover:text-neutral-700 hover:bg-black/10 rounded-full active:scale-[0.95] transition-all">
          <Bell className="h-5 w-5" />
        </Link>
        <button className="py-2 px-4 font-simebold text-neutral-600 border hover:text-neutral-700 hover:bg-black/10 rounded-full active:scale-[0.95] transition-all">
          Go to Dashboard
        </button>

        {user ? (
          <div className="flex items-center gap-3 pl-3 border-l border-neutral-200">
            <img 
              src={user.avatar || `https://i.pravatar.cc/150?u=${user.email}`} 
              alt={user.username}
              className="w-8 h-8 rounded-full"
            />
            <div className="hidden md:block">
              <p className="text-sm font-medium">{user.username}</p>
            </div>
          </div>
        ) : (
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('openLogin'))}
            className="flex items-center gap-2 px-5 py-2 border border-neutral-300 hover:bg-black hover:text-white rounded-xl transition-all active:scale-[0.95]"
          >
            <LogIn className="h-5 w-5" />
            <span className="font-medium">Sign in</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;