const ParkSummary = ({ park, forecast, index }) => {
  return (
    <div className='park-summary'>
      #{index + 1} {park.parkName} <span className='summary-separator'>|</span>
      {park.state} <span className='summary-separator'>|</span>
      Weather: {forecast?.weather || 'N/A'}{' '}
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
