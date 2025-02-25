import React from 'react';
import ActionControls from '../components/ActionControls';
import ParksList from '../components/ParksList';

const Parks = () => {
  return (
    <div>
      <h2 className='page-title'>
        <span className='icon'>🥾</span> Explore Parks
      </h2>
      <ActionControls />
      <ParksList />
    </div>
  );
};

export default Parks;
