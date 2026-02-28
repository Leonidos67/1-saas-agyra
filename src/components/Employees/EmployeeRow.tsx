import React from 'react';
import { Employee } from '../../types';
import Avatar from '../Common/Avatar';
import StatusBadge from '../Common/StatusBadge';
import { 
  ChatBubbleLeftRightIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  WrenchScrewdriverIcon,
  PencilIcon,
  PowerIcon
} from '@heroicons/react/24/outline';

interface EmployeeRowProps {
  employee: Employee;
  onSelect: (employee: Employee) => void;
}

const EmployeeRow: React.FC<EmployeeRowProps> = ({ employee, onSelect }) => {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      case 'auto': return 'bg-blue-500';
      default: return 'bg-gray-400';
    }
  };

  const getTypeLabel = (type: string) => {
    return type === 'human' ? 'Человек' : 'ИИ';
  };

  const renderChannels = (channels: string[]) => {
    return channels.map(channel => {
      switch(channel) {
        case 'chat':
          return (
            <ChatBubbleLeftRightIcon key={channel} className="h-4 w-4 text-neutral-600" />
          );
        case 'call':
          return (
            <PhoneIcon key={channel} className="h-4 w-4 text-neutral-600" />
          );
        case 'email':
          return (
            <EnvelopeIcon key={channel} className="h-4 w-4 text-neutral-600" />
          );
        default:
          return null;
      }
    });
  };

  const renderAICapabilities = (capabilities: string[]) => {
    return capabilities.slice(0, 2).map((capability, index) => (
      <span 
        key={index} 
        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-1 mb-1"
      >
        {capability}
      </span>
    ));
  };

  return (
    <tr 
      className="hover:bg-neutral-50 cursor-pointer transition-colors"
      onClick={() => onSelect(employee)}
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <Avatar user={{ id: employee.id, name: employee.name, email: employee.email, avatar: employee.avatar }} size="md" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-neutral-900">{employee.name}</div>
            <div className="text-sm text-neutral-500">{employee.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-neutral-900">{getTypeLabel(employee.type)}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-neutral-900">{employee.role}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className={`w-2.5 h-2.5 rounded-full mr-2 ${getStatusColor(employee.status)}`}></div>
          <span className="text-sm text-neutral-900 capitalize">{employee.status}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-neutral-900 mb-1">{employee.workload}%</div>
        <div className="w-full bg-neutral-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${
              employee.workload > 80 ? 'bg-red-500' : 
              employee.workload > 60 ? 'bg-yellow-500' : 'bg-green-500'
            }`} 
            style={{ width: `${employee.workload}%` }}
          ></div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex space-x-2">
          {renderChannels(employee.channels)}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-wrap">
          {renderAICapabilities(employee.aiCapabilities)}
          {employee.aiCapabilities.length > 2 && (
            <span className="text-xs text-neutral-500">+{employee.aiCapabilities.length - 2}</span>
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex space-x-2">
          <button className="text-blue-600 hover:text-blue-900">
            <PencilIcon className="h-4 w-4" />
          </button>
          <button className="text-red-600 hover:text-red-900">
            <PowerIcon className="h-4 w-4" />
          </button>
          <button className="text-neutral-600 hover:text-neutral-900">
            <WrenchScrewdriverIcon className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default EmployeeRow;