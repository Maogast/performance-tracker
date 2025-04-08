// src/pages/AnalyticsPage.tsx
import React from 'react';
import { Container, Typography, Box } from '@mui/material';
// Retrieve real-time entries from Firestore via the custom hook
import usePerformanceEntries from '../hooks/usePerformanceEntries';
import ChartPerformance from '../components/ChartPerformance';

const AnalyticsPage: React.FC = () => {
  // Use the hook to get the performance entries
  const dailyData = usePerformanceEntries();

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Analytics / Insights
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Performance Trends</Typography>
        {/* Pass the dailyData array to the Chart component */}
        <ChartPerformance dailyData={dailyData} />
      </Box>
    </Container>
  );
};

export default AnalyticsPage;