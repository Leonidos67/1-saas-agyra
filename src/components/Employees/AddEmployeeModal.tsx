import React, { useState } from 'react';
import { Employee } from '../../types';

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (employee: Omit<Employee, 'id'>) => void;
  employeeType: 'human' | 'ai';
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave,
  employeeType 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar: '',
    role: '',
    status: 'offline' as const,
    workload: 0,
    channels: [] as ('chat' | 'call' | 'email')[],
    aiCapabilities: [] as string[],
    type: employeeType,
    skills: [] as string[],
  });

  if (!isOpen) return null;

  // Rest of the component code...
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'workload' ? parseInt(value) : value
    }));
  };

  const handleChannelChange = (channel: 'chat' | 'call' | 'email') => {
    setFormData(prev => {
      if (prev.channels.includes(channel)) {
        return {
          ...prev,
          channels: prev.channels.filter(c => c !== channel)
        };
      } else {
        return {
          ...prev,
          channels: [...prev.channels, channel]
        };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-neutral-900">
              {employeeType === 'human' ? 'Добавить нового сотрудника' : 'Добавить нового ИИ-агента'}
            </h3>
            <button 
              onClick={onClose}
              className="text-neutral-400 hover:text-neutral-500"
            >
              <span className="text-2xl">&times;</span>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Имя *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Аватар
                </label>
                <input
                  type="text"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleInputChange}
                  placeholder="Аббревиатура"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Роль *
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Статус
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="online">Online</option>
                  <option value="busy">Busy</option>
                  <option value="offline">Offline</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Нагрузка (%)
                </label>
                <input
                  type="number"
                  name="workload"
                  value={formData.workload}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Каналы
              </label>
              <div className="flex space-x-4">
                {(['chat', 'call', 'email'] as const).map(channel => (
                  <label key={channel} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.channels.includes(channel)}
                      onChange={() => handleChannelChange(channel)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    />
                    <span className="ml-2 text-sm text-neutral-700 capitalize">
                      {channel === 'chat' ? 'Чат' : channel === 'call' ? 'Звонки' : 'Email'}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            {(employeeType === 'ai' || formData.aiCapabilities.length > 0) && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Возможности ИИ
                </label>
                <textarea
                  name="aiCapabilities"
                  value={formData.aiCapabilities.join(', ')}
                  onChange={(e) => setFormData({...formData, aiCapabilities: e.target.value.split(',').map(item => item.trim())})}
                  placeholder="Возможности через запятую"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows={2}
                />
              </div>
            )}
            
            {employeeType === 'human' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Навыки
                </label>
                <textarea
                  name="skills"
                  value={formData.skills.join(', ')}
                  onChange={(e) => setFormData({...formData, skills: e.target.value.split(',').map(item => item.trim())})}
                  placeholder="Навыки через запятую"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows={2}
                />
              </div>
            )}
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Сохранить
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeModal;