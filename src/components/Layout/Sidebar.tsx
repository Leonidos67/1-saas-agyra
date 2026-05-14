import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { House, Compass, Users, Plus, LogIn, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const navItems = [
    { name: 'Home', icon: House, path: '/' },
    { name: 'Profile', icon: User, path: '/:username' },
    { name: 'Discover', icon: Compass, path: '/discover' },
  ];

  return (
    <div className="w-64 bg-neutral-50 border-r border-neutral-200 flex flex-col h-full">
      {/* Logo */}
      <div className="p-2 border-b border-neutral-200 active:scale-[0.99] duration-200">
        <Link to={"/"} className="flex items-center gap-2 text-2xl font-bold text-gray-900 ">
          <img 
            src="https://img.icons8.com/?size=100&id=ck3ZwyamgGAW&format=png&color=000000"
            className="w-8 h-8"
            alt=""
          />
          <span className="pixelify-logo">
            MNOONX
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all active:scale-[0.95] ${
                  location.pathname === item.path
                    ? 'bg-black/10'
                    : 'hover:bg-black/5'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* My Communities */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2 px-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">My Communities</h2>
          </div>

          <div className="space-y-1">
            <Link
              to="/community/web3-innovators"
              className="flex items-center gap-2 px-4 py-2 rounded-2xl hover:bg-neutral-100 text-neutral-700"
            >
              <Users className="w-4 h-4" />
              <span>Web3 Innovators</span>
            </Link>
          </div>

          <button 
            onClick={() => navigate("/new")}
            className="mt-2 w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl hover:rounded-2xl transition-colors"
          >
            <Plus className="w-5 h-5" />
            Start a Community
          </button>
        </div>
      </nav>

      {/* User section — кликабельный профиль */}
      <div className="p-2 border-t border-neutral-200">
        {user ? (
          <Link
            to={user.username ? `/@${user.username}` : '/settings'}
            className="flex items-center gap-2 px-2 py-1 border rounded-xl hover:bg-neutral-100 cursor-pointer transition-all active:scale-[0.98]"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-[#fef08a] via-[#84cc16] to-[#16a34a] rounded-full flex items-center justify-center text-white font-bold">
              {user.fullName?.charAt(0) || user.username?.charAt(0) || 'U'}
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">{user.username || 'User'}</p>
              <p className="text-xs text-neutral-500">@{user.email?.split('@')[0] || 'user'}</p>
            </div>
          </Link>
        ) : (
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('openLogin'))}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-neutral-300 rounded-xl hover:bg-neutral-100 transition-colors"
          >
            <LogIn className="w-5 h-5" />
            <span className="font-medium">Sign in</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;