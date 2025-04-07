// src/features/performance/performanceSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PerformanceState {
  daily: number[];
}

const initialState: PerformanceState = {
  daily: [],
};

const performanceSlice = createSlice({
  name: 'performance',
  initialState,
  reducers: {
    addDaily: (state, action: PayloadAction<number>) => {
      state.daily.push(action.payload);
    },
  },
});

export const { addDaily } = performanceSlice.actions;
export default performanceSlice.reducer;