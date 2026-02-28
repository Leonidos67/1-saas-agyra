import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, title }) => {
  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Left Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title={title} />
        <main className="flex-1 overflow-auto">
          <div className="h-full bg-white rounded-3xl border-0 overflow-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;