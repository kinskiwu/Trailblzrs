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
  // Parks state
  const [parks, setParks] = useState([]);
  const [parksLoading, setParksLoading] = useState(true);
  const [parksError, setParksError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Forecast state
  const [selectedPark, setSelectedPark] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [forecastLoading, setForecastLoading] = useState(false);
  const [forecastError, setForecastError] = useState(null);
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

  /**
   * Fetches weather forecast for the selected park and visit date.
   *
   * @param {string} parkId - The ID of the selected park.
   * @param {string} visitDate - The planned visit date.
   */
  useEffect(() => {
    const fetchForecast = async (parkId, visitDate) => {
      if (!parkId || !visitDate) return;

      setForecastLoading(true);
      setForecastError(null);

      try {
        const response = await axios.get(
          `/api/forecast/?parkId=${parkId}&visitDate=${visitDate}`,
        );

        console.log('Forecast data:', response.data.data);
        setForecast(response.data.data);
      } catch (err) {
        console.error('Error fetching forecast:', err.message);
        setForecastError('Failed to fetch forecast. Please try again.');
      } finally {
        setForecastLoading(false);
      }
    };

    if (selectedPark && visitDate) {
      fetchForecast(selectedPark.parkId, visitDate);
    }
  }, [selectedPark, visitDate]);

  return (
    <ParksContext.Provider
      value={{
        // Parks data
        parks,
        currentPage,
        fetchParks,
        parksLoading,
        parksError,

        // Forecast data
        selectedPark,
        setSelectedPark,
        forecast,
        forecastLoading,
        forecastError,
        visitDate,
        setVisitDate,
      }}
    >
      {children}
    </ParksContext.Provider>
  );
};

export default ParksProvider;
