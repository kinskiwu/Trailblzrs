import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ParksContext = createContext();

export const useParks = () => useContext(ParksContext);

const ParksProvider = ({ children }) => {
  const [parks, setParks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParks = async () => {
      try {
        const response = await axios.get('/api/parks');
        setParks(response.data.data.parks);
      } catch (err) {
        console.error('Error fetching parks:', err.message);
        setError('Failed to load parks. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchParks();
  }, []);

  return (
    <ParksContext.Provider value={{ parks, isLoading, error }}>
      {children}
    </ParksContext.Provider>
  );
};

export default ParksProvider;
