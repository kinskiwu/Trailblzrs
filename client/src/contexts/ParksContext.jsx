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
  const [selectedPark, setSelectedPark] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [visitDate, setVisitDate] = useState(null);

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

  // Fetch forecast when a park is selected
  useEffect(() => {
    const fetchForecast = async (parkId, visitDate) => {
      if (!parkId || !visitDate) return;

      try {
        const response = await axios.get(
          `http://localhost:5001/api/forecast/?parkId=${parkId}&visitDate=${visitDate}`,
        );

        console.log('Forecast data:', response.data.data);
        setForecast(response.data.data);
      } catch (err) {
        console.error('Error fetching forecast:', err.message);
      }
    };

    if (selectedPark && visitDate) {
      fetchForecast(selectedPark.parkId, visitDate);
    }
  }, [selectedPark, visitDate]);

  return (
    <ParksContext.Provider
      value={{
        parks,
        currentPage,
        fetchParks,
        selectedPark,
        setSelectedPark,
        forecast,
        visitDate,
        setVisitDate,
        isLoading,
        error,
      }}
    >
      {children}
    </ParksContext.Provider>
  );
};

export default ParksProvider;
