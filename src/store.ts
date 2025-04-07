// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import performanceReducer from './features/performance/performanceSlice';

export const store = configureStore({
  reducer: {
    performance: performanceReducer,
  },
});

// Define public types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;