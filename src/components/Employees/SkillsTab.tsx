import React from 'react';
import { Employee } from '../../types';

interface SkillsTabProps {
  employee: Employee;
}

const SkillsTab: React.FC<SkillsTabProps> = ({ employee }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-neutral-900">Навыки и компетенции</h3>
        <p className="mt-1 text-sm text-neutral-500">
          Основные профессиональные навыки и области экспертизы сотрудника
        </p>
      </div>

      <div className="bg-neutral-50 p-4 rounded-lg">
        <div className="flex flex-wrap gap-2">
          {employee.skills?.map((skill, index) => (
            <span 
              key={index} 
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
            >
              {skill}
            </span>
          )) || (
            <p className="text-neutral-500 italic">Навыки не указаны</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-neutral-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-neutral-700 mb-3">Технические навыки</h4>
          <ul className="space-y-2">
            {employee.skills?.filter(skill => 
              skill.includes('техничес') || 
              skill.includes('диагностика') || 
              skill.includes('интеграции')
            ).map((skill, index) => (
              <li key={index} className="flex items-center">
                <div className="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
                <span className="text-sm text-neutral-700">{skill}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border border-neutral-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-neutral-700 mb-3">Коммуникативные навыки</h4>
          <ul className="space-y-2">
            {employee.skills?.filter(skill => 
              skill.includes('работа с клиент') || 
              skill.includes('ведение переговоров') || 
              skill.includes('обратная связь')
            ).map((skill, index) => (
              <li key={index} className="flex items-center">
                <div className="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
                <span className="text-sm text-neutral-700">{skill}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white border border-neutral-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-neutral-700 mb-3">Рекомендации по развитию</h4>
        <p className="text-sm text-neutral-600">
          На основе анализа производительности и отзывов клиентов, рекомендуется развивать 
          следующие области: {employee.skills?.slice(0, 2).join(', ') || 'навыки коммуникации, управление временем'}.
        </p>
      </div>
    </div>
  );
};

export default SkillsTab;