import { useState } from 'react';
import { useNavigate } from 'react-router';
import ActionControls from '../components/ActionControls';
import ParksList from '../components/ParksList';
import { useParks } from '../contexts/ParksContext';
import { useTrips } from '../contexts/TripsContext';

const Parks = () => {
  const { parkSelections, removeParkSelection } = useParks();
  const { createTrip, loading: isCreatingTrip, setCurrentTripId } = useTrips();
  const [tripError, setTripError] = useState(null);
  const navigate = useNavigate();

  const handleCreateTrip = async () => {
    if (parkSelections.length < 5) {
      setTripError('Please select at least 5 parks.');
      return;
    }

    try {
      const tripId = await createTrip(parkSelections);
      setCurrentTripId(tripId);

      // Clear selections after successful trip creation
      parkSelections.forEach((selection) => {
        removeParkSelection(selection.parkId);
      });

      // Navigate to the trip page
      navigate(`/trips/${tripId}`);
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
        disabled={parkSelections.length < 5 || isCreatingTrip}
        className={`create-trip-button ${isCreatingTrip ? 'loading' : ''}`}
      >
        {isCreatingTrip ? 'Packing your virtual backpack..' : 'Create Trip'}
      </button>
    </div>
  );
};

export default Parks;
