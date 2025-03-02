import { useState } from 'react';
import { useParks } from '../contexts/ParksContext';

const ParkCard = ({ park }) => {
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const { selectedPark, setSelectedPark, visitDate } = useParks();

  const handleSelect = () => {
    if (visitDate) {
      setSelectedPark(park);
    }
  };

  // Helper func to render info rows
  const renderInfoRow = (label, content) => {
    return (
      <div className='info-row'>
        <div className='info-label'>{label}:</div>
        <div className='info-content'>{content || 'N/A'}</div>
      </div>
    );
  };

  return (
    <div
      className={`park-card ${selectedPark?.parkId === park.parkId ? 'selected' : ''}`}
    >
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
        {renderInfoRow(
          'Location',
          [park.city, park.state].filter(Boolean).join(', '),
        )}
        {renderInfoRow(
          'Activities',
          park.activities?.length ? park.activities.join(', ') : null,
        )}
        {renderInfoRow(
          'Historical Relevance',
          park.historicalRelevance?.length
            ? park.historicalRelevance.join(', ')
            : null,
        )}
        {park.npsLink &&
          renderInfoRow('NPS Link', <a href={park.npsLink}>{park.npsLink}</a>)}
        <button
          className='card-button'
          onClick={handleSelect}
          disabled={!visitDate}
        >
          <span className='itinerary-icon'>✓</span> Add to itinerary
        </button>
      </div>
    </div>
  );
};

export default ParkCard;
