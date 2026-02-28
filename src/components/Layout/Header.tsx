import React from 'react';
import { MagnifyingGlassIcon, BellIcon, QuestionMarkCircleIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import SearchBar from '../Common/SearchBar';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = "Все заявки" }) => {
  return (
    <header className="bg-neutral-50 py-2 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-neutral-800">{title}</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg">
          <BellIcon className="h-5 w-5" />
        </button>
        
        <button className="p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg">
          <QuestionMarkCircleIcon className="h-5 w-5" />
        </button>
        
        <button className="p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg">
          <Cog6ToothIcon className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;