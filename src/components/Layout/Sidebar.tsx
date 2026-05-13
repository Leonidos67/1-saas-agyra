import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import { House, Compass, Users, Plus, LogOut, Bold, Bolt } from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', icon: House, path: '/' },
    { name: 'Discover', icon: Compass, path: '/discover' },
  ];

  return (
    <div className="w-64 bg-neutral-50 border-r border-neutral-200 flex flex-col h-full">
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
        <div className="mt-4 px-2">
          <div className="flex items-center justify-between mb-2">
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

          <button onClick={() => navigate("/new")}  className="mt-2 w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl hover:rounded-2xl transition-colors">
            <Plus className="w-5 h-5" />
            Start a Community
          </button>
        </div>
      </nav>

      {/* User section */}
      <div className="p-2 border-t border-neutral-200">
        <div className="flex items-center gap-2 px-2 py-1 border rounded-xl hover:bg-neutral-100 cursor-pointer">
          <div className="w-8 h-8 bg-gradient-to-r from-[#fef08a] via-[#84cc16] to-[#16a34a] rounded-full flex items-center justify-center text-white font-bold">
            L
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">Leonid</p>
            <p className="text-xs text-neutral-500">@malvinalord</p>
          </div>
          <Bolt className="w-5 h-5 text-neutral-500" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;