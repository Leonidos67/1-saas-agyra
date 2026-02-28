import React from 'react';
import { Employee } from '../../types';

interface AIAssistantTabProps {
  employee: Employee;
}

const AIAssistantTab: React.FC<AIAssistantTabProps> = ({ employee }) => {
  if (!employee.aiSettings) {
    return (
      <div className="text-center py-10">
        <div className="text-neutral-400 mb-2">🤖</div>
        <h3 className="text-lg font-medium text-neutral-900 mb-1">ИИ-помощник не настроен</h3>
        <p className="text-neutral-500">
          Для этого сотрудника не настроены параметры ИИ-помощника
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-neutral-900">Настройки ИИ-помощника</h3>
        <p className="mt-1 text-sm text-neutral-500">
          Конфигурация возможностей и поведения искусственного интеллекта
        </p>
      </div>

      <div className="bg-white border border-neutral-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-neutral-700 mb-3">Возможности ИИ</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-neutral-900">Автоматическая маршрутизация</span>
              <p className="text-xs text-neutral-500">Автоматическое распределение задач</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={employee.aiSettings.capabilities.automateRouting}
                readOnly
              />
              <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-neutral-900">Анализ тональности</span>
              <p className="text-xs text-neutral-500">Определение эмоций клиента</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={employee.aiSettings.capabilities.sentimentAnalysis}
                readOnly
              />
              <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-neutral-900">Умные ответы</span>
              <p className="text-xs text-neutral-500">Генерация рекомендованных ответов</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={employee.aiSettings.capabilities.smartResponses}
                readOnly
              />
              <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-neutral-900">Правила эскалации</span>
              <p className="text-xs text-neutral-500">Условия передачи задач человеку</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={employee.aiSettings.capabilities.escalationRules}
                readOnly
              />
              <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white border border-neutral-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-neutral-700 mb-3">Стиль общения</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <button 
            className={`px-3 py-2 text-sm rounded-lg border ${
              employee.aiSettings.communicationStyle === 'professional' 
                ? 'bg-primary-100 border-primary-300 text-primary-700' 
                : 'border-neutral-300 text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            Профессиональный
          </button>
          <button 
            className={`px-3 py-2 text-sm rounded-lg border ${
              employee.aiSettings.communicationStyle === 'friendly' 
                ? 'bg-primary-100 border-primary-300 text-primary-700' 
                : 'border-neutral-300 text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            Дружелюбный
          </button>
          <button 
            className={`px-3 py-2 text-sm rounded-lg border ${
              employee.aiSettings.communicationStyle === 'direct' 
                ? 'bg-primary-100 border-primary-300 text-primary-700' 
                : 'border-neutral-300 text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            Прямой
          </button>
          <button 
            className={`px-3 py-2 text-sm rounded-lg border ${
              employee.aiSettings.communicationStyle === 'empathetic' 
                ? 'bg-primary-100 border-primary-300 text-primary-700' 
                : 'border-neutral-300 text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            Эмпатичный
          </button>
        </div>
      </div>

      <div className="bg-white border border-neutral-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-neutral-700 mb-3">Условия эскалации</h4>
        <div className="space-y-3">
          <div className="flex items-center">
            <input 
              type="checkbox" 
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              checked={employee.aiSettings.escalationConditions.customerFrustration}
              readOnly
            />
            <label className="ml-2 text-sm text-neutral-900">
              Обнаружение фрустрации клиента
            </label>
          </div>
          
          <div className="flex items-center">
            <input 
              type="checkbox" 
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              checked={employee.aiSettings.escalationConditions.complexIssue}
              readOnly
            />
            <label className="ml-2 text-sm text-neutral-900">
              Сложные технические вопросы
            </label>
          </div>
          
          <div className="flex items-center">
            <input 
              type="checkbox" 
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              checked={employee.aiSettings.escalationConditions.predefinedTime}
              readOnly
            />
            <label className="ml-2 text-sm text-neutral-900">
              Предопределенное время ожидания
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantTab;