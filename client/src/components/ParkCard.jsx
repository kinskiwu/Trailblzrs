import React, { useState } from 'react';
import { mockParks } from '../mocks/mockParks';

const ParkCard = ({ parkId: providedParkId }) => {
  const [parks, setParks] = useState(mockParks);
  const [isDescExpanded, setIsDescExpanded] = useState(false);

  // Get the first park from mock data if no specific parkId provided
  const park = providedParkId
    ? parks.find((p) => p.parkId === providedParkId)
    : parks[0];

  // Helper func to render info rows
  const renderInfoRow = (label, content) => (
    <div className='info-row'>
      <div className='info-label'>{label}:</div>
      <div className='info-content'>{content || 'N/A'}</div>
    </div>
  );

  return (
    <div className='park-card'>
      <div className='park-image'>
        <img
          src={park.image || 'https://loremflickr.com/1280/720'}
          alt={park.name || 'Placeholder Image'}
          className='actual-image'
        />
      </div>

      <div className='park-info'>
        <h3 className='park-title'>{park.name}</h3>
        <p
          className={`park-description ${isDescExpanded ? 'expanded' : ''}`}
          onClick={() => setIsDescExpanded(!isDescExpanded)}
          title={isDescExpanded ? '' : park.description}
        >
          {park.description}
        </p>
        {renderInfoRow('Location', `${park.city}, ${park.state}`)}
        {renderInfoRow('Activities', park.activities?.join(', '))}
        {renderInfoRow(
          'Historical Relevance',
          park.historicalRelevance?.join(', '),
        )}
        {renderInfoRow('NPS Link', <a href={park.npsLink}>{park.npsLink}</a>)}
        <button className='card-button'>
          <span className='itinerary-icon'>✓</span> Add to itinerary
        </button>
      </div>
    </div>
  );
};

export default ParkCard;
