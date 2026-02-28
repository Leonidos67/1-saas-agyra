import React, { useState } from 'react';
import { Employee } from '../../types';
import ProfileTab from './ProfileTab';
import SkillsTab from './SkillsTab';
import AIAssistantTab from './AIAssistantTab';
import HistoryTab from './HistoryTab';

interface EmployeeDetailsProps {
  employee: Employee | null;
}

const EmployeeDetails: React.FC<EmployeeDetailsProps> = ({ employee }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'skills' | 'ai' | 'history'>('profile');

  if (!employee) {
    return (
      <div className="p-6 flex-1">
        <div className="text-center text-neutral-500">
          <p>Выберите сотрудника для просмотра детальной информации</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-neutral-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'profile'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
            }`}
          >
            Профиль
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'skills'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
            }`}
          >
            Навыки
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'ai'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
            }`}
          >
            ИИ-помощник
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'history'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
            }`}
          >
            История
          </button>
        </nav>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {activeTab === 'profile' && <ProfileTab employee={employee} />}
        {activeTab === 'skills' && <SkillsTab employee={employee} />}
        {activeTab === 'ai' && <AIAssistantTab employee={employee} />}
        {activeTab === 'history' && <HistoryTab employee={employee} />}
      </div>
    </div>
  );
};

export default EmployeeDetails;