import React from 'react';
import { Ticket } from '../../types';
import StatusBadge from '../Common/StatusBadge';
import Avatar from '../Common/Avatar';
import ActivityTimeline from './ActivityTimeline';
import ActionButtons from './ActionButtons';
import AISupportAnalysis from './AISupportAnalysis';

interface TicketDetailsProps {
  ticket: Ticket | null;
}

const TicketDetails: React.FC<TicketDetailsProps> = ({ ticket }) => {
  if (!ticket) {
    return (
      <div className="p-6 flex-1">
        <div className="text-center text-neutral-500">
          <p>Выберите любой пункт, чтобы просмотреть подробную информацию</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 overflow-auto p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-neutral-900">#{ticket.ticketId}</h2>
          <StatusBadge status={ticket.status} />
        </div>
        <h3 className="text-xl font-bold text-neutral-900 mb-2">{ticket.title}</h3>
        <p className="text-neutral-600 text-sm">{ticket.description}</p>
      </div>

      <div className="mb-6">
        <div className="flex items-center mb-2">
          <Avatar user={ticket.assignee} size="md" />
          <div className="ml-3">
            <p className="text-sm font-medium text-neutral-900">{ticket.assignee.name}</p>
            <p className="text-xs text-neutral-500">{ticket.assignee.email}</p>
          </div>
        </div>
      </div>

      <AISupportAnalysis ticket={ticket} />

      {ticket.confidenceScore !== undefined && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-neutral-700">Уровень уверенности ИИ</span>
            <span className="text-sm font-medium text-neutral-700">{ticket.confidenceScore}%</span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-2.5">
            <div 
              className="bg-primary-600 h-2.5 rounded-full" 
              style={{ width: `${ticket.confidenceScore}%` }}
            ></div>
          </div>
        </div>
      )}

      {ticket.resolutionSteps && ticket.resolutionSteps.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-neutral-700 mb-2">Предложенные шаги решения</h4>
          <ul className="space-y-2">
            {ticket.resolutionSteps.map((step, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-800 rounded-full flex items-center justify-center text-xs font-medium mr-2 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-sm text-neutral-600">{step}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {ticket.knowledgeBaseRefs && ticket.knowledgeBaseRefs.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-neutral-700 mb-2">Ссылки на базу знаний</h4>
          <div className="space-y-2">
            {ticket.knowledgeBaseRefs.map((ref, index) => (
              <a 
                key={index}
                href="#" 
                className="block p-3 bg-white border border-neutral-200 rounded-lg text-sm text-primary-600 hover:bg-neutral-50 transition-colors"
              >
                {ref}
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="mb-6">
        <h4 className="text-sm font-medium text-neutral-700 mb-2">Хронология активности</h4>
        <ActivityTimeline activities={ticket.activityLogs} />
      </div>

      <ActionButtons
        onApplyReply={() => console.log('Apply as Reply clicked')}
        onEditBeforeSending={() => console.log('Edit Before Sending clicked')}
        onUpdate={() => console.log('Update clicked')}
        onRemove={() => console.log('Remove clicked')}
      />
    </div>
  );
};

export default TicketDetails;