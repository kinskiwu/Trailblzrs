import React, { useState } from 'react';
import { mockParks } from '../mocks/mockParks';

const ParkCard = ({ parkId: providedParkId }) => {
  const [parks] = useState(mockParks);

  // Get the first park from mock data if no specific parkId provided
  const park = providedParkId
    ? parks.find((p) => p.parkId === providedParkId)
    : parks[0];

  const {
    parkId,
    name,
    image,
    description,
    city,
    state,
    activities,
    historicalRelevance,
    npsLink,
  } = park;

  return (
    <div className='park-card'>
      <div className='park-image'>
        {image ? (
          <img
            src={image}
            alt={name}
            className='actual-image'
          />
        ) : (
          <img
            src='https://loremflickr.com/1280/720'
            alt='Placeholder Image'
            className='placeholder-imag'
          />
        )}
      </div>

      <div className='park-info'>
        <h3 className='park-title'>{name}</h3>

        <p className='park-description'>{description}</p>

        <div className='park-location'>
          <div className='info-label'>Location:</div>
          <div className='info-content'>
            {city}, {state}
          </div>
        </div>

        <div className='park-activities'>
          <div className='info-label'>Activities:</div>
          <div className='info-content'>{activities.join(', ')}</div>
        </div>

        <div className='park-historical-relevance'>
          <div className='info-label'>Historical Relevance:</div>
          <div className='info-content'>{historicalRelevance.join(', ')}</div>
        </div>

        <div className='park-link'>
          <div className='info-label'>NPS Link:</div>
          <a
            href={npsLink}
            className='info-content'
          >
            {npsLink}
          </a>
        </div>

        <button>
          <span className='itinerary-icon'>✓</span> Add to itinerary
        </button>
      </div>
    </div>
  );
};

export default ParkCard;
