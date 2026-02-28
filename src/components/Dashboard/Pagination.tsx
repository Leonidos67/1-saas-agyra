import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const delta = 2; // Number of pages to show around current page
    
    for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) {
      pages.push(i);
    }
    
    // Add first page and ellipsis if needed
    if (pages[0] > 1) {
      pages.unshift(1);
      if (pages[1] !== 2) pages.splice(1, 0, -1); // -1 represents ellipsis
    }
    
    // Add last page and ellipsis if needed
    if (pages[pages.length - 1] < totalPages) {
      if (pages[pages.length - 1] !== totalPages - 1) pages.push(-1); // -1 represents ellipsis
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-between border-t border-neutral-200 px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`relative inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md ${
            currentPage === 1
              ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
              : 'bg-white text-neutral-700 hover:bg-neutral-50'
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`relative ml-3 inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md ${
            currentPage === totalPages
              ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
              : 'bg-white text-neutral-700 hover:bg-neutral-50'
          }`}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-neutral-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
            <span className="font-medium">{totalPages * 10}</span> results
          </p>
        </div>
        <div>
          <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-neutral-300 text-sm font-medium ${
                currentPage === 1
                  ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                  : 'bg-white text-neutral-500 hover:bg-neutral-50'
              }`}
            >
              <span className="sr-only">Previous</span>
              &larr;
            </button>
            
            {pageNumbers.map((page, index) => (
              <button
                key={index}
                onClick={() => page > 0 && onPageChange(page)}
                className={`${
                  page === currentPage
                    ? 'z-10 bg-primary-600 border-primary-600 text-white'
                    : page === -1
                    ? 'bg-white text-neutral-500'
                    : 'bg-white text-neutral-500 hover:bg-neutral-50'
                } relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  page === -1 ? 'cursor-default' : ''
                }`}
              >
                {page === -1 ? '...' : page}
              </button>
            ))}
            
            <button
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-neutral-300 text-sm font-medium ${
                currentPage === totalPages
                  ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                  : 'bg-white text-neutral-500 hover:bg-neutral-50'
              }`}
            >
              <span className="sr-only">Next</span>
              &rarr;
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;