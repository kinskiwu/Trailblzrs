import React from 'react';
import ParkCard from './ParkCard';
import Pagination from './Pagination';
import { useParks } from '../contexts/ParksContext';

const ParksList = () => {
  const { parks, isLoading, error } = useParks();

  if (error) return <div>{error}</div>;

  return (
    <>
      {isLoading ? (
        <div className='loader'>Loading...</div>
      ) : (
        <>
          <div className='park-list'>
            {parks.map((park) => (
              <ParkCard
                key={park.parkId}
                park={park}
              />
            ))}
          </div>
          <Pagination />
        </>
      )}
    </>
  );
};

export default ParksList;
