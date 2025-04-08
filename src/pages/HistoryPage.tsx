// src/pages/HistoryPage.tsx
import React, { useState } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  TextField,
  Box,
  Button,
} from '@mui/material';
// Use the custom hook instead of Redux useSelector
import usePerformanceEntries from '../hooks/usePerformanceEntries';

const HistoryPage: React.FC = () => {
  // Retrieve real-time entries from Firestore via the hook
  const dailyData = usePerformanceEntries();

  // States for filtering by category and date range.
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');

  // Helper function to format timestamps to a human-friendly string.
  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  // Sort entries: most recent first.
  const sortedData = [...dailyData].sort((a, b) => b.timestamp - a.timestamp);

  // Filter entries based on category and date range.
  const filteredData = sortedData.filter((entry) => {
    // Filter by category if one is specified.
    if (filterCategory && entry.category) {
      if (!entry.category.toLowerCase().includes(filterCategory.toLowerCase())) {
        return false;
      }
    }
    // Filter by start date.
    if (filterStartDate) {
      const startDate = new Date(filterStartDate).getTime();
      if (entry.timestamp < startDate) {
        return false;
      }
    }
    // Filter by end date.
    if (filterEndDate) {
      const endDate = new Date(filterEndDate).getTime();
      if (entry.timestamp > endDate) {
        return false;
      }
    }
    return true;
  });

  // Function to clear all filters.
  const clearFilters = () => {
    setFilterCategory('');
    setFilterStartDate('');
    setFilterEndDate('');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        History / Logs
      </Typography>

      {/* Filtering Inputs */}
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Filter by Category"
          variant="outlined"
          fullWidth
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Start Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          fullWidth
          value={filterStartDate}
          onChange={(e) => setFilterStartDate(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="End Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          fullWidth
          value={filterEndDate}
          onChange={(e) => setFilterEndDate(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="outlined" onClick={clearFilters}>
          Clear Filters
        </Button>
      </Box>

      {/* Displaying the filtered data */}
      <List>
        {filteredData.map((entry, index) => (
          <ListItem key={index}>
            {entry.value}
            {entry.category && ` (${entry.category})`}
            {entry.note && ` - ${entry.note}`}
            {' | '}
            <em>{formatTimestamp(entry.timestamp)}</em>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default HistoryPage;