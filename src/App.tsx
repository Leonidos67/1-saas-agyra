import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainDashboard from './components/Dashboard/MainDashboard';
import TicketsPage from './pages/TicketsPage';
import CustomersPage from './pages/CustomersPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import AIAgentPage from './pages/AIAgentPage';
import EmployeesPage from './pages/EmployeesPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainDashboard />} />
        <Route path="/app" element={<TicketsPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/ai-agent" element={<AIAgentPage />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  );
};

export default App;