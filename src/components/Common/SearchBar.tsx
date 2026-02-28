import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Поиск...", value, onChange }) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <MagnifyingGlassIcon className="h-5 w-5 text-neutral-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        placeholder={placeholder || "Поиск..."}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;