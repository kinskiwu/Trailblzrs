import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import ActionControls from '../components/ActionControls';
import ParksList from '../components/ParksList';
import { useParks } from '../contexts/ParksContext';

const Parks = () => {
  const { parkSelections } = useParks();
  const [tripError, setTripError] = useState(null);
  const navigate = useNavigate();

  const handleCreateTrip = async () => {
    if (parkSelections.length < 5) {
      setTripError('Please select at least 5 parks.');
      return;
    }

    try {
      const response = await axios.post('/api/trips', { parkSelections });
      const tripId = response.data.data.tripId;
      navigate(`/trips/${tripId}`); // navigate to Trips after successful trip creation
    } catch (err) {
      setTripError('Failed to create trip. Please try again.');
      console.error('Error creating trip:', err.message);
    }
  };

  return (
    <div className='parks-page'>
      <h2 className='page-title'>
        <span className='icon'>🥾</span> Explore Parks
      </h2>
      <ActionControls />
      <div className='selected-count'>
        Selected Parks: {parkSelections.length}/5
      </div>
      {tripError && <div className='error'>{tripError}</div>}
      <ParksList />
      <button
        onClick={handleCreateTrip}
        disabled={parkSelections.length < 5}
        className='create-trip-button'
      >
        Create Trip
      </button>
    </div>
  );
};

export default Parks;
