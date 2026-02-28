import React from 'react';
import { Employee } from '../../types';
import Avatar from '../Common/Avatar';

interface ProfileTabProps {
  employee: Employee;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ employee }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Avatar user={{ id: employee.id, name: employee.name, email: employee.email, avatar: employee.avatar }} size="lg" />
        </div>
        <div className="ml-4">
          <h2 className="text-xl font-bold text-neutral-900">{employee.name}</h2>
          <p className="text-neutral-600">{employee.role}</p>
          <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {employee.type === 'human' ? 'Человек' : 'ИИ'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-neutral-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-neutral-700 mb-3">Контактная информация</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-neutral-500">Email</span>
              <span className="text-sm text-neutral-900">{employee.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-neutral-500">Дата начала работы</span>
              <span className="text-sm text-neutral-900">{employee.joinDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-neutral-500">Последняя активность</span>
              <span className="text-sm text-neutral-900">{employee.lastActive}</span>
            </div>
          </div>
        </div>

        <div className="bg-neutral-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-neutral-700 mb-3">Статус</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-neutral-500">Текущий статус</span>
              <span className="text-sm text-neutral-900 capitalize">{employee.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-neutral-500">Нагрузка</span>
              <span className="text-sm text-neutral-900">{employee.workload}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-neutral-500">Каналы</span>
              <span className="text-sm text-neutral-900">{employee.channels.join(', ')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-neutral-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-neutral-700 mb-3">Доступность</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
          {Object.entries(employee.availability || {}).map(([day, time]) => (
            <div key={day} className="text-center">
              <div className="text-xs text-neutral-500 capitalize">{day}</div>
              <div className="text-sm text-neutral-900">
                {time.start !== '00:00' || time.end !== '00:00' 
                  ? `${time.start} - ${time.end}` 
                  : 'Нет'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;