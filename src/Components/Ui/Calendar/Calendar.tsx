import React, { useState } from 'react';
import Calendar from '@sbmdkl/nepali-datepicker-reactjs';
import '@sbmdkl/nepali-datepicker-reactjs/dist/index.css';

const CalendarComponent = () => {
  const [date, setDate] = useState('');

  const handleDate = ({ bsDate, adDate }: any) => {
    setDate(bsDate);
  };
  return (
    <div className='calendar'>
      <Calendar
        onChange={handleDate}
        className='form-input-contain calender-container '
      />
    </div>
  );
};

export default CalendarComponent;
