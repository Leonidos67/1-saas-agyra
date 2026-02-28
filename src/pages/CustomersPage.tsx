import React from 'react';
import AppLayout from '../components/Layout/AppLayout';

const CustomersPage: React.FC = () => {
  return (
    <AppLayout title="Сотрудники">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 mb-6">Сотрудники</h1>
        <p className="text-neutral-600">Страница управления сотрудниками</p>
      </div>
    </AppLayout>
  );
};

export default CustomersPage;