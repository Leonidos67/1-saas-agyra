import React from 'react';
import AppLayout from '../components/Layout/AppLayout';

const ReportsPage: React.FC = () => {
  return (
    <AppLayout title="Отчеты">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 mb-6">Отчеты</h1>
        <p className="text-neutral-600">Аналитика и панель отчетности</p>
      </div>
    </AppLayout>
  );
};

export default ReportsPage;