import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParks } from '../contexts/ParksContext';

const ActionControls = () => {
  const { visitDate, setVisitDate } = useParks();

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7); // Allows selecting up to 7 days ahead

  return (
    <div className='control-container'>
      <div className='control-group'>
        <span>Filter:</span>
        <div className='dropdown'>
          <span>Location</span>
          <span className='dropdown-arrow'>▼</span>
        </div>
      </div>

      <div className='control-group'>
        <span>Visit Date:</span>
        <DatePicker
          selected={visitDate ? new Date(visitDate) : null}
          onChange={(date) => setVisitDate(date.toISOString().split('T')[0])}
          minDate={today}
          maxDate={maxDate}
          placeholderText='Select a visit date 📅'
          dateFormat='yyyy-MM-dd'
        />
      </div>

      <div className='control-group'>
        <div className='dropdown'>
          <span>Sort: Name</span>
          <span className='dropdown-arrow'>▼</span>
        </div>
      </div>
    </div>
  );
};

export default ActionControls;
