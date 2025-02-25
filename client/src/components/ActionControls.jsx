import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ActionControls = () => {
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
        <DatePicker
          placeholderText='Select a start Date'
          dateFormat='MM/dd/yyyy'
        />
        <span>📅</span>
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
