// src/features/performance/performanceSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the structure of a performance entry
export interface PerformanceEntry {
  value: number;
  timestamp: number; // Unix timestamp or a formatted date string
  note?: string;     // Optional note for the entry
  category?: string; // New optional field for categorization
}

// Define the state structure
interface PerformanceState {
  daily: PerformanceEntry[];
}

// Initial state
const initialState: PerformanceState = {
  daily: [],
};

// Create the slice
const performanceSlice = createSlice({
  name: 'performance',
  initialState,
  reducers: {
    // Add a new daily performance entry
    addDaily: (state, action: PayloadAction<PerformanceEntry>) => {
      state.daily.push(action.payload);
    },
    // Remove a performance entry by timestamp
    removeDaily: (state, action: PayloadAction<number>) => {
      state.daily = state.daily.filter(
        (entry) => entry.timestamp !== action.payload
      );
    },
    // Update a performance entry by timestamp
    updateDaily: (
      state,
      action: PayloadAction<{ timestamp: number; updatedEntry: PerformanceEntry }>
    ) => {
      const index = state.daily.findIndex(
        (entry) => entry.timestamp === action.payload.timestamp
      );
      if (index !== -1) {
        state.daily[index] = action.payload.updatedEntry;
      }
    },
  },
});

// Export actions and reducer
export const { addDaily, removeDaily, updateDaily } = performanceSlice.actions;
export default performanceSlice.reducer;