import React, { useState } from 'react';
import { View } from '../../types';
import { mockViews } from '../../data/mockData';

interface FiltersPanelProps {
  views?: View[];
  onFilterChange?: (filterType: string, filterValue: string) => void;
  activeFilters?: {
    view?: string;
    category?: string;
    priority?: string;
  };
}

const FiltersPanel: React.FC<FiltersPanelProps> = ({ 
  views = mockViews, 
  onFilterChange, 
  activeFilters = {}
}) => {
  const [showFilters, setShowFilters] = useState(true);

  const categories = [
    { name: 'Техническая поддержка', count: 8 },
    { name: 'Вопросы по оплате', count: 5 },
    { name: 'Запрос функций', count: 3 },
    { name: 'Сообщения об ошибках', count: 12 },
    { name: 'Проблемы с аккаунтом', count: 7 },
  ];

  const priorities = [
    { name: 'Критический', count: 2, color: 'text-red-600' },
    { name: 'Высокий', count: 5, color: 'text-orange-600' },
    { name: 'Средний', count: 10, color: 'text-yellow-600' },
    { name: 'Низкий', count: 7, color: 'text-green-600' },
  ];

  const isActive = (type: string, value: string) => {
    if (type === 'view') return activeFilters.view === value;
    if (type === 'category') return activeFilters.category === value;
    if (type === 'priority') return activeFilters.priority === value;
    return false;
  };

  return (
    <div className="mb-4">
      {/* Filters Toggle Button */}
      <div className="mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-between w-full p-3 bg-neutral-100 text-neutral-700 font-medium rounded-lg hover:bg-neutral-200 transition-colors"
        >
          <span className="flex items-center">
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Фильтры
          </span>
          <svg 
            className={`h-5 w-5 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Filters Content */}
      {showFilters && (
        <div className="bg-white p-4 rounded-lg border border-neutral-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Views Section */}
            <div>
              <h3 className="text-sm font-medium text-neutral-700 mb-3">Виды</h3>
              <div className="space-y-2">
                {views.map((view) => (
                  <button
                    key={view.id}
                    onClick={() => onFilterChange && onFilterChange('view', view.id)}
                    className={`flex items-center justify-between w-full p-2 rounded-lg transition-colors ${
                      isActive('view', view.id)
                        ? 'bg-primary-100 text-primary-700 border border-primary-300'
                        : 'hover:bg-neutral-100'
                    }`}
                  >
                    <span className="text-sm">
                      {view.name === 'Все заявки' ? 'Все заявки' : 
                       view.name === 'Новые' ? 'Новые' :
                       view.name === 'Открытые' ? 'Открытые' :
                       view.name === 'В ожидании' ? 'В ожидании' :
                       view.name === 'Решенные' ? 'Решенные' :
                       view.name === 'Эскалированные' ? 'Эскалированные' : view.name}
                    </span>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      isActive('view', view.id)
                        ? 'bg-primary-200 text-primary-800'
                        : 'bg-neutral-200 text-neutral-700'
                    }`}>
                      {view.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Categories Section */}
            <div>
              <h3 className="text-sm font-medium text-neutral-700 mb-3">Категории</h3>
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => onFilterChange && onFilterChange('category', category.name)}
                    className={`flex items-center justify-between w-full p-2 rounded-lg transition-colors ${
                      isActive('category', category.name)
                        ? 'bg-primary-100 text-primary-700 border border-primary-300'
                        : 'hover:bg-neutral-100'
                    }`}
                  >
                    <span className="text-sm truncate">{category.name}</span>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      isActive('category', category.name)
                        ? 'bg-primary-200 text-primary-800'
                        : 'bg-neutral-200 text-neutral-700'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Priorities Section */}
            <div>
              <h3 className="text-sm font-medium text-neutral-700 mb-3">Приоритеты</h3>
              <div className="space-y-2">
                {priorities.map((priority, index) => (
                  <button
                    key={index}
                    onClick={() => onFilterChange && onFilterChange('priority', priority.name)}
                    className={`flex items-center justify-between w-full p-2 rounded-lg transition-colors ${
                      isActive('priority', priority.name)
                        ? 'bg-primary-100 text-primary-700 border border-primary-300'
                        : 'hover:bg-neutral-100'
                    } ${priority.color}`}
                  >
                    <span className="text-sm">{priority.name}</span>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      isActive('priority', priority.name)
                        ? 'bg-primary-200 text-primary-800'
                        : 'bg-neutral-200 text-neutral-700'
                    }`}>
                      {priority.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FiltersPanel;