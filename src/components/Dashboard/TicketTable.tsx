import React, { useState } from 'react';
import { Ticket } from '../../types';
import { mockTickets } from '../../data/mockData';
import TicketRow from './TicketRow';
import Pagination from './Pagination';

interface TicketTableProps {
  onTicketSelect: (ticket: Ticket) => void;
  selectedTicket: Ticket | null;
}

const TicketTable: React.FC<TicketTableProps> = ({ onTicketSelect, selectedTicket }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter tickets based on search term
  const filteredTickets = mockTickets.filter(ticket => 
    ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.ticketId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Pagination
  const ticketsPerPage = 10;
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);
  const startIndex = (currentPage - 1) * ticketsPerPage;
  const paginatedTickets = filteredTickets.slice(startIndex, startIndex + ticketsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white flex flex-col flex-1 overflow-hidden">
      <div className="overflow-x-auto flex-1">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-neutral-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider w-12">
                <input
                  type="checkbox"
                  className="rounded text-primary-600 focus:ring-primary-500"
                />
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                ID
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Проблема
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Категория
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Статус
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Назначено
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {paginatedTickets.map((ticket) => (
              <TicketRow
                key={ticket.id}
                ticket={ticket}
                isSelected={selectedTicket?.id === ticket.id}
                onSelect={() => onTicketSelect(ticket)}
              />
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredTickets.length > ticketsPerPage && (
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
      )}
      
      {filteredTickets.length === 0 && (
        <div className="text-center py-10 text-neutral-500">
          Не найдено заявок, соответствующих вашему запросу
        </div>
      )}
    </div>
  );
};

export default TicketTable;