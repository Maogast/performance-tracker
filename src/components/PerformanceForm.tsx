// src/components/PerformanceForm.tsx
import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { addPerformanceEntry } from '../services/performanceService';

const PerformanceForm: React.FC = () => {
  const [value, setValue] = useState('');
  const [note, setNote] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const numericValue = parseFloat(value);

    if (!isNaN(numericValue)) {
      const entry = {
        value: numericValue,
        timestamp: Date.now(),
        note: note.trim() !== '' ? note : undefined,
        category: category.trim() !== '' ? category : undefined,
      };

      // Add the entry to Firestore
      await addPerformanceEntry(entry);

      // Clear the input fields
      setValue('');
      setNote('');
      setCategory('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Performance Value"
        variant="outlined"
        fullWidth
        value={value}
        onChange={(e) => setValue(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Category"
        variant="outlined"
        fullWidth
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Note (optional)"
        variant="outlined"
        fullWidth
        value={note}
        onChange={(e) => setNote(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit
      </Button>
    </Box>
  );
};

export default PerformanceForm;