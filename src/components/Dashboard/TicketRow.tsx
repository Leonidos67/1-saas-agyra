import React from 'react';
import { Ticket } from '../../types';
import StatusBadge from '../Common/StatusBadge';
import Avatar from '../Common/Avatar';

interface TicketRowProps {
  ticket: Ticket;
  isSelected: boolean;
  onSelect: () => void;
}

const TicketRow: React.FC<TicketRowProps> = ({ ticket, isSelected, onSelect }) => {
  return (
    <tr 
      className={`border-b border-neutral-200 hover:bg-neutral-50 cursor-pointer transition-colors ${
        isSelected ? 'bg-primary-50' : ''
      }`}
      onClick={onSelect}
    >
      <td className="py-3 px-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          className="rounded text-primary-600 focus:ring-primary-500"
        />
      </td>
      <td className="py-3 px-4 text-sm text-neutral-700">{ticket.ticketId}</td>
      <td className="py-3 px-4 text-sm font-medium text-neutral-900 max-w-xs truncate">
        {ticket.title}
      </td>
      <td className="py-3 px-4 text-sm text-neutral-600">
        <span className="bg-neutral-100 text-neutral-800 px-2 py-1 rounded-md text-xs">
          {ticket.category}
        </span>
      </td>
      <td className="py-3 px-4">
        <StatusBadge status={ticket.status} />
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center">
          <Avatar user={ticket.assignee} size="sm" />
          <span className="ml-2 text-sm text-neutral-700">{ticket.assignee.name}</span>
        </div>
      </td>
    </tr>
  );
};

export default TicketRow;