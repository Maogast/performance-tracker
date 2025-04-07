// src/App.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { addDaily } from './features/performance/performanceSlice';
import { Container, Typography, TextField, Button, List, ListItem } from '@mui/material';

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
      <Typography variant="h5" component="h2" sx={{ mt: 4 }}>
        Daily Data
      </Typography>
      <List>
        {dailyData.map((data, index) => (
          <ListItem key={index}>
            {data}
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default App;