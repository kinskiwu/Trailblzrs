import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Accordion from '../components/Accordion';
import ExportButton from '../components/ExportButton';

const Trips = () => {
  const { tripId } = useParams();
  const [tripDetails, setTripDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrip = async () => {
      console.log('Fetching trip with tripId:', tripId);
      if (!tripId) {
        setError(
          'No trip ID provided. Please create a trip from the Parks page.',
        );
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`/api/trips/${tripId}`);
        console.log('Trip response:', response.data);
        setTripDetails(response.data.data.tripDetails);
      } catch (err) {
        setError(`Failed to load trip details: ${err.message}`);
        console.error('Fetch error:', {
          status: err.response?.status,
          data: err.response?.data,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [tripId]);

  const dates = tripDetails.map((d) => new Date(d.date));
  const startDate = dates.length ? new Date(Math.min(...dates)) : null;
  const endDate = dates.length ? new Date(Math.max(...dates)) : null;

  if (error) return <div className='error'>{error}</div>;

  return loading ? (
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
      <ExportButton />
    </div>
  );
};

export default Trips;
