import React from 'react';
import { Ticket } from '../../types';

interface AISupportAnalysisProps {
  ticket: Ticket;
}

const AISupportAnalysis: React.FC<AISupportAnalysisProps> = ({ ticket }) => {
  // Calculate emotional tone based on keywords in title/description
  const getEmotionalTone = (): string => {
    const description = (ticket.title + ' ' + ticket.description).toLowerCase();
    if (description.includes('angry') || description.includes('frustrated') || 
        description.includes('annoyed') || description.includes('terrible') ||
        description.includes('worst') || description.includes('disappointed')) {
      return 'Раздраженный';
    } else if (description.includes('urgent') || description.includes('immediately') ||
               description.includes('asap') || description.includes('critical')) {
      return 'Срочный';
    } else if (description.includes('confused') || description.includes('help')) {
      return 'Запутанный';
    }
    return 'Нейтральный';
  };

  // Determine if escalation is needed
  const isEscalationNeeded = (): boolean => {
    // Escalation rules from the prompt
    if ((ticket.category.toLowerCase().includes('billing') || 
         ticket.category.toLowerCase().includes('payment')) &&
        ticket.priority === 'critical') {
      return true;
    }
    
    if (ticket.description.toLowerCase().includes('legal') || 
        ticket.description.toLowerCase().includes('refund') ||
        getEmotionalTone() === 'Раздраженный') {
      return true;
    }

    // Low confidence check
    if (ticket.confidenceScore && ticket.confidenceScore < 70) {
      return true;
    }

    return false;
  };

  // Generate escalation reason
  const getEscalationReason = (): string => {
    if (ticket.category.toLowerCase().includes('billing') || 
        ticket.category.toLowerCase().includes('payment')) {
      return 'Проблема, связанная с оплатой, требует проверки человеком';
    }
    
    if (ticket.description.toLowerCase().includes('legal') || 
        ticket.description.toLowerCase().includes('refund')) {
      return 'Юридический спор или спор о возврате требует внимания менеджмента';
    }

    if (getEmotionalTone() === 'Раздраженный') {
      return 'Клиент выражает раздражение или обнаружен риск ухода';
    }

    if (ticket.confidenceScore && ticket.confidenceScore < 70) {
      return 'Уровень уверенности ИИ ниже порога для автоматического решения';
    }

    return 'Заявка требует участия человека-эксперта';
  };

  const emotionalTone = getEmotionalTone();
  const escalationNeeded = isEscalationNeeded();
  const escalationReason = getEscalationReason();

  return (
    <div className="mb-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-md font-semibold text-blue-800 flex items-center">
            <span className="mr-2">🤖</span> Анализ ИИ-поддержки
          </h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            ticket.confidenceScore && ticket.confidenceScore >= 80 
              ? 'bg-green-100 text-green-800' 
              : ticket.confidenceScore && ticket.confidenceScore >= 70 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-red-100 text-red-800'
          }`}>
            Уверенность: {ticket.confidenceScore || 0} %
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-blue-700 mb-1">Резюме заявки</h4>
            <p className="text-sm text-blue-600 bg-white p-2 rounded border">
              {ticket.aiSummary || 'Анализ содержания заявки...'}
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-blue-700 mb-1">Эмоциональный тон</h4>
            <div className="flex items-center">
              <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
                emotionalTone === 'Frustrated' ? 'bg-red-500' :
                emotionalTone === 'Urgent' ? 'bg-orange-500' :
                emotionalTone === 'Confused' ? 'bg-yellow-500' : 'bg-green-500'
              }`}></span>
              <span className="text-sm text-blue-600">{emotionalTone}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-white border border-neutral-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-neutral-700 mb-2 flex items-center">
            <span className="mr-2">🏷️</span> Классификация
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-neutral-600">Категория:</span>
              <span className="text-sm font-medium">{ticket.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-neutral-600">Приоритет:</span>
              <span className={`text-sm font-medium ${
                ticket.priority === 'critical' ? 'text-red-600' :
                ticket.priority === 'high' ? 'text-orange-600' :
                ticket.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
              }`}>
                {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-neutral-600">Статус:</span>
              <span className="text-sm font-medium capitalize">{ticket.status}</span>
            </div>
          </div>
        </div>

        <div className={`border rounded-lg p-4 ${
          escalationNeeded 
            ? 'bg-red-50 border-red-200' 
            : 'bg-green-50 border-green-200'
        }`}>
          <h4 className="text-sm font-medium mb-2 flex items-center">
            <span className="mr-2">{escalationNeeded ? '⚠️' : '✅'}</span> 
            Статус эскалации
          </h4>
          <div className="flex items-center mb-1">
            <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
              escalationNeeded ? 'bg-red-500' : 'bg-green-500'
            }`}></span>
            <span className={`text-sm font-medium ${
              escalationNeeded ? 'text-red-700' : 'text-green-700'
            }`}>
              {escalationNeeded ? 'Рекомендуется' : 'Не требуется'}
            </span>
          </div>
          {escalationNeeded && (
            <p className="text-xs text-red-600 mt-1">{escalationReason}</p>
          )}
        </div>
      </div>

      <div className="bg-white border border-neutral-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-neutral-700 mb-2 flex items-center">
          <span className="mr-2">💡</span> Предложенное решение
        </h4>
        {ticket.resolutionSteps && ticket.resolutionSteps.length > 0 ? (
          <ol className="list-decimal pl-5 space-y-2">
            {ticket.resolutionSteps.map((step, index) => (
              <li key={index} className="text-sm text-neutral-600 pl-2">
                {step}
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-sm text-neutral-500 italic">Конкретные шаги еще не предоставлены</p>
        )}
      </div>

      {escalationNeeded && (
        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-yellow-800 mb-2 flex items-center">
            <span className="mr-2">🚨</span> Требуется проверка человеком
          </h4>
          <p className="text-sm text-yellow-700">
            Эта заявка требует немедленного внимания агента-человека из-за вышеупомянутых факторов эскалации.
          </p>
        </div>
      )}
    </div>
  );
};

export default AISupportAnalysis;