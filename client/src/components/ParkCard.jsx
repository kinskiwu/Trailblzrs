import { useState } from 'react';
import { useParks } from '../contexts/ParksContext';

const ParkCard = ({ park }) => {
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const { parkSelections, addParkSelection, removeParkSelection, visitDate } =
    useParks();

  const isSelected = parkSelections.some((p) => p.parkId === park.parkId);

  const handleSelect = () => {
    if (!visitDate) {
      console.log('No visit date selected');
      return;
    }
    if (isSelected) {
      removeParkSelection(park.parkId);
    } else {
      addParkSelection(park.parkId, visitDate);
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
    <div className={`park-card ${isSelected ? 'selected' : ''}`}>
      {/* Park Image */}
      <div className='park-image'>
        <img
          src={park.image || 'https://loremflickr.com/1280/720'}
          alt={park.name || 'Placeholder Image'}
          className='actual-image'
        />
      </div>
      {/* Park Information */}
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
          park.activities?.length
            ? park.activities.slice(0, 5).join(', ')
            : null,
        )}
        {renderInfoRow(
          'Historical Relevance',
          park.historicalRelevance?.length
            ? park.historicalRelevance.slice(0, 5).join(', ')
            : null,
        )}
        {park.npsLink &&
          renderInfoRow('NPS Link', <a href={park.npsLink}>{park.npsLink}</a>)}
        {/* Add to Itinerary Button */}
        <button
          className={`card-button ${isSelected ? 'remove' : ''}`}
          onClick={handleSelect}
          disabled={!visitDate}
        >
          <span className='itinerary-icon'>{isSelected ? '✗' : '✓'}</span>
          {isSelected ? 'Remove from Itinerary' : 'Add to Itinerary'}
        </button>
      </div>
    </div>
  );
};

export default ParkCard;
