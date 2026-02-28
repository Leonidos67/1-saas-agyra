import React, { useState } from 'react';
import AppLayout from '../components/Layout/AppLayout';
import { Employee } from '../types';
import { mockEmployees } from '../data/mockData';
import EmployeeTable from '../components/Employees/EmployeeTable';
import EmployeeDetails from '../components/Employees/EmployeeDetails';
import { PlusIcon } from '@heroicons/react/24/outline';
import AddEmployeeModal from '../components/Employees/AddEmployeeModal';

const EmployeesPage: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [activeTab, setActiveTab] = useState<'people' | 'ai'>('people');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'human' | 'ai'>('human');
  
  const people = mockEmployees.filter(emp => emp.type === 'human');
  const aiAgents = mockEmployees.filter(emp => emp.type === 'ai');
  
  const handleAddEmployee = () => {
    setModalType('human');
    setIsModalOpen(true);
  };
  
  const handleAddAI = () => {
    setModalType('ai');
    setIsModalOpen(true);
  };
  
  const handleSaveEmployee = (employeeData: Omit<Employee, 'id'>) => {
    // In a real application, this would call an API to save the new employee
    console.log('New employee data:', employeeData);
    alert(`${employeeData.type === 'human' ? 'Сотрудник' : 'ИИ-агент'} успешно добавлен!`);
  };
  
  return (
    <>
      <AppLayout title="Сотрудники">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-1 bg-neutral-100 p-1 rounded-lg">
              <button 
                onClick={() => setActiveTab('people')} 
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'people' 
                    ? 'bg-white text-neutral-900 shadow-sm' 
                    : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                Люди
              </button>
              <button 
                onClick={() => setActiveTab('ai')} 
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'ai' 
                    ? 'bg-white text-neutral-900 shadow-sm' 
                    : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                ИИ-Агенты
              </button>
            </div>
            <button 
              onClick={activeTab === 'people' ? handleAddEmployee : handleAddAI}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <PlusIcon className="-ml-1 mr-2 h-4 w-4" />
              {activeTab === 'people' ? 'Добавить человека' : 'Добавить ИИ-агента'}
            </button>
          </div>
          
          <div className="flex h-full">
            <div className="w-2/3 pr-4">
              <EmployeeTable 
                employees={activeTab === 'people' ? people : aiAgents} 
                onEmployeeSelect={setSelectedEmployee} 
              />
            </div>
            
            <div className="w-1/3 pl-4 border-l border-neutral-200">
              <EmployeeDetails employee={selectedEmployee} />
            </div>
          </div>
        </div>
      </AppLayout>
      <AddEmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEmployee}
        employeeType={modalType}
      />
    </>
  );
};

export default EmployeesPage;