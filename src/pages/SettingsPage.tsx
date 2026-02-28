import React from 'react';
import AppLayout from '../components/Layout/AppLayout';

const SettingsPage: React.FC = () => {
  return (
    <AppLayout title="Настройки">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 mb-6">Настройки</h1>
        <p className="text-neutral-600">Настройки и конфигурация приложения</p>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;