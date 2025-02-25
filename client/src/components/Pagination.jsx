import React from 'react';
import { useParks } from '../contexts/ParksContext';

const Pagination = () => {
  const { currentPage, fetchParks } = useParks();

  const handleNextPage = () => {
    fetchParks(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      fetchParks(currentPage - 1);
    }
  };

  return (
    <div className='pagination'>
      <button
        className='page-button'
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      <span className='page-number'>Page {currentPage}</span>
      <button
        className='page-button'
        onClick={handleNextPage}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
