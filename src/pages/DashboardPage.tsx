// src/pages/DashboardPage.tsx
import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import PerformanceForm from '../components/PerformanceForm';
import ChartPerformance from '../components/ChartPerformance';
import usePerformanceEntries from '../hooks/usePerformanceEntries';

const DashboardPage: React.FC = () => {
  // Get real-time entries from Firestore
  const dailyData = usePerformanceEntries();

  const totalEntries = dailyData.length;
  const sum = dailyData.reduce((acc, entry) => acc + entry.value, 0);
  const average = totalEntries ? (sum / totalEntries).toFixed(2) : 0;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <PerformanceForm />
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Today's Summary</Typography>
        <Typography variant="subtitle1">Total Entries: {totalEntries}</Typography>
        <Typography variant="subtitle1">Average: {average}</Typography>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Performance Chart</Typography>
        <ChartPerformance dailyData={dailyData} />
      </Box>
    </Container>
  );
};

export default DashboardPage;