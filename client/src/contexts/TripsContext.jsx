import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const TripsContext = createContext();

export const useTrips = () => useContext(TripsContext);

const TripsProvider = ({ children }) => {
  const [tripsCache, setTripsCache] = useState({}); // Cache trips by ID
  const [currentTripId, setCurrentTripId] = useState(null); // Track current trip ID
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get trip by ID (from cache or API)
  const getTrip = async (tripId) => {
    // Return from cache if available
    if (tripsCache[tripId]) {
      return tripsCache[tripId];
    }

    // Otherwise fetch from API
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/trips/${tripId}`);
      const tripData = response.data.data.tripDetails;

      // Update cache
      setTripsCache((prev) => ({
        ...prev,
        [tripId]: tripData,
      }));

      return tripData;
    } catch (err) {
      setError(`Failed to load trip: ${err.message}`);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Create a new trip
  const createTrip = async (parkSelections) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/trips', { parkSelections });
      const newTripId = response.data.data.tripId;

      // Set as current trip
      setCurrentTripId(newTripId);

      return newTripId;
    } catch (err) {
      setError(`Failed to create trip: ${err.message}`);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <TripsContext.Provider
      value={{
        getTrip,
        createTrip,
        loading,
        error,
        tripsCache,
        currentTripId,
        setCurrentTripId,
      }}
    >
      {children}
    </TripsContext.Provider>
  );
};

export default TripsProvider;
