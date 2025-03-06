import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import Accordion from '../components/Accordion';
import ExportButton from '../components/ExportButton';
import { useTrips } from '../contexts/TripsContext';

const Trips = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const {
    getTrip,
    loading,
    error,
    tripsCache,
    currentTripId,
    setCurrentTripId,
  } = useTrips();

  useEffect(() => {
    // If there's a tripId in the URL, update the context
    if (tripId) {
      setCurrentTripId(tripId);
    }
    // If there's no tripId in the URL but there is one in context, redirect
    else if (currentTripId) {
      navigate(`/trips/${currentTripId}`);
    }
  }, [tripId, currentTripId, navigate, setCurrentTripId]);

  // Load trip data if needed
  useEffect(() => {
    const id = tripId || currentTripId;
    if (id && !tripsCache[id]) {
      getTrip(id).catch((err) => {
        console.error('Error loading trip:', err);
      });
    }
  }, [tripId, currentTripId, getTrip, tripsCache]);

  // Use either the URL tripId or the context's currentTripId
  const activeTrip = tripId || currentTripId;

  // Get trip details from cache
  const tripDetails = activeTrip ? tripsCache[activeTrip] || [] : [];

  // Calculate trip date range
  const dates = tripDetails.map((d) => new Date(d.date));
  const startDate = dates.length ? new Date(Math.min(...dates)) : null;
  const endDate = dates.length ? new Date(Math.max(...dates)) : null;

  if (!activeTrip) {
    return <div className='error'>No trip ID provided. Please create a trip from the Parks page.</div>;
  }

  if (error && !tripDetails.length) {
    return <div className='error'>{error}</div>;
  }

  return loading && !tripDetails.length ? (
    <div>Loading...</div>
  ) : (
    <div>
      <h2 className='page-title'>
        <span className='icon'>🗓️</span> Your Itinerary
      </h2>
      {startDate && endDate && (
        <div className='date-display'>
          <span>
            Trip Dates: {startDate.toDateString()} - {endDate.toDateString()}
          </span>
        </div>
      )}
      <Accordion tripDetails={tripDetails} />
      <ExportButton tripId={activeTrip} />
    </div>
  );
};

export default Trips;
