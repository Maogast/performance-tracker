// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import performanceReducer from './features/performance/performanceSlice';
import { loadState, saveState } from './localStorage';

const preloadedState = {
  performance: loadState(), // load persisted performance data if available
};

export const store = configureStore({
  reducer: {
    performance: performanceReducer,
  },
  preloadedState,
});

// Subscribe to store updates and save the performance state to localStorage
store.subscribe(() => {
  saveState(store.getState().performance);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;