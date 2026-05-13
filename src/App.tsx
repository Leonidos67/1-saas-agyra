import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout><Home /></AppLayout>} />
        <Route path="/discover" element={<AppLayout><Discover /></AppLayout>} />
        <Route path="/community/:handle" element={<AppLayout><CommunityPage /></AppLayout>} />
        <Route path="/new" element={<AppLayout><NewPage /></AppLayout>} />
        <Route path="/new/personal" element={<AppLayout><NewPersonal /></AppLayout>} />
        <Route path="/new/business" element={<AppLayout><NewBusiness /></AppLayout>} />

        <Route path="/messenger" element={<AppLayout><Messenger /></AppLayout>} />

        {/* <Route path="/new/personal" element={<PersonalPage />} />
        <Route path="/new/business" element={<BusinessPage />} /> */}
        {/* <Route path="/new" element={<NewPage />} /> */}
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
  );
}

export default App;