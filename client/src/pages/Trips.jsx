import Accordion from '../components/Accordion';
import ExportButton from '../components/ExportButton';
import 'react-datepicker/dist/react-datepicker.css';

const Trips = () => {
  // mock dates
  const startDate = new Date('2024-02-01');
  const endDate = new Date('2024-02-07');

  return (
    <div>
      <h2 className='page-title'>
        <span className='icon'>🗓️</span> Your Itinerary
      </h2>
      <div className='date-display'>
        <span>
          Trip Dates: {startDate.toString()} - {endDate.toString()}
        </span>
      </div>
      <Accordion />
      <ExportButton />
    </div>
  );
};

export default Trips;
