// src/App.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { addDaily } from './features/performance/performanceSlice';
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  Box,
} from '@mui/material';
import ChartPerformance from './components/ChartPerformance';

function App() {
  const dispatch = useDispatch();
  const dailyData = useSelector((state: RootState) => state.performance.daily);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(inputValue);
    if (!isNaN(num)) {
      dispatch(addDaily(num));
      setInputValue('');
    }
  };

  // Compute aggregates: total count and average value
  const totalEntries = dailyData.length;
  const sum = dailyData.reduce((acc, value) => acc + value, 0);
  const average = totalEntries ? (sum / totalEntries).toFixed(2) : 0;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Performance Tracker
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter performance value"
          variant="outlined"
          fullWidth
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" component="h2">
          Daily Data
        </Typography>
        <List>
          {dailyData.map((data, index) => (
            <ListItem key={index}>{data}</ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1">
          Total Entries: {totalEntries}
        </Typography>
        <Typography variant="subtitle1">
          Average Performance: {average}
        </Typography>
      </Box>

      {/* Visualization will be added in the next step */}
      <Box sx={{ mt: 4 }}>
        <ChartPerformance dailyData={dailyData} />
      </Box>
    </Container>
  );
}

export default App;