import { useState } from 'react';
import { mockParks } from '../mocks/mockParks';
import ParkSummary from '../components/ParkSummary';

const Accordion = () => {
  const [activeDay, setActiveDay] = useState('day-7');

  // Initialize days with parks
  const days = [
    { id: 'day-1', label: 'Day One', parks: [] },
    { id: 'day-2', label: 'Day Two', parks: [] },
    { id: 'day-3', label: 'Day Three', parks: [] },
    { id: 'day-4', label: 'Day Four', parks: [] },
    { id: 'day-5', label: 'Day Five', parks: [] },
    { id: 'day-6', label: 'Day Six', parks: [] },
    {
      id: 'day-7',
      label: 'Day Seven',
      parks: [mockParks[0], mockParks[1]],
    },
  ];

  // Toggle accordion
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
                  {day.parks.map((park, index) => (
                    <ParkSummary
                      key={park.parkId}
                      park={park}
                      index={index}
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
