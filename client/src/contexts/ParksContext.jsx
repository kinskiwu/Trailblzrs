import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Context for managing parks data and user selections.
 */
const ParksContext = createContext();

/**
 * Hook to access parks data and actions.
 * @returns {object} Parks context value.
 */
export const useParks = () => useContext(ParksContext);

/**
 * Provides parks data and pagination.
 * @param {object} props
 * @param {React.ReactNode} props.children - Wrapped components.
 * @returns {JSX.Element} Context provider.
 */
const ParksProvider = ({ children }) => {
  const [parks, setParks] = useState([]);
  const [parksLoading, setParksLoading] = useState(true);
  const [parksError, setParksError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [parkSelections, setParkSelections] = useState([]);
  const [visitDate, setVisitDate] = useState(null);

  /**
   * Fetches a list of parks from the API.
   * @param {number} [page=1] - The page number to fetch.
   */
  const fetchParks = async (page = 1) => {
    setParksLoading(true);
    setParksError(null);

    try {
      const response = await axios.get(`/api/parks?page=${page}`);
      setParks(response.data.data.parks);
      setCurrentPage(page); // To reflect latest request
    } catch (err) {
      console.error('Error fetching parks:', err.message);
      setParksError('Failed to load parks. Please try again.');
    } finally {
      setParksLoading(false);
    }
  };

  useEffect(() => {
    fetchParks(currentPage);
  }, [currentPage]); // Runs only when currentPage updates

  const addParkSelection = (parkId, visitDate) => {
    setParkSelections((prev) => {
      if (prev.some((p) => p.parkId === parkId)) return prev;
      return [...prev, { parkId, visitDate }];
    });
  };

  const removeParkSelection = (parkId) => {
    setParkSelections((prev) => prev.filter((p) => p.parkId !== parkId));
  };

  return (
    <ParksContext.Provider
      value={{
        parks,
        currentPage,
        fetchParks,
        parksLoading,
        parksError,
        parkSelections,
        addParkSelection,
        removeParkSelection,
        visitDate,
        setVisitDate,
      }}
    >
      {children}
    </ParksContext.Provider>
  );
};

export default ParksProvider;
