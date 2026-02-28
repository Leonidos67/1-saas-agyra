import React from 'react';
import { Employee } from '../../types';
import EmployeeRow from './EmployeeRow';

interface EmployeeTableProps {
  employees: Employee[];
  onEmployeeSelect: (employee: Employee) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, onEmployeeSelect }) => {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-neutral-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider w-1/4">
                Сотрудник
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Тип
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Роль
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Статус
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Нагрузка
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Каналы
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Возможности ИИ
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {employees.map((employee) => (
              <EmployeeRow 
                key={employee.id} 
                employee={employee} 
                onSelect={onEmployeeSelect} 
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;