import React, { useState } from 'react';
import AppLayout from '../components/Layout/AppLayout';
import TicketsLayout from '../components/Layout/TicketsLayout';
import { Ticket } from '../types';

const TicketsPage: React.FC = () => {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [activeFilters, setActiveFilters] = useState({
    view: 'all',
    category: '',
    priority: '',
  });

  const handleFilterChange = (filterType: string, filterValue: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: filterValue === prev[filterType as keyof typeof prev] ? '' : filterValue
    }));
  };

  return (
    <AppLayout 
      title={selectedTicket ? `#${selectedTicket.ticketId} - ${selectedTicket.title}` : "Все заявки"}
    >
      <TicketsLayout 
        selectedTicket={selectedTicket} 
        onTicketSelect={setSelectedTicket} 
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
      />
    </AppLayout>
  );
};

export default TicketsPage;