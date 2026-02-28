import React, { useState } from 'react';
import { Ticket } from '../../types';
import TicketTable from '../Dashboard/TicketTable';
import TicketDetails from '../DetailsPanel/TicketDetails';
import FiltersPanel from '../Dashboard/FiltersPanel';
import FilterButton from '../Common/FilterButton';
import SearchBar from '../Common/SearchBar';

interface TicketsLayoutProps {
  selectedTicket: Ticket | null;
  onTicketSelect: (ticket: Ticket) => void;
  activeFilters?: {
    view?: string;
    category?: string;
    priority?: string;
  };
  onFilterChange?: (filterType: string, filterValue: string) => void;
}

const TicketsLayout: React.FC<TicketsLayoutProps> = ({ 
  selectedTicket, 
  onTicketSelect,
  activeFilters = { view: 'all', category: '', priority: '' },
  onFilterChange = () => {}
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const activeFiltersCount = Object.values(activeFilters).filter(value => value !== '').length;

  return (
    <div className="h-full flex flex-col">
      <div className="flex h-full">
        {/* Main Table Area */}
        <div className="w-2/3 pr-0 flex flex-col border-r border-neutral-200">
          <div className="flex flex-col h-full">
            {/* Search and Filter Controls */}
            <div className="p-4 bg-white border-b border-neutral-200 flex items-center gap-4">
              <div className="flex-1 max-w-md">
                <SearchBar placeholder="Поиск заявок..." />
              </div>
              <FilterButton 
                onClick={() => setShowFilters(!showFilters)}
                activeFiltersCount={activeFiltersCount}
              />
            </div>
            
            {/* Filters Panel - shown when filter button is clicked */}
            {showFilters && (
              <div className="p-4 bg-white border-b border-neutral-200">
                <FiltersPanel 
                  activeFilters={activeFilters}
                  onFilterChange={onFilterChange}
                />
              </div>
            )}
            
            {/* Main Content Area with Ticket Table and Footer */}
            <div className="flex-1 flex flex-col min-h-0">
              <div className="flex-1 overflow-auto">
                <TicketTable onTicketSelect={onTicketSelect} selectedTicket={selectedTicket} />
              </div>
              
              {/* Footer with Filter Options */}
              <div className="flex-shrink-0 bg-neutral-50 border-t border-neutral-200 py-4">
                <div className="mx-auto w-fit">
                  <div className="bg-white border border-neutral-200 rounded-xl shadow-sm px-4 py-3">
                    <div className="flex flex-wrap justify-center gap-2">
                      <button
                        onClick={() => onFilterChange('view', 'all')}
                        className="px-3 py-1.5 text-sm font-medium rounded-md border border-neutral-300 hover:bg-neutral-100 transition-colors"
                      >
                        Все заявки
                      </button>

                      <button
                        onClick={() => onFilterChange('view', 'new')}
                        className="px-3 py-1.5 text-sm font-medium rounded-md border border-neutral-300 hover:bg-neutral-100 transition-colors"
                      >
                        Новые
                      </button>

                      <button
                        onClick={() => onFilterChange('view', 'open')}
                        className="px-3 py-1.5 text-sm font-medium rounded-md border border-neutral-300 hover:bg-neutral-100 transition-colors"
                      >
                        Открытые
                      </button>

                      <button
                        onClick={() => onFilterChange('view', 'pending')}
                        className="px-3 py-1.5 text-sm font-medium rounded-md border border-neutral-300 hover:bg-neutral-100 transition-colors"
                      >
                        В ожидании
                      </button>

                      <button
                        onClick={() => onFilterChange('view', 'resolved')}
                        className="px-3 py-1.5 text-sm font-medium rounded-md border border-neutral-300 hover:bg-neutral-100 transition-colors"
                      >
                        Решенные
                      </button>

                      <button
                        onClick={() => onFilterChange('view', 'escalated')}
                        className="px-3 py-1.5 text-sm font-medium rounded-md border border-neutral-300 hover:bg-neutral-100 transition-colors"
                      >
                        Эскалированные
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

export default TicketsLayout;