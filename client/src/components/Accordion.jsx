import React, { useState } from 'react';
import ParkCard from './ParkCard';
import { mockParks } from '../mocks/mockParks';

const Accordion = () => {
  const [activeDay, setActiveDay] = useState('day-7');

  // Initialize days with parks
  const days = [
    { id: 'day-1', label: 'Day One - February 1st', parks: [] },
    { id: 'day-2', label: 'Day Two - February 2nd', parks: [] },
    { id: 'day-3', label: 'Day Three - February 3rd', parks: [] },
    { id: 'day-4', label: 'Day Four - February 4th', parks: [] },
    { id: 'day-5', label: 'Day Five - February 5th', parks: [] },
    { id: 'day-6', label: 'Day Six - February 6th', parks: [] },
    {
      id: 'day-7',
      label: 'Day Seven - February 7th',
      parks: [mockParks[0]],
    },
  ];

  // Toggle accordion panel
  const handleDayClick = (dayId) => {
    setActiveDay(activeDay === dayId ? null : dayId);
  };

  return (
    <div className='accordion-container'>
      {days.map((day) => (
        <div
          key={day.id}
          className='accordion-item'
        >
          <div
            className={`accordion-header ${activeDay === day.id ? 'active' : ''}`}
            onClick={() => handleDayClick(day.id)}
          >
            <span className='day-label'>{day.label}</span>
            <span className='expand-icon'>
              {activeDay === day.id ? '−' : '+'}
            </span>
          </div>

          {activeDay === day.id && (
            <div className='accordion-content'>
              {day.parks.length > 0 && (
                <div className='parks-container'>
                  {day.parks.map((park) => (
                    <ParkCard
                      key={park.parkId}
                      park={park}
                    />
                  ))}
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
