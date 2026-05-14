// src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import AppLayout from './components/Layout/AppLayout';

import Home from './pages/Home';
import Discover from './pages/Discover';
import CommunityPage from './pages/CommunityPage';

import LoginModal from './components/Auth/LoginModal';
import RegisterModal from './components/Auth/RegisterModal';

import NewPage from './components/Community/New';
import NewPersonal from './components/Community/NewPersonal';
import NewBusiness from './components/Community/NewBusiness';
import Messenger from './pages/Messenger';
import Settings from './pages/Settings';
import UserProfile from './pages/UserProfile';
import NotFound from './pages/NotFound';
import PostPage from './pages/PostPage';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  useEffect(() => {
    const openLogin = () => setIsLoginOpen(true);
    window.addEventListener('openLogin', openLogin);
    return () => window.removeEventListener('openLogin', openLogin);
  }, []);

  return (
    <AuthProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          {/* Основные страницы */}
          <Route path="/" element={<AppLayout><Home /></AppLayout>} />
          <Route path="/discover" element={<AppLayout><Discover /></AppLayout>} />
          <Route path="/community/:handle" element={<AppLayout><CommunityPage /></AppLayout>} />
          <Route path="/new" element={<AppLayout><NewPage /></AppLayout>} />
          <Route path="/new/personal" element={<AppLayout><NewPersonal /></AppLayout>} />
          <Route path="/new/business" element={<AppLayout><NewBusiness /></AppLayout>} />
          <Route path="/messenger" element={<AppLayout><Messenger /></AppLayout>} />
          <Route path="/settings" element={<AppLayout><Settings /></AppLayout>} />
          
          {/* Профиль пользователя */}
          <Route path="/:username" element={<AppLayout><UserProfile /></AppLayout>} />
          <Route path="/post/:postId" element={<PostPage />} />
          
          {/* Страница 404 для всего остального */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        <LoginModal 
          isOpen={isLoginOpen} 
          onClose={() => setIsLoginOpen(false)} 
          onSwitchToRegister={() => {
            setIsLoginOpen(false);
            setIsRegisterOpen(true);
          }} 
        />

        <RegisterModal 
          isOpen={isRegisterOpen} 
          onClose={() => setIsRegisterOpen(false)} 
          onSwitchToLogin={() => {
            setIsRegisterOpen(false);
            setIsLoginOpen(true);
          }} 
        />
      </Router>
    </AuthProvider>
  );
}

export default App;