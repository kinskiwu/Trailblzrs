import { useParks } from '../contexts/ParksContext';

const Pagination = () => {
  const { currentPage, fetchParks, parksError } = useParks();

  // Moves to next page & fetching new parks
  const handleNextPage = () => {
    fetchParks(currentPage + 1);
  };

  //  Moves to previous page & fetching new parks
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
        disabled={currentPage === 1} // disabled if already on first page
      >
        &lt;
      </button>
      <span className='page-number'>Page {currentPage}</span>
      <button
        className='page-button'
        onClick={handleNextPage}
        disabled={parksError} // Disable if error exists
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
