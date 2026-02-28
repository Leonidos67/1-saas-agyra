import React from 'react';
import { Employee } from '../../types';

interface HistoryTabProps {
  employee: Employee;
}

const HistoryTab: React.FC<HistoryTabProps> = ({ employee }) => {
  // Mock data for employee history
  const historyEvents = [
    {
      id: 'event-1',
      date: '2023-06-16',
      time: '10:30',
      action: 'Вход в систему',
      details: 'Успешный вход в систему поддержки'
    },
    {
      id: 'event-2',
      date: '2023-06-16',
      time: '09:45',
      action: 'Завершена заявка',
      details: 'Заявка #TKT-001 успешно решена'
    },
    {
      id: 'event-3',
      date: '2023-06-15',
      time: '16:20',
      action: 'Принята заявка',
      details: 'Принята заявка #TKT-005 для обработки'
    },
    {
      id: 'event-4',
      date: '2023-06-15',
      time: '14:10',
      action: 'Изменение профиля',
      details: 'Обновлены контактные данные'
    },
    {
      id: 'event-5',
      date: '2023-06-14',
      time: '11:30',
      action: 'Обучение пройдено',
      details: 'Курс "Работа с VIP-клиентами" успешно завершен'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-neutral-900">История активности</h3>
        <p className="mt-1 text-sm text-neutral-500">
          Журнал событий и действий сотрудника за последние 30 дней
        </p>
      </div>

      <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
        <ul className="divide-y divide-neutral-200">
          {historyEvents.map((event) => (
            <li key={event.id} className="p-4 hover:bg-neutral-50">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                </div>
                <div className="ml-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-neutral-900">{event.action}</p>
                    <p className="text-xs text-neutral-500">{event.date} {event.time}</p>
                  </div>
                  <p className="mt-1 text-sm text-neutral-500">{event.details}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-neutral-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-neutral-700 mb-2">Заявок обработано</h4>
          <p className="text-2xl font-bold text-neutral-900">24</p>
          <p className="text-xs text-green-600 mt-1">↑ 12% от предыдущего месяца</p>
        </div>
        
        <div className="bg-white border border-neutral-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-neutral-700 mb-2">Среднее время решения</h4>
          <p className="text-2xl font-bold text-neutral-900">12м 45с</p>
          <p className="text-xs text-green-600 mt-1">↓ 8% от предыдущего месяца</p>
        </div>
        
        <div className="bg-white border border-neutral-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-neutral-700 mb-2">Удовлетворенность</h4>
          <p className="text-2xl font-bold text-neutral-900">92%</p>
          <p className="text-xs text-green-600 mt-1">↑ 5% от предыдущего месяца</p>
        </div>
      </div>

      <div className="bg-white border border-neutral-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-neutral-700 mb-3">Комментарии руководителя</h4>
        <div className="space-y-4">
          <div className="flex">
            <div className="flex-shrink-0 mr-3">
              <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center">
                <span className="text-xs font-medium text-neutral-700">АД</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-neutral-100 rounded-lg p-3">
                <p className="text-sm text-neutral-800">Хорошая работа над заявками категории "срочные". Видно, что применяются рекомендации ИИ-ассистента.</p>
                <p className="text-xs text-neutral-500 mt-1">Анна Дмитриева • Сегодня, 09:15</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryTab;