import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParks } from '../contexts/ParksContext';

const ActionControls = () => {
  const {
    visitDate,
    setVisitDate,
    selectedState,
    setSelectedState,
    sortBy,
    setSortBy,
  } = useParks();

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7); // Allows selecting up to 7 days ahead

  const states = [
    'AL',
    'AK',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DE',
    'FL',
    'GA',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'OH',
    'OK',
    'OR',
    'PA',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY',
  ];

  const handleStateChange = (e) => {
    const state = e.target.value || null;
    setSelectedState(state);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className='control-container'>
      <div className='control-group'>
        <span>Filter by State:</span>
        <select
          value={selectedState || ''}
          onChange={handleStateChange}
        >
          <option value=''>All States</option>
          {states.map((state) => (
            <option
              key={state}
              value={state}
            >
              {state}
            </option>
          ))}
        </select>
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
        <span>Sort by:</span>
        <select
          value={sortBy}
          onChange={handleSortChange}
        >
          <option value='name'>Name</option>
          <option value='state'>State</option>
        </select>
      </div>
    </div>
  );
};

export default ActionControls;
