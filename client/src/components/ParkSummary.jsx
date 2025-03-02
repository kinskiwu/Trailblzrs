import { useParks } from '../contexts/ParksContext';

const ParkSummary = ({ park, index }) => {
  const { forecast } = useParks();

  return (
    <div className='park-summary'>
      #{index + 1} {park.name} <span className='summary-separator'>|</span>
      {park.state} <span className='summary-separator'>|</span>
      Weather: {forecast?.weather || 'Loading...'}{' '}
      <span className='summary-separator'>|</span>
      High: {forecast?.high || 'N/A'}{' '}
      <span className='summary-separator'>|</span>
      Low: {forecast?.low || 'N/A'} <span className='summary-separator'>|</span>
      Wind: {forecast?.windSpeed || 'N/A'}{' '}
      <span className='summary-separator'>|</span>
      <a href={park.npsLink}>NPS Website</a>{' '}
      <span className='summary-separator'>|</span>
      <a href={park.directions}>Directions</a>
    </div>
  );
};

export default ParkSummary;
