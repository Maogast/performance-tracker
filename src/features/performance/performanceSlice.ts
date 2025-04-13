// src/features/performance/performanceSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the structure of a performance entry
export interface PerformanceEntry {
  id?: string;           // Optional Firestore document ID
  value: number;
  timestamp: number | Date; // Unix timestamp or Date object
  note?: string;         // Optional note for the entry
  category?: string;     // Optional field for categorization
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
    // Remove a performance entry by its id
    removeDaily: (state, action: PayloadAction<string>) => {
      state.daily = state.daily.filter(
        (entry) => entry.id !== action.payload
      );
    },
    // Update a performance entry by its id
    updateDaily: (
      state,
      action: PayloadAction<{ id: string; updatedEntry: PerformanceEntry }>
    ) => {
      const index = state.daily.findIndex(
        (entry) => entry.id === action.payload.id
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