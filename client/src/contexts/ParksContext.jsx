import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ParksContext = createContext();

export const useParks = () => useContext(ParksContext);

const ParksProvider = ({ children }) => {
  const [parks, setParks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchParks = async (page = 1) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/parks?page=${page}`);
      setParks(response.data.data.parks);
      setCurrentPage(page);
    } catch (err) {
      console.error('Error fetching parks:', err.message);
      setError('Failed to load parks. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchParks(currentPage);
  }, [currentPage]);

  return (
    <ParksContext.Provider
      value={{ parks, currentPage, fetchParks, isLoading, error }}
    >
      {children}
    </ParksContext.Provider>
  );
};

export default ParksProvider;
