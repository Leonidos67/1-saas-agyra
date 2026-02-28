import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, ChatBubbleLeftRightIcon, CpuChipIcon, Cog6ToothIcon, UserGroupIcon, ChartBarIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';
import { View } from '../../types';
import { mockViews } from '../../data/mockData';

interface SidebarProps {
  views?: View[];
}

const Sidebar: React.FC<SidebarProps> = ({ views = mockViews }) => {
  const location = useLocation();
  const [activeView, setActiveView] = useState('all');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    tickets: true,
    views: true,
    categories: false,
    priorities: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev: Record<string, boolean>) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const navItems = [
    { name: 'Панель управления', icon: HomeIcon, path: '/' },
    { name: 'Заявки', icon: ChatBubbleLeftRightIcon, path: '/app' },
    { name: 'Сотрудники', icon: UserGroupIcon, path: '/employees' },
    // { name: 'Отчеты', icon: ChartBarIcon, path: '/reports' },
    { name: 'ИИ-агент', icon: CpuChipIcon, path: '/ai-agent' },
    // { name: 'Настройки', icon: Cog6ToothIcon, path: '/settings' },
  ];

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

  return (
    <div className="w-64 bg-neutral-50 flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 bg-neutral-50">
        <h1 className="text-xl font-bold text-primary-700">Agyra<span className="font-light">SaaS</span></h1>
        <p className="text-xs text-neutral-500 mt-1">Продукт компании agyra.ru</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* <div className="mt-4 px-2">
          <button
            onClick={() => toggleSection('priorities')}
            className="flex items-center justify-between w-full p-2 text-left text-neutral-700 font-medium rounded-lg hover:bg-neutral-100"
          >
            <span>Приоритеты</span>
            <svg 
              className={`h-4 w-4 transform transition-transform ${expandedSections.priorities ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {expandedSections.priorities && (
            <ul className="mt-2 space-y-1 ml-2">
              {priorities.map((priority, index) => (
                <li key={index}>
                  <Link
                    to="#"
                    className={`flex items-center justify-between p-2 rounded-lg hover:bg-neutral-100 ${priority.color}`}
                  >
                    <span>{priority.name}</span>
                    <span className="bg-neutral-200 text-neutral-700 text-xs font-medium px-2 py-0.5 rounded-full">
                      {priority.count}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div> */}
      </nav>
    </div>
  );
};

export default Sidebar;