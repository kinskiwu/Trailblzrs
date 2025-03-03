import { useState } from 'react';
import ParkSummary from './ParkSummary';

const Accordion = ({ tripDetails }) => {
  const [activeDay, setActiveDay] = useState(tripDetails[0]?.date || null);

  const handleDayClick = (date) => {
    setActiveDay(activeDay === date ? null : date);
  };

  if (!tripDetails.length) {
    return <div>No trip details available.</div>;
  }

  return (
    <div className='accordion-container'>
      {tripDetails.map((day, index) => (
        <div
          key={day.date}
          className='accordion-item'
        >
          <div
            className={`accordion-header ${activeDay === day.date ? 'active' : ''}`}
            onClick={() => handleDayClick(day.date)}
          >
            <span className='day-label'>
              Day {index + 1}: {day.date}
            </span>
            <span className='expand-icon'>
              {activeDay === day.date ? '−' : '+'}
            </span>
          </div>
          {activeDay === day.date && (
            <div className='accordion-content'>
              {day.parkDetails.length > 0 && (
                <div className='parks-container'>
                  {day.parkDetails.map((park, idx) => {
                    const forecast = day.forecastDetails.find(
                      (f) => f.parkId === park.parkId,
                    );
                    return (
                      <ParkSummary
                        key={park.parkId}
                        park={park}
                        forecast={forecast}
                        index={idx}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
