import React, { useState } from 'react';
import { Ticket } from '../../types';
import TicketTable from '../Dashboard/TicketTable';
import TicketDetails from '../DetailsPanel/TicketDetails';

interface DashboardLayoutProps {
  selectedTicket: Ticket | null;
  onTicketSelect: (ticket: Ticket) => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ selectedTicket, onTicketSelect }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex h-full">
        {/* Main Table Area */}
        <div className="w-2/3 pr-0 flex flex-col border-r border-neutral-200">
          <div className="flex-1 overflow-auto">
            <TicketTable onTicketSelect={onTicketSelect} selectedTicket={selectedTicket} />
          </div>
        </div>
        
        {/* Right Details Panel */}
        <div className="w-1/3 pl-0 flex flex-col">
          <div className="flex-1 overflow-auto">
            <TicketDetails ticket={selectedTicket} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;