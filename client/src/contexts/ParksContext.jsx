import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Hook to access parks data and actions.
 * @returns {object} Parks context value.
 */
const ParksContext = createContext();

export const useParks = () => useContext(ParksContext);

/**
 * Provides parks data and pagination.
 * @param {object} props
 * @param {React.ReactNode} props.children - Wrapped components.
 * @returns {JSX.Element} Context provider.
 */
const ParksProvider = ({ children }) => {
  const [parks, setParks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * Fetches parks data for the given page.
   * @param {number} [page=1] - Page number.
   */
  const fetchParks = async (page = 1) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/parks?page=${page}`);
      setParks(response.data.data.parks);
      setCurrentPage(page); // To reflect latest request
    } catch (err) {
      console.error('Error fetching parks:', err.message);
      setError('Failed to load parks. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchParks(currentPage);
  }, [currentPage]); // Runs only when currentPage updates

  return (
    <ParksContext.Provider
      value={{ parks, currentPage, fetchParks, isLoading, error }}
    >
      {children}
    </ParksContext.Provider>
  );
};

export default ParksProvider;
