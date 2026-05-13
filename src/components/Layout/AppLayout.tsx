// components/Layout/AppLayout.tsx
import React, { ReactNode, useRef, useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useLocation } from 'react-router-dom';

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, title }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [mainHeight, setMainHeight] = useState('auto');
  const location = useLocation();

  console.log('Current path:', location.pathname);

  useEffect(() => {
    const updateHeight = () => {
      if (headerRef.current) {
        const headerHeight = headerRef.current.offsetHeight;
        setMainHeight(`calc(100vh - ${headerHeight}px)`);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    
    // Наблюдаем за изменениями в DOM
    const observer = new ResizeObserver(updateHeight);
    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateHeight);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="flex h-screen bg-neutral-50 overflow-hidden">
      {/* Left Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <div ref={headerRef}>
          <Header />
        </div>
        <main style={{ height: mainHeight }} className="overflow-hidden">
          <div className="h-full bg-white rounded-3xl border-0 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;