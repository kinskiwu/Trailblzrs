import React, { useState } from 'react';
import ParkCard from './ParkCard';
import { mockParks } from '../mocks/mockParks';

const ParksList = () => {
  const [parks, setParks] = useState(mockParks);

  return (
    <div className='park-list'>
      {parks.map((park) => (
        <ParkCard
          key={park.parkId}
          parkId={park.parkId}
        />
      ))}
    </div>
  );
};

export default ParksList;
