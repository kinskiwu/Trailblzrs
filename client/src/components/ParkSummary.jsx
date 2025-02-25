import React from 'react';

const ParkSummary = ({ park, index }) => {
  // Mock forecast data
  const forecast = {
    high: '78°F',
    low: '52°F',
    weather: 'Sunny',
    windSpeed: '8 mph',
  };

  return (
    <div className='park-summary'>
      #{index + 1} {park.name} <span className='summary-separator'>|</span>
      {park.state} <span className='summary-separator'>|</span>
      Weather: {forecast.weather} <span className='summary-separator'>|</span>
      High: {forecast.high} <span className='summary-separator'>|</span>
      Low: {forecast.low} <span className='summary-separator'>|</span>
      Wind: {forecast.windSpeed} <span className='summary-separator'>|</span>
      <a href={park.npsLink}>NPS Website</a>{' '}
      <span className='summary-separator'>|</span>
      <a href={park.directions}>Directions</a>
    </div>
  );
};

export default ParkSummary;
