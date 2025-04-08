// src/pages/CalendarPage.tsx
import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarPage: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date()); // Ensure the state is a single Date

  const handleDateChange = (value: Date | Date[]) => {
    // Ensure we only handle a single date
    if (value instanceof Date) {
      setDate(value);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Calendar View
      </Typography>
      <Calendar
        onChange={(value) => handleDateChange(value as Date | Date[])} // Explicitly cast the value
        value={date}
      />
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Selected date: {date.toDateString()}
      </Typography>
      {/* Future enhancement: display activity events on the selected date */}
    </Container>
  );
};

export default CalendarPage;